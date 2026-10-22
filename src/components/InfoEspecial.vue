<script setup>
import { computed } from 'vue'
import Modal from './Modal.vue'
import Icono from './Icono.vue'
import { ESPECIALES, chipEfecto } from '../data/especiales'
import { CASTIGOS } from '../data/castigos'
import { FALLOS_PARA_CASTIGO } from '../data/reglas'

const props = defineProps({ tipo: { type: String, required: true } })
const emit = defineEmits(['cerrar'])

const info = computed(() => ESPECIALES[props.tipo])
</script>

<template>
  <Modal ancho="max-w-lg">
    <article class="overflow-hidden rounded-3xl border-4 border-tinta bg-papel shadow-2xl">
      <header class="flex items-center gap-4 px-5 py-4" :style="{ background: info.color }">
        <span class="grid size-16 shrink-0 place-items-center rounded-2xl border-[3px] border-tinta bg-papel">
          <Icono :nombre="info.icono" class="size-10" />
        </span>
        <div>
          <p class="text-xs font-extrabold tracking-widest uppercase">Carta especial</p>
          <h2 class="font-display text-3xl leading-none uppercase sm:text-4xl">{{ info.nombre }}</h2>
        </div>
      </header>

      <div class="space-y-4 p-5">
        <section>
          <h3 class="font-display text-lg text-bosque">¿Cuándo sale?</h3>
          <p class="font-semibold">{{ info.cuando }}</p>
        </section>
        <section>
          <h3 class="font-display text-lg text-bosque">¿Qué pasa?</h3>
          <p class="font-semibold">{{ info.resumen }}</p>
        </section>
        <section>
          <h3 class="font-display text-lg text-bosque">Cartas del mazo</h3>
          <ul class="mt-1 space-y-1.5">
            <li
              v-for="(c, i) in info.cartas"
              :key="i"
              class="flex items-center justify-between gap-3 rounded-xl border-2 border-tinta/10 bg-white px-3 py-2 text-sm font-semibold"
            >
              <span>{{ c.texto }}</span>
              <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-extrabold whitespace-nowrap" :style="{ background: info.color }">
                {{ chipEfecto(c.efecto) }}
              </span>
            </li>
          </ul>
        </section>

        <section v-if="tipo === 'penalidad'" class="rounded-2xl border-2 border-red-300 bg-red-50 p-3">
          <h3 class="font-display text-lg text-red-700">¡Ojo! Ruleta de penalización</h3>
          <p class="text-sm font-semibold">
            Además de estas cartas, si un equipo falla {{ FALLOS_PARA_CASTIGO }} veces en el mismo turno (preguntas o retos) gira la ruleta de penalización y le puede tocar:
          </p>
          <ul class="mt-2 space-y-1.5">
            <li v-for="c in CASTIGOS" :key="c.id" class="flex items-start gap-2 text-sm">
              <span class="text-lg leading-none">{{ c.emoji }}</span>
              <span><strong>{{ c.titulo }}:</strong> {{ c.explicacion }}</span>
            </li>
          </ul>
        </section>

        <button
          type="button"
          class="w-full rounded-2xl bg-bosque px-6 py-3 font-display text-xl text-white shadow-[0_5px_0_#134524] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
          @click="emit('cerrar')"
        >
          ¡Entendido! <kbd class="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs">Enter</kbd>
        </button>
      </div>
    </article>
  </Modal>
</template>
