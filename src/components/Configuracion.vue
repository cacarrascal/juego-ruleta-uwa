<script setup>
import { reactive } from 'vue'
import Letrero from './Letrero.vue'
import Montanas from './Montanas.vue'
import Paisaje from './Paisaje.vue'
import Reglas from './Reglas.vue'
import { AVATARES, COLORES_EQUIPO, EQUIPOS_BASE } from '../data/equipos'
import { PUNTOS_CASILLA } from '../data/reglas'
import { iniciarPartida, partidaGuardada, continuarGuardada } from '../composables/useJuego'

const CLAVE = 'desafio-ecopark-uwa:ajustes'

function leerAjustes() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) ?? 'null')
  } catch {
    return null
  }
}

const previos = leerAjustes()
const form = reactive({
  cantidad: previos?.cantidad ?? 4,
  equipos: EQUIPOS_BASE.map((base, i) => ({ ...base, ...previos?.equipos?.[i] })),
  meta: previos?.meta ?? 12,
  tiempo: previos?.tiempo ?? 30,
})

const guardada = partidaGuardada()

const METAS = [
  { valor: 8, nombre: 'Rápida' },
  { valor: 12, nombre: 'Normal' },
  { valor: 16, nombre: 'Larga' },
]
const TIEMPOS = [
  { valor: 20, nombre: '20 s' },
  { valor: 30, nombre: '30 s' },
  { valor: 45, nombre: '45 s' },
  { valor: 0, nombre: 'Sin límite' },
]

const siguiente = (lista, actual) => lista[(lista.indexOf(actual) + 1) % lista.length]

const claseOpcion = (activa) =>
  activa
    ? 'border-bosque bg-bosque text-white shadow-[0_4px_0_#134524]'
    : 'border-tinta/20 bg-white hover:border-tinta hover:-translate-y-0.5'

function comenzar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(form))
  } catch {}
  iniciarPartida(form.equipos.slice(0, form.cantidad), { meta: form.meta, tiempo: form.tiempo })
}
</script>

<template>
  <main class="papel relative mx-auto max-w-5xl overflow-hidden rounded-[28px] shadow-[0_25px_60px_rgb(0_0_0/0.45)]">
    <Montanas class="pointer-events-none absolute -top-1 -left-6 hidden w-52 md:block lg:w-60" />
    <span class="pointer-events-none absolute top-8 right-10 hidden animate-flotar text-6xl md:block">🦅</span>

    <header class="relative px-4 pt-6 pb-2 text-center sm:px-8">
      <Letrero />
      <p class="mx-auto mt-5 max-w-xl text-base font-semibold text-balance text-tinta/75 sm:text-lg">
        Gira la ruleta, responde sobre flora, fauna, paisajes, cultura U'wa y servicios del parque, ¡y lleva a tu equipo hasta la meta!
      </p>
    </header>

    <div
      v-if="guardada"
      class="relative mx-4 mt-3 flex flex-col items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-bosque bg-green-50 px-4 py-3 text-center sm:mx-8 sm:flex-row sm:text-left"
    >
      <p class="font-bold">
        Hay una partida sin terminar: {{ guardada.equipos.map((e) => e.avatar).join(' ') }} · ronda {{ guardada.ronda }}
      </p>
      <button
        type="button"
        class="rounded-full bg-bosque px-5 py-2 font-display text-lg whitespace-nowrap text-white shadow-[0_4px_0_#134524] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
        @click="continuarGuardada"
      >
        Continuar partida
      </button>
    </div>

    <div class="relative grid grid-cols-1 gap-7 px-4 pt-5 pb-6 sm:px-8 lg:grid-cols-[1.2fr_1fr]">
      <section>
        <h2 class="font-display text-2xl text-bosque">Equipos</h2>
        <div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Cantidad de equipos">
          <button
            v-for="n in [2, 3, 4, 5, 6]"
            :key="n"
            type="button"
            class="size-11 rounded-xl border-2 font-display text-xl transition"
            :class="claseOpcion(form.cantidad === n)"
            :aria-pressed="form.cantidad === n"
            @click="form.cantidad = n"
          >
            {{ n }}
          </button>
        </div>
        <ul class="mt-4 space-y-2">
          <li
            v-for="(eq, i) in form.equipos.slice(0, form.cantidad)"
            :key="i"
            class="flex items-center gap-2 rounded-2xl border-[3px] bg-white p-1.5 pr-2.5"
            :style="{ borderColor: eq.color }"
          >
            <button
              type="button"
              class="grid size-11 shrink-0 place-items-center rounded-xl text-2xl transition hover:scale-110"
              :style="{ background: `${eq.color}22` }"
              title="Cambiar animal"
              @click="eq.avatar = siguiente(AVATARES, eq.avatar)"
            >
              {{ eq.avatar }}
            </button>
            <input
              v-model="eq.nombre"
              maxlength="24"
              class="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-2 text-lg font-bold outline-none focus:bg-papel"
              :placeholder="`Equipo ${i + 1}`"
              :aria-label="`Nombre del equipo ${i + 1}`"
            />
            <button
              type="button"
              class="size-8 shrink-0 rounded-full border-[3px] border-white shadow-[0_0_0_2px_#1f2421] transition hover:scale-110"
              :style="{ background: eq.color }"
              title="Cambiar color"
              :aria-label="`Cambiar color del equipo ${i + 1}`"
              @click="eq.color = siguiente(COLORES_EQUIPO, eq.color)"
            />
          </li>
        </ul>
        <p class="mt-2 text-xs font-semibold text-tinta/55">Toca el animal o el círculo de color para cambiarlos.</p>
      </section>

      <section class="space-y-6">
        <div>
          <h2 class="font-display text-2xl text-bosque">Duración</h2>
          <div class="mt-2 grid grid-cols-3 gap-2">
            <button
              v-for="m in METAS"
              :key="m.valor"
              type="button"
              class="rounded-xl border-2 px-2 py-2 font-display text-lg leading-tight transition"
              :class="claseOpcion(form.meta === m.valor)"
              @click="form.meta = m.valor"
            >
              {{ m.nombre }}
              <span class="block font-sans text-xs font-bold opacity-75">{{ m.valor * PUNTOS_CASILLA }} puntos</span>
            </button>
          </div>
        </div>
        <div>
          <h2 class="font-display text-2xl text-bosque">Tiempo por pregunta</h2>
          <div class="mt-2 grid grid-cols-4 gap-2">
            <button
              v-for="t in TIEMPOS"
              :key="t.valor"
              type="button"
              class="rounded-xl border-2 px-1 py-2.5 font-display text-base leading-tight transition sm:text-lg"
              :class="claseOpcion(form.tiempo === t.valor)"
              @click="form.tiempo = t.valor"
            >
              {{ t.nombre }}
            </button>
          </div>
        </div>
        <details class="group rounded-2xl border-2 border-tinta/15 bg-white/70 p-3">
          <summary class="cursor-pointer font-display text-xl text-bosque">¿Cómo se juega?</summary>
          <Reglas class="mt-3" />
        </details>
      </section>
    </div>

    <div class="relative px-4 pb-2 text-center sm:px-8">
      <button
        type="button"
        class="rounded-full bg-bosque px-10 py-4 font-display text-2xl text-white shadow-[0_6px_0_#134524] transition hover:-translate-y-0.5 hover:brightness-110 active:translate-y-1 active:shadow-none sm:text-3xl"
        @click="comenzar"
      >
        ¡Comenzar desafío! 🎡
      </button>
    </div>

    <Paisaje class="mt-2 block h-20 w-full sm:h-28" />
  </main>
</template>
