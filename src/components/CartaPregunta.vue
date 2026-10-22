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
  tiempo: { type: Number, default: 30 }, // 0 = sin límite
  intento: { type: Number, default: 1 }, // intento del equipo en este turno
})
const emit = defineEmits(['resolver'])

const LETRAS = ['A', 'B', 'C', 'D']

const elegida = ref(null) // índice elegido; -1 = se acabó el tiempo
const restante = ref(props.tiempo)
const respondida = computed(() => elegida.value !== null)
const acierto = computed(() => elegida.value >= 0 && props.carta.opciones[elegida.value]?.correcta === true)
const urgente = computed(() => props.tiempo > 0 && restante.value <= 5)

const vaACastigo = computed(() => respondida.value && !acierto.value && props.intento >= FALLOS_PARA_CASTIGO)

const titulo = computed(() => {
  if (acierto.value) return `¡Correcto! +${PUNTOS_ACIERTO} puntos 🎉`
  if (elegida.value === -1) return '⏰ ¡Se acabó el tiempo!'
  return '❌ Respuesta incorrecta'
})

let intervalo = null
let arranque = null
function iniciarReloj() {
  if (!props.tiempo || respondida.value) return
  const limite = performance.now() + props.tiempo * 1000
  let ultimoSegundo = props.tiempo
  intervalo = setInterval(() => {
    restante.value = Math.max(0, (limite - performance.now()) / 1000)
    const segundo = Math.ceil(restante.value)
    if (segundo !== ultimoSegundo) {
      ultimoSegundo = segundo
      if (segundo > 0 && segundo <= 5) sonido.reloj()
    }
    if (restante.value <= 0) elegir(-1)
  }, 100)
}

function elegir(i) {
  if (respondida.value) return
  elegida.value = i
  clearInterval(intervalo)
  if (acierto.value) sonido.correcto()
  else sonido.incorrecto()
}

let enviado = false
function continuar() {
  if (!respondida.value || enviado) return
  enviado = true
  emit('resolver', acierto.value)
}

function claseOpcion(i) {
  const op = props.carta.opciones[i]
  if (!respondida.value) return 'border-tinta/20 bg-white hover:-translate-y-0.5 hover:border-tinta hover:shadow-lg cursor-pointer'
  if (op.correcta) return 'border-green-600 bg-green-100'
  if (i === elegida.value) return 'border-red-600 bg-red-100'
  return 'border-tinta/10 bg-white opacity-45'
}

function tecla(e) {
  if (e.repeat) return
  const k = e.key.toLowerCase()
  const i = ['1', '2', '3', '4'].includes(k) ? Number(k) - 1 : ['a', 'b', 'c', 'd'].indexOf(k)
  if (!respondida.value && i >= 0 && i < props.carta.opciones.length) {
    e.preventDefault()
    elegir(i)
  } else if (respondida.value && (k === 'enter' || k === ' ')) {
    e.preventDefault()
    continuar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', tecla)
  arranque = setTimeout(iniciarReloj, 550)
})
onUnmounted(() => {
  window.removeEventListener('keydown', tecla)
  clearTimeout(arranque)
  clearInterval(intervalo)
})
</script>

<template>
  <Modal>
    <article class="overflow-hidden rounded-3xl border-4 border-tinta bg-papel shadow-2xl">
      <header class="flex items-center gap-3 px-4 py-3 sm:px-6" :style="{ background: categoria.color }">
        <Icono :nombre="categoria.icono" class="size-10 shrink-0 sm:size-12" />
        <div class="min-w-0">
          <p class="font-display text-2xl leading-none uppercase sm:text-3xl">{{ categoria.nombre }}</p>
          <p class="mt-1 truncate text-sm font-bold">Responden: {{ equipo.avatar }} {{ equipo.nombre }}</p>
        </div>
        <div
          v-if="tiempo"
          class="ml-auto grid size-14 shrink-0 place-items-center rounded-full border-4 border-tinta bg-papel font-display text-2xl tabular-nums"
          :class="urgente && !respondida ? 'animate-latido text-red-600' : ''"
        >
          {{ Math.ceil(restante) }}
        </div>
      </header>
      <div v-if="tiempo" class="h-2.5 bg-tinta/10">
        <div
          class="h-full transition-[width] duration-100 ease-linear"
          :style="{ width: `${(restante / tiempo) * 100}%`, background: urgente ? '#e03131' : categoria.color }"
        />
      </div>

      <div class="p-4 sm:p-7">
        <h2 class="text-center font-display text-2xl leading-tight text-balance sm:text-3xl">{{ carta.texto }}</h2>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            v-for="(op, i) in carta.opciones"
            :key="i"
            type="button"
            class="flex items-center gap-3 rounded-2xl border-[3px] px-3 py-3 text-left text-base font-bold transition sm:text-lg"
            :class="claseOpcion(i)"
            :disabled="respondida"
            @click="elegir(i)"
          >
            <span
              class="grid size-9 shrink-0 place-items-center rounded-full font-display text-lg text-tinta"
              :style="{ background: respondida && op.correcta ? '#40c057' : categoria.color }"
            >
              {{ LETRAS[i] }}
            </span>
            <span>{{ op.texto }}</span>
          </button>
        </div>

        <div
          v-if="respondida"
          class="mt-5 rounded-2xl border-2 p-4"
          :class="acierto ? 'border-green-600 bg-green-50' : 'border-red-500 bg-red-50'"
        >
          <p class="font-display text-2xl">{{ titulo }}</p>
          <p v-if="carta.dato" class="mt-1 text-base sm:text-lg">
            <strong>Dato curioso:</strong> {{ carta.dato }}
          </p>
          <AvisoFallo v-if="!acierto" :castigo="vaACastigo" />
          <button
            type="button"
            class="mt-4 w-full rounded-2xl px-6 py-3 font-display text-xl text-white transition hover:brightness-110 active:translate-y-1 active:shadow-none"
            :class="vaACastigo ? 'bg-[#c92a2a] shadow-[0_5px_0_#7a1414]' : 'bg-bosque shadow-[0_5px_0_#134524]'"
            @click="continuar"
          >
            {{ vaACastigo ? 'Ir a la ruleta de penalización' : acierto ? 'Continuar' : 'Girar otra vez' }}
            <kbd class="ml-2 rounded bg-white/20 px-1.5 py-0.5 text-xs">Enter</kbd>
          </button>
        </div>
        <p v-else class="mt-4 text-center text-xs font-semibold text-tinta/50">
          Teclas <kbd>1</kbd>–<kbd>4</kbd> o <kbd>A</kbd>–<kbd>D</kbd> para responder
        </p>
      </div>
    </article>
  </Modal>
</template>
