<script setup>
import { ref } from 'vue'
import Icono from './Icono.vue'
import { CATEGORIAS } from '../data/categorias'
import { sonido } from '../composables/useSonido'
import { azar, azarEntero } from '../utils/azar'

const props = defineProps({
  deshabilitada: Boolean,
  // Sectores en sentido horario desde arriba: { id, color, lineas, icono (de Icono.vue) o emoji }
  opciones: { type: Array, default: () => CATEGORIAS },
  tamanoTexto: { type: Number, default: 10.5 },
  fondoCentro: { type: String, default: 'radial-gradient(circle at 35% 30%, #2a8a45, #134524 70%)' },
  etiqueta: { type: String, default: 'Girar la ruleta' },
})
const emit = defineEmits(['girar'])

const N = props.opciones.length
const SECTOR = 360 / N

const angulo = ref(0)
const girando = ref(false)
const ganadora = ref(null)
const golpe = ref(false)

// Ángulos medidos en sentido horario desde las 12 en punto.
function punto(grados, radio) {
  const a = (grados * Math.PI) / 180
  return [radio * Math.sin(a), -radio * Math.cos(a)]
}

const sectores = props.opciones.map((c, i) => {
  const [x1, y1] = punto(i * SECTOR, 100)
  const [x2, y2] = punto((i + 1) * SECTOR, 100)
  return { ...c, d: `M0 0L${x1} ${y1}A100 100 0 0 1 ${x2} ${y2}Z`, medio: i * SECTOR + SECTOR / 2 }
})

const clavijas = Array.from({ length: N * 2 }, (_, i) => punto((i * SECTOR) / 2, 101.8))

// Sector que queda bajo el puntero (arriba) cuando la rueda está girada `ang` grados.
function sectorBajoPuntero(ang) {
  const a = (((360 - (ang % 360)) % 360) + 360) % 360
  return Math.floor(a / SECTOR)
}

let temporizadorGolpe = null
function patear() {
  golpe.value = true
  clearTimeout(temporizadorGolpe)
  temporizadorGolpe = setTimeout(() => (golpe.value = false), 70)
}

const desacelerar = (t) => 1 - Math.pow(1 - t, 4)

// Gira la rueda y devuelve (promesa) el id de la categoría ganadora.
function girar() {
  if (girando.value) return Promise.resolve(null)
  girando.value = true
  ganadora.value = null

  const objetivo = azarEntero(N)
  const anguloObjetivo = objetivo * SECTOR + 8 + azar() * (SECTOR - 16)
  const inicio = angulo.value
  const actual = ((inicio % 360) + 360) % 360
  const delta = (((360 - anguloObjetivo - actual) % 360) + 360) % 360
  const fin = inicio + (5 + azarEntero(3)) * 360 + delta
  const duracion = 4800 + azar() * 1200

  let t0 = null
  let ultimo = sectorBajoPuntero(inicio)
  return new Promise((resolve) => {
    function cuadro(ts) {
      t0 ??= ts
      const t = Math.min(1, (ts - t0) / duracion)
      angulo.value = inicio + (fin - inicio) * desacelerar(t)
      const s = sectorBajoPuntero(angulo.value)
      if (s !== ultimo) {
        ultimo = s
        sonido.tick()
        patear()
      }
      if (t < 1) return requestAnimationFrame(cuadro)
      girando.value = false
      ganadora.value = objetivo
      resolve(props.opciones[objetivo].id)
    }
    requestAnimationFrame(cuadro)
  })
}

defineExpose({ girar, limpiar: () => (ganadora.value = null) })
</script>

<template>
  <div class="@container relative aspect-square w-full select-none">
    <svg viewBox="-110 -110 220 220" class="size-full drop-shadow-[0_12px_18px_rgb(0_0_0/0.3)]">
      <circle r="107" fill="#fdfaf2" />
      <circle r="103.6" fill="#1f2421" />
      <g :transform="`rotate(${angulo})`">
        <g
          v-for="(s, i) in sectores"
          :key="s.id"
          class="transition-opacity duration-500"
          :opacity="ganadora !== null && ganadora !== i ? 0.35 : 1"
        >
          <path :d="s.d" :fill="s.color" stroke="#1f2421" stroke-width="1.6" stroke-linejoin="round" />
          <g :transform="`rotate(${s.medio})`" fill="#1f2421" color="#1f2421">
            <Icono v-if="s.icono" :nombre="s.icono" x="-14.5" y="-94" width="29" height="29" />
            <text v-else-if="s.emoji" y="-68" text-anchor="middle" font-size="22">{{ s.emoji }}</text>
            <text
              v-for="(linea, k) in s.lineas"
              :key="k"
              :y="(s.lineas.length === 1 ? -50 : -55) + k * (tamanoTexto + 0.5)"
              text-anchor="middle"
              font-family="'Lilita One', sans-serif"
              :font-size="tamanoTexto"
              letter-spacing=".3"
            >
              {{ linea }}
            </text>
          </g>
        </g>
        <circle v-for="(c, i) in clavijas" :key="i" :cx="c[0]" :cy="c[1]" r="1.5" fill="#fdfaf2" />
      </g>
    </svg>

    <!-- Puntero -->
    <div class="pointer-events-none absolute top-0 left-1/2 z-10 w-[11%] -translate-x-1/2 -translate-y-[38%]">
      <svg
        viewBox="0 0 40 52"
        class="w-full origin-[50%_31%] drop-shadow-md transition-transform duration-100"
        :class="golpe ? '-rotate-[16deg]' : ''"
      >
        <path d="M20 50 6.5 22a15.5 15.5 0 1 1 27 0z" fill="#134524" stroke="#fdfaf2" stroke-width="3" stroke-linejoin="round" />
        <circle cx="20" cy="16" r="6" fill="#f8d42b" stroke="#fdfaf2" stroke-width="2" />
      </svg>
    </div>

    <!-- Centro: también sirve como botón para girar -->
    <button
      type="button"
      class="absolute inset-[35%] flex flex-col items-center justify-center rounded-full border-[0.9cqw] border-papel text-papel shadow-[0_0_0_0.6cqw_#1f2421] transition enabled:cursor-pointer enabled:hover:scale-105 disabled:cursor-default"
      :class="!deshabilitada && 'animate-latido'"
      :style="{ background: fondoCentro }"
      :disabled="deshabilitada"
      :aria-label="etiqueta"
      @click="emit('girar')"
    >
      <slot>
        <span class="font-display text-[3.4cqw] leading-[1.02] tracking-wide">DESAFÍO<br />ECO-PARK<br />U'WA</span>
        <Icono nombre="hoja" class="mt-[0.6cqw] size-[4.2cqw] text-[#7bd36a]" />
      </slot>
    </button>
  </div>
</template>
