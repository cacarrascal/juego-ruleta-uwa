<script setup>
import { computed } from 'vue'
import Icono from './Icono.vue'
import { ESPECIALES } from '../data/especiales'
import { PUNTOS_CASILLA } from '../data/reglas'
import { tipoCasilla } from '../composables/useJuego'

const props = defineProps({
  equipos: { type: Array, required: true },
  meta: { type: Number, required: true }, // en casillas
  turno: { type: Number, default: 0 },
})
const emit = defineEmits(['ver-especial'])

const casillas = computed(() => Array.from({ length: props.meta + 1 }, (_, i) => ({ i, tipo: tipoCasilla(i, props.meta) })))
const columnas = computed(() => `repeat(${props.meta + 1}, minmax(0, 1fr))`)
const anchoMinimo = computed(() => `${(props.meta + 1) * 2.25}rem`)
const metaPuntos = computed(() => props.meta * PUNTOS_CASILLA)

// La ficha se ubica según los puntos: 15 puntos = a mitad de camino entre la casilla 1 y la 2.
const izquierda = (puntos) => `${((puntos / PUNTOS_CASILLA + 0.5) / (props.meta + 1)) * 100}%`

function fondoCasilla({ i, tipo }) {
  if (i === 0 || i === props.meta) return { background: '#e8be8455' }
  if (tipo) return { background: `${ESPECIALES[tipo].color}38` }
  return {}
}
</script>

<template>
  <div class="overflow-x-auto rounded-2xl border-2 border-madera-oscura/25 bg-white/55 p-2 sm:p-3">
    <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5" :style="{ minWidth: `calc(${anchoMinimo} + 4rem)` }">
      <!-- Encabezado: puntos de cada casilla -->
      <div class="flex items-end text-[0.65rem] font-extrabold tracking-wider text-tinta/45 uppercase">Puntos</div>
      <div class="grid" :style="{ gridTemplateColumns: columnas }">
        <div v-for="c in casillas" :key="c.i" class="flex h-7 items-center justify-center">
          <span v-if="c.i === 0" class="madera rounded-md px-1.5 py-px font-display text-[0.7rem] text-tinta sm:text-xs">INICIO</span>
          <span v-else-if="c.i === meta" class="madera rounded-md px-1.5 py-px font-display text-[0.7rem] text-tinta sm:text-xs" :title="`${metaPuntos} puntos`">
            META
          </span>
          <button
            v-else-if="c.tipo"
            type="button"
            class="grid size-6 place-items-center rounded-md border-2 border-tinta/70 transition hover:scale-125"
            :style="{ background: ESPECIALES[c.tipo].color }"
            :title="`${c.i * PUNTOS_CASILLA} puntos · ${ESPECIALES[c.tipo].nombre} (toca para ver qué hace)`"
            @click="emit('ver-especial', c.tipo)"
          >
            <Icono :nombre="ESPECIALES[c.tipo].icono" class="size-4" />
          </button>
          <span v-else class="text-[0.7rem] font-extrabold text-tinta/45 tabular-nums">{{ c.i * PUNTOS_CASILLA }}</span>
        </div>
      </div>

      <!-- Un carril por equipo -->
      <template v-for="(eq, k) in equipos" :key="eq.id">
        <div class="flex min-w-0 items-center gap-2" :class="k === turno ? 'font-extrabold' : 'font-semibold'">
          <span
            class="grid size-8 shrink-0 place-items-center rounded-full border-[3px] bg-white text-lg"
            :style="{ borderColor: eq.color }"
          >
            {{ eq.avatar }}
          </span>
          <span class="hidden max-w-[9.5rem] truncate text-sm sm:block" :title="eq.nombre">{{ eq.nombre }}</span>
          <span v-if="eq.pierdeTurno" class="text-sm" title="Pierde el próximo turno">⏸️</span>
          <span
            class="ml-auto rounded-full px-2 py-0.5 text-xs font-extrabold whitespace-nowrap text-white tabular-nums"
            :style="{ background: eq.color }"
            :title="`${eq.puntos} de ${metaPuntos} puntos`"
          >
            {{ eq.puntos }} pts
          </span>
        </div>

        <div
          class="relative h-9 rounded-xl"
          :style="k === turno ? { outline: `3px solid ${eq.color}`, outlineOffset: '2px' } : {}"
        >
          <div
            class="absolute inset-0 grid overflow-hidden rounded-xl border border-tinta/15 bg-papel"
            :style="{ gridTemplateColumns: columnas }"
          >
            <div
              v-for="c in casillas"
              :key="c.i"
              class="border-r border-dashed border-tinta/15 last:border-r-0"
              :style="fondoCasilla(c)"
            />
          </div>
          <div
            class="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-300 ease-out"
            :style="{ left: izquierda(eq.puntos) }"
          >
            <span
              :key="eq.puntos"
              class="grid size-8 animate-salto place-items-center rounded-full border-[3px] bg-white text-base shadow-md"
              :style="{ borderColor: eq.color }"
            >
              {{ eq.avatar }}
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
