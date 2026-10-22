<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Ruleta from './Ruleta.vue'
import Mazo from './Mazo.vue'
import Tablero from './Tablero.vue'
import Letrero from './Letrero.vue'
import Montanas from './Montanas.vue'
import Paisaje from './Paisaje.vue'
import Icono from './Icono.vue'
import Modal from './Modal.vue'
import Reglas from './Reglas.vue'
import CartaPregunta from './CartaPregunta.vue'
import CartaReto from './CartaReto.vue'
import CartaEspecial from './CartaEspecial.vue'
import Ganador from './Ganador.vue'
import RuletaCastigo from './RuletaCastigo.vue'
import InfoEspecial from './InfoEspecial.vue'
import SalirPartida from './SalirPartida.vue'
import PenalizacionesEquipo from './PenalizacionesEquipo.vue'
import { juego, caerEn, resolverCarta, resolverEspecial, aplicarCastigo, revancha, nuevaPartida, pausarPartida } from '../composables/useJuego'
import { ajustes, sonido } from '../composables/useSonido'
import { CATEGORIA_POR_ID } from '../data/categorias'
import { ESPECIALES } from '../data/especiales'

const ruleta = ref(null)
const resaltada = ref(null)
const verReglas = ref(false)
const infoEspecial = ref(null) // 'bonus' | 'extra' | 'penalidad' mientras se ve su explicación
const verSalir = ref(false)

// Mientras gira la ruleta o se mueven las fichas no se puede salir (hay animaciones en curso).
const puedeSalir = computed(() => !['girando', 'moviendo'].includes(juego.fase))

const equipo = computed(() => juego.equipos[juego.turno])
const izquierda = ['flora', 'retos', 'servicios'].map((id) => CATEGORIA_POR_ID[id])
const derecha = ['fauna', 'paisajes', 'cultura'].map((id) => CATEGORIA_POR_ID[id])
const INCLINACIONES = [-4, 3, -2]

const ESTADOS = {
  girar: '¡A girar!',
  girando: 'Girando…',
  carta: 'Respondiendo…',
  moviendo: 'Avanzando…',
  especial: 'Casilla especial',
  castigo: 'Penalización',
  fin: '¡Fin del juego!',
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

async function girar() {
  if (juego.fase !== 'girar' || !ruleta.value) return
  juego.fase = 'girando'
  const id = await ruleta.value.girar()
  resaltada.value = id
  await esperar(900)
  sonido.carta()
  caerEn(id)
}

watch(
  () => juego.fase,
  (fase) => {
    if (fase !== 'girar') return
    resaltada.value = null
    ruleta.value?.limpiar()
  },
)

function pantallaCompleta() {
  if (document.fullscreenElement) document.exitFullscreen()
  else document.documentElement.requestFullscreen?.()
}


function tecla(e) {
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
  if (e.key.toLowerCase() === 'm') {
    ajustes.sonido = !ajustes.sonido
    return
  }
  if (verSalir.value) {
    if (e.key === 'Escape') verSalir.value = false
    return
  }
  if (verReglas.value || infoEspecial.value) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      e.preventDefault()
      verReglas.value = false
      infoEspecial.value = null
    }
    return
  }
  if (juego.fase !== 'girar') return
  if (e.key === 'Escape') {
    verSalir.value = true
  } else if (e.key === ' ' || (e.key === 'Enter' && e.target === document.body)) {
    e.preventDefault()
    girar()
  }
}

onMounted(() => window.addEventListener('keydown', tecla))
onUnmounted(() => window.removeEventListener('keydown', tecla))
</script>

<template>
  <main class="papel relative mx-auto max-w-[1500px] overflow-hidden rounded-[28px] shadow-[0_25px_60px_rgb(0_0_0/0.45)]">
    <Montanas class="pointer-events-none absolute -top-1 -left-6 hidden w-60 xl:block" />
    <span class="pointer-events-none absolute top-24 right-[5%] hidden animate-flotar text-6xl xl:block">🦅</span>

    <!-- Encabezado -->
    <header class="relative z-10 px-3 pt-3 sm:px-6 sm:pt-5">
      <div class="flex items-center justify-between gap-2 sm:absolute sm:inset-x-6 sm:top-5">
        <button
          type="button"
          class="flex h-10 items-center gap-1.5 rounded-full border-2 border-tinta/25 bg-white pr-4 pl-3 font-display text-lg text-tinta shadow-sm transition enabled:hover:-translate-y-0.5 enabled:hover:border-tinta disabled:cursor-not-allowed disabled:opacity-40"
          title="Volver al inicio o finalizar la partida (Esc)"
          :disabled="!puedeSalir"
          @click="verSalir = true"
        >
          <Icono nombre="atras" class="size-5" /> Inicio
        </button>
        <div class="flex gap-2">
          <button
            v-for="b in [
              { icono: 'ayuda', titulo: 'Cómo se juega', accion: () => (verReglas = true) },
              { icono: ajustes.sonido ? 'sonido' : 'silencio', titulo: 'Sonido (M)', accion: () => (ajustes.sonido = !ajustes.sonido) },
              { icono: 'pantalla', titulo: 'Pantalla completa', accion: pantallaCompleta },
            ]"
            :key="b.titulo"
            type="button"
            class="grid size-10 place-items-center rounded-full border-2 border-tinta/25 bg-white text-tinta shadow-sm transition hover:-translate-y-0.5 hover:border-tinta"
            :title="b.titulo"
            :aria-label="b.titulo"
            @click="b.accion"
          >
            <Icono :nombre="b.icono" class="size-5" />
          </button>
        </div>
      </div>
      <div class="mt-2 flex justify-center sm:mt-0">
        <Letrero en-linea />
      </div>
    </header>

    <!-- Ruleta y mazos -->
    <section
      class="relative z-10 grid items-center gap-5 px-3 pt-5 pb-3 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10"
    >
      <div class="hidden flex-col items-end gap-8 lg:flex">
        <div v-for="(c, i) in izquierda" :key="c.id" class="w-full max-w-[11rem] 2xl:max-w-[13rem]" :class="i === 1 && '-translate-x-10'">
          <Mazo
            :nombre="c.nombre"
            :color="c.color"
            :icono="c.icono"
            :cantidad="juego.mazos[c.id]?.length ?? 0"
            :activo="resaltada === c.id"
            :inclinacion="INCLINACIONES[i]"
          />
        </div>
      </div>

      <div class="flex flex-col items-center gap-5">
        <!-- Turno actual + botón de girar -->
        <div
          class="flex max-w-full items-center gap-3 rounded-full border-[3px] bg-white py-1 pr-1 pl-1 shadow-md transition-colors"
          :style="{ borderColor: equipo.color }"
        >
          <span class="grid size-11 shrink-0 place-items-center rounded-full text-2xl" :style="{ background: `${equipo.color}22` }">
            {{ equipo.avatar }}
          </span>
          <div class="min-w-0 leading-tight">
            <p class="text-[0.7rem] font-extrabold tracking-wider whitespace-nowrap text-tinta/55 uppercase">
              Ronda {{ juego.ronda }} · {{ ESTADOS[juego.fase] }}
              <span v-if="juego.intento > 1" class="text-red-600" title="Si fallan otra vez, les toca la ruleta de penalización">
                · 🔁 {{ juego.intento }}.ª oportunidad
              </span>
            </p>
            <p class="truncate font-display text-xl sm:text-2xl" :style="{ color: equipo.color }">{{ equipo.nombre }}</p>
          </div>
          <button
            type="button"
            class="ml-1 flex shrink-0 items-center gap-2 rounded-full bg-bosque px-5 py-2 font-display text-xl tracking-wide text-white shadow-[0_4px_0_#134524] transition enabled:hover:brightness-110 enabled:active:translate-y-1 enabled:active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:text-2xl"
            :disabled="juego.fase !== 'girar'"
            title="Girar la ruleta (Espacio)"
            @click="girar"
          >
            ¡GIRAR!
            <kbd class="hidden rounded-md bg-white/20 px-1.5 py-0.5 text-[0.65rem] sm:inline">Espacio</kbd>
          </button>
        </div>

        <div class="w-[min(86vw,420px)] lg:w-[clamp(300px,calc(100dvh-27rem),520px)]">
          <Ruleta ref="ruleta" :deshabilitada="juego.fase !== 'girar'" @girar="girar" />
        </div>
      </div>

      <div class="hidden flex-col items-start gap-8 lg:flex">
        <div v-for="(c, i) in derecha" :key="c.id" class="w-full max-w-[11rem] 2xl:max-w-[13rem]" :class="i === 1 && 'translate-x-10'">
          <Mazo
            :nombre="c.nombre"
            :color="c.color"
            :icono="c.icono"
            :cantidad="juego.mazos[c.id]?.length ?? 0"
            :activo="resaltada === c.id"
            :inclinacion="-INCLINACIONES[i]"
          />
        </div>
      </div>

      <!-- Mazos en pantallas pequeñas -->
      <div class="grid grid-cols-3 gap-x-3 gap-y-4 pt-1 sm:gap-x-6 lg:hidden">
        <Mazo
          v-for="c in [izquierda[0], derecha[0], izquierda[1], derecha[1], izquierda[2], derecha[2]]"
          :key="c.id"
          :nombre="c.nombre"
          :color="c.color"
          :icono="c.icono"
          :cantidad="juego.mazos[c.id]?.length ?? 0"
          :activo="resaltada === c.id"
        />
      </div>
    </section>

    <!-- Cartas especiales y tablero -->
    <section class="relative z-10 grid gap-4 px-3 pt-2 pb-1 sm:px-6 xl:grid-cols-[19rem_1fr] xl:items-center">
      <div class="mx-auto w-full max-w-sm xl:max-w-none">
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="(e, tipo) in ESPECIALES"
            :key="tipo"
            type="button"
            class="group block w-full cursor-pointer rounded-xl focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-bosque"
            :title="`¿Qué hace ${e.nombre}?`"
            @click="infoEspecial = tipo"
          >
            <Mazo
              class="group-hover:-translate-y-1.5"
              :nombre="e.nombre"
              etiqueta=""
              :color="e.color"
              :icono="e.icono"
              :cantidad="juego.mazos[tipo]?.length ?? 0"
              :activo="juego.fase === 'especial' && juego.especial?.tipo === tipo"
            />
          </button>
        </div>
        <p class="mt-3 text-center text-xs font-bold text-tinta/50">👆 Toca una carta para ver qué hace</p>
        <PenalizacionesEquipo :key="equipo.id" :equipo="equipo" class="mt-3" />
      </div>
      <Tablero :equipos="juego.equipos" :meta="juego.config.meta" :turno="juego.turno" @ver-especial="infoEspecial = $event" />
    </section>

    <p class="relative z-10 hidden px-6 pt-2 text-center text-xs font-semibold text-tinta/50 sm:block">
      Atajos: <kbd>Espacio</kbd> girar · <kbd>1</kbd>–<kbd>4</kbd> responder · <kbd>S</kbd>/<kbd>N</kbd> calificar reto ·
      <kbd>Enter</kbd> continuar · <kbd>M</kbd> sonido · <kbd>Esc</kbd> salir
    </p>
    <Paisaje class="block h-16 w-full sm:h-24" />

    <!-- Cartas -->
    <CartaPregunta
      v-if="juego.fase === 'carta' && juego.carta?.tipo === 'pregunta'"
      :carta="juego.carta"
      :categoria="CATEGORIA_POR_ID[juego.carta.categoria]"
      :equipo="equipo"
      :tiempo="juego.config.tiempo"
      :intento="juego.intento"
      @resolver="resolverCarta"
    />
    <CartaReto
      v-if="juego.fase === 'carta' && juego.carta?.tipo === 'reto'"
      :carta="juego.carta"
      :categoria="CATEGORIA_POR_ID.retos"
      :equipo="equipo"
      :intento="juego.intento"
      @resolver="resolverCarta"
    />
    <CartaEspecial v-if="juego.fase === 'especial' && juego.especial" :especial="juego.especial" :equipo="equipo" @continuar="resolverEspecial" />
    <RuletaCastigo v-if="juego.fase === 'castigo'" :equipo="equipo" @aplicar="aplicarCastigo" />
    <InfoEspecial v-if="infoEspecial" :tipo="infoEspecial" @cerrar="infoEspecial = null" />
    <SalirPartida v-if="verSalir" @pausar="pausarPartida" @finalizar="nuevaPartida" @cerrar="verSalir = false" />
    <Ganador
      v-if="juego.fase === 'fin' && juego.ganador !== null"
      :equipos="juego.equipos"
      :ganador-id="juego.ganador"
      :meta="juego.config.meta"
      @revancha="revancha"
      @nueva="nuevaPartida"
    />

    <Modal v-if="verReglas" ancho="max-w-xl">
      <article class="papel rounded-3xl border-4 border-tinta p-5 shadow-2xl sm:p-7">
        <h2 class="font-display text-3xl text-bosque">¿Cómo se juega?</h2>
        <Reglas class="mt-3" />
        <button
          type="button"
          class="mt-5 w-full rounded-2xl bg-bosque px-6 py-3 font-display text-xl text-white shadow-[0_5px_0_#134524] transition hover:brightness-110"
          @click="verReglas = false"
        >
          ¡Entendido!
        </button>
      </article>
    </Modal>
  </main>
</template>
