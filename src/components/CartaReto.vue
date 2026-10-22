<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Modal from './Modal.vue'
import Icono from './Icono.vue'
import { sonido } from '../composables/useSonido'
import { PUNTOS_ACIERTO, FALLOS_PARA_CASTIGO } from '../data/reglas'
import AvisoFallo from './AvisoFallo.vue'

const props = defineProps({
  carta: { type: Object, required: true },
  categoria: { type: Object, required: true },
  equipo: { type: Object, required: true },
  intento: { type: Number, default: 1 }, // intento del equipo en este turno
})
const emit = defineEmits(['resolver'])

const reloj = ref('listo') // 'listo' | 'corriendo' | 'terminado'
const restante = ref(props.carta.segundos)
const resultado = ref(null) // true = lo lograron, false = no
const urgente = computed(() => reloj.value === 'corriendo' && restante.value <= 5)
const vaACastigo = computed(() => resultado.value === false && props.intento >= FALLOS_PARA_CASTIGO)

let intervalo = null
function iniciar() {
  if (reloj.value !== 'listo' || resultado.value !== null) return
  reloj.value = 'corriendo'
  const limite = performance.now() + props.carta.segundos * 1000
  let ultimoSegundo = props.carta.segundos
  intervalo = setInterval(() => {
    restante.value = Math.max(0, (limite - performance.now()) / 1000)
    const segundo = Math.ceil(restante.value)
    if (segundo !== ultimoSegundo) {
      ultimoSegundo = segundo
      if (segundo > 0 && segundo <= 5) sonido.reloj()
    }
    if (restante.value <= 0) {
      clearInterval(intervalo)
      reloj.value = 'terminado'
      sonido.alarma()
    }
  }, 100)
}

function calificar(logrado) {
  if (resultado.value !== null) return
  clearInterval(intervalo)
  resultado.value = logrado
  if (logrado) sonido.correcto()
  else sonido.incorrecto()
}

let enviado = false
function continuar() {
  if (resultado.value === null || enviado) return
  enviado = true
  emit('resolver', resultado.value)
}

function tecla(e) {
  if (e.repeat) return
  const k = e.key.toLowerCase()
  if (resultado.value === null) {
    if (k === 's') calificar(true)
    else if (k === 'n') calificar(false)
    else if (k === 'enter' || k === ' ') iniciar()
    else return
  } else if (k === 'enter' || k === ' ') continuar()
  else return
  e.preventDefault()
}

onMounted(() => window.addEventListener('keydown', tecla))
onUnmounted(() => {
  window.removeEventListener('keydown', tecla)
  clearInterval(intervalo)
})
</script>

<template>
  <Modal>
    <article class="overflow-hidden rounded-3xl border-4 border-tinta bg-papel shadow-2xl">
      <header class="flex items-center gap-3 px-4 py-3 sm:px-6" :style="{ background: categoria.color }">
        <Icono :nombre="categoria.icono" class="size-10 shrink-0 sm:size-12" />
        <div class="min-w-0">
          <p class="font-display text-2xl leading-none uppercase sm:text-3xl">¡Reto!</p>
          <p class="mt-1 truncate text-sm font-bold">Lo hacen: {{ equipo.avatar }} {{ equipo.nombre }}</p>
        </div>
        <div
          class="ml-auto grid size-14 shrink-0 place-items-center rounded-full border-4 border-tinta bg-papel font-display text-2xl tabular-nums"
          :class="urgente ? 'animate-latido text-red-600' : ''"
        >
          {{ Math.ceil(restante) }}
        </div>
      </header>
      <div class="h-2.5 bg-tinta/10">
        <div
          class="h-full transition-[width] duration-100 ease-linear"
          :style="{ width: `${(restante / carta.segundos) * 100}%`, background: urgente ? '#e03131' : categoria.color }"
        />
      </div>

      <div class="p-4 sm:p-7">
        <h2 class="text-center font-display text-2xl leading-tight text-balance sm:text-4xl">{{ carta.texto }}</h2>

        <template v-if="resultado === null">
          <button
            v-if="reloj === 'listo'"
            type="button"
            class="mx-auto mt-6 flex items-center gap-2 rounded-full border-[3px] border-tinta bg-white px-6 py-2.5 font-display text-xl transition hover:-translate-y-0.5 hover:shadow-lg"
            @click="iniciar"
          >
            <Icono nombre="reloj" class="size-6" /> Iniciar cronómetro ({{ carta.segundos }} s)
            <kbd class="rounded bg-tinta/10 px-1.5 py-0.5 text-xs">Enter</kbd>
          </button>
          <p v-else-if="reloj === 'terminado'" class="mt-5 text-center font-display text-3xl text-red-600">⏰ ¡Tiempo!</p>
          <p v-else class="mt-5 text-center font-bold text-tinta/60">¡Vamos, vamos! ⏱️</p>

          <p class="mt-6 text-center text-sm font-bold tracking-wide text-tinta/60 uppercase">El moderador decide:</p>
          <div class="mt-2 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-4 font-display text-xl text-white shadow-[0_5px_0_#2b6b2f] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
              @click="calificar(true)"
            >
              <Icono nombre="check" class="size-7" /> ¡Lo lograron! <kbd class="rounded bg-white/20 px-1.5 text-xs">S</kbd>
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-4 font-display text-xl text-white shadow-[0_5px_0_#8a1c1c] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
              @click="calificar(false)"
            >
              <Icono nombre="cruz" class="size-7" /> No lo lograron <kbd class="rounded bg-white/20 px-1.5 text-xs">N</kbd>
            </button>
          </div>
        </template>

        <div
          v-else
          class="mt-6 rounded-2xl border-2 p-4 text-center"
          :class="resultado ? 'border-green-600 bg-green-50' : 'border-red-500 bg-red-50'"
        >
          <p class="font-display text-3xl">{{ resultado ? `¡Reto cumplido! +${PUNTOS_ACIERTO} puntos 🎉` : '❌ No lo lograron' }}</p>
          <AvisoFallo v-if="!resultado" :castigo="vaACastigo" />
          <button
            type="button"
            class="mt-4 w-full rounded-2xl px-6 py-3 font-display text-xl text-white transition hover:brightness-110 active:translate-y-1 active:shadow-none"
            :class="vaACastigo ? 'bg-[#c92a2a] shadow-[0_5px_0_#7a1414]' : 'bg-bosque shadow-[0_5px_0_#134524]'"
            @click="continuar"
          >
            {{ vaACastigo ? 'Ir a la ruleta de penalización' : resultado ? 'Continuar' : 'Girar otra vez' }}
            <kbd class="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs">Enter</kbd>
          </button>
        </div>
      </div>
    </article>
  </Modal>
</template>
