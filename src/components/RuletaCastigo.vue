<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Modal from './Modal.vue'
import Icono from './Icono.vue'
import Ruleta from './Ruleta.vue'
import { CASTIGOS } from '../data/castigos'
import { FALLOS_PARA_CASTIGO } from '../data/reglas'
import { juego, siguienteEquipo, puntosRondaPasada } from '../composables/useJuego'

const props = defineProps({ equipo: { type: Object, required: true } })
const emit = defineEmits(['aplicar'])

const ruleta = ref(null)
const estado = ref('listo') // 'listo' | 'girando' | 'resultado'
const castigo = ref(null)
const receptorId = ref(null)

const otros = computed(() => juego.equipos.filter((e) => e.id !== props.equipo.id))
const aRegalar = computed(() => Math.min(10, props.equipo.puntos))
const faltaReceptor = computed(() => castigo.value?.id === 'dar10' && aRegalar.value > 0 && receptorId.value === null)

// Qué le pasa exactamente al equipo con el castigo que salió.
const detalle = computed(() => {
  const e = props.equipo
  switch (castigo.value?.id) {
    case 'menos5':
      return e.puntos > 0 ? `${e.avatar} ${e.nombre} pierde ${Math.min(5, e.puntos)} puntos.` : 'No tienen puntos que perder… ¡se salvaron por ahora!'
    case 'despues':
      return 'Esta vez no pierden nada más: lo intentan de nuevo en su próximo turno.'
    case 'quitaTurno': {
      const s = siguienteEquipo()
      return `${s.avatar} ${s.nombre} pierde su próximo turno.`
    }
    case 'rondaPasada': {
      if (juego.ronda === 1) return 'Es la primera ronda: no hay puntos de la ronda pasada. ¡Se salvaron!'
      const p = puntosRondaPasada(e)
      return p > 0
        ? `Pierden los ${p} puntos que ganaron en la ronda ${juego.ronda - 1}.`
        : `En la ronda ${juego.ronda - 1} no ganaron puntos. ¡Se salvaron!`
    }
    case 'dar10':
      return aRegalar.value > 0 ? `Pierden ${aRegalar.value} puntos. ¿A qué equipo se los regalan?` : 'No tienen puntos para regalar. ¡Se salvaron!'
  }
  return ''
})

async function girar() {
  if (estado.value !== 'listo') return
  estado.value = 'girando'
  const id = await ruleta.value.girar()
  castigo.value = CASTIGOS.find((c) => c.id === id)
  estado.value = 'resultado'
}

let enviado = false
function aplicar() {
  if (estado.value !== 'resultado' || faltaReceptor.value || enviado) return
  enviado = true
  emit('aplicar', { id: castigo.value.id, receptorId: receptorId.value })
}

function tecla(e) {
  if (e.repeat) return
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault()
    if (estado.value === 'listo') girar()
    else aplicar()
  } else if (castigo.value?.id === 'dar10') {
    const elegido = otros.value[Number(e.key) - 1]
    if (elegido) receptorId.value = elegido.id
  }
}

onMounted(() => window.addEventListener('keydown', tecla))
onUnmounted(() => window.removeEventListener('keydown', tecla))
</script>

<template>
  <Modal ancho="max-w-4xl">
    <article class="overflow-hidden rounded-3xl border-4 border-tinta bg-papel shadow-2xl">
      <header class="flex items-center gap-3 bg-[#c92a2a] px-4 py-3 text-white sm:px-6">
        <Icono nombre="alerta" class="size-10 shrink-0 sm:size-12" />
        <div class="min-w-0">
          <p class="font-display text-2xl leading-none uppercase sm:text-3xl">¡Ruleta de penalización!</p>
          <p class="mt-1 text-sm font-bold">{{ equipo.avatar }} {{ equipo.nombre }} falló {{ FALLOS_PARA_CASTIGO }} veces en este turno</p>
        </div>
      </header>

      <div class="grid items-center gap-6 p-4 sm:p-6 md:grid-cols-[auto_1fr]">
        <div class="mx-auto w-[min(76vw,340px)]">
          <Ruleta
            ref="ruleta"
            :opciones="CASTIGOS"
            :tamano-texto="9"
            fondo-centro="radial-gradient(circle at 35% 30%, #f03e3e, #8b1a1a 70%)"
            etiqueta="Girar la ruleta de penalización"
            :deshabilitada="estado !== 'listo'"
            @girar="girar"
          >
            <Icono nombre="alerta" class="size-[7cqw]" />
            <span class="mt-[0.5cqw] font-display text-[3.6cqw] leading-none">PENALIDAD</span>
          </Ruleta>
        </div>

        <div>
          <template v-if="estado !== 'resultado'">
            <p class="font-display text-2xl">¿Qué les tocará?</p>
            <ul class="mt-3 space-y-1.5">
              <li
                v-for="c in CASTIGOS"
                :key="c.id"
                class="flex items-center gap-2 rounded-xl border-2 bg-white px-3 py-1.5 text-sm font-bold sm:text-base"
                :style="{ borderColor: c.color }"
              >
                <span class="text-xl">{{ c.emoji }}</span> {{ c.titulo }}
              </li>
            </ul>
            <button
              v-if="estado === 'listo'"
              type="button"
              class="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c92a2a] px-6 py-3 font-display text-2xl text-white shadow-[0_5px_0_#7a1414] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
              @click="girar"
            >
              ¡Girar! <kbd class="rounded bg-white/20 px-1.5 py-0.5 text-xs">Espacio</kbd>
            </button>
            <p v-else class="mt-5 text-center font-display text-2xl text-tinta/60">Girando…</p>
          </template>

          <div v-else class="animate-entrar">
            <div class="rounded-2xl border-4 border-tinta p-4 text-center text-tinta" :style="{ background: castigo.color }">
              <p class="text-5xl">{{ castigo.emoji }}</p>
              <h3 class="mt-1 font-display text-2xl leading-tight sm:text-3xl">{{ castigo.titulo }}</h3>
              <p class="mt-2 text-lg font-bold">{{ detalle }}</p>
            </div>

            <div v-if="castigo.id === 'dar10' && aRegalar > 0" class="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                v-for="(o, i) in otros"
                :key="o.id"
                type="button"
                class="flex items-center gap-2 rounded-xl border-[3px] px-3 py-2 text-left font-bold transition hover:-translate-y-0.5"
                :style="{ borderColor: o.color, background: receptorId === o.id ? `${o.color}40` : '#fff' }"
                :aria-pressed="receptorId === o.id"
                @click="receptorId = o.id"
              >
                <kbd class="rounded bg-tinta/10 px-1.5 text-xs">{{ i + 1 }}</kbd>
                <span class="text-xl">{{ o.avatar }}</span>
                <span class="truncate">{{ o.nombre }}</span>
                <span v-if="receptorId === o.id" class="ml-auto">✔</span>
              </button>
            </div>

            <button
              type="button"
              class="mt-4 w-full rounded-2xl bg-bosque px-6 py-3 font-display text-xl text-white shadow-[0_5px_0_#134524] transition enabled:hover:brightness-110 enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:opacity-45"
              :disabled="faltaReceptor"
              @click="aplicar"
            >
              {{ faltaReceptor ? 'Elijan un equipo' : 'Aplicar y continuar' }}
              <kbd class="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs">Enter</kbd>
            </button>
          </div>
        </div>
      </div>
    </article>
  </Modal>
</template>
