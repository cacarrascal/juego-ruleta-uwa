<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import confetti from 'canvas-confetti'
import Modal from './Modal.vue'

const props = defineProps({
  equipos: { type: Array, required: true },
  ganadorId: { type: Number, required: true },
  meta: { type: Number, required: true },
})
const emit = defineEmits(['revancha', 'nueva'])

const ganador = computed(() => props.equipos.find((e) => e.id === props.ganadorId))
const ranking = computed(() => [...props.equipos].sort((a, b) => b.puntos - a.puntos || b.aciertos - a.aciertos))
const MEDALLAS = ['🥇', '🥈', '🥉']

let intervalo = null
onMounted(() => {
  const colores = ['#5dbb4c', '#f8d42b', '#4aa3e6', '#a57ad8', '#f7942e', '#ee4b5a']
  const fin = Date.now() + 2800
  intervalo = setInterval(() => {
    if (Date.now() > fin) return clearInterval(intervalo)
    confetti({ particleCount: 40, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: colores })
    confetti({ particleCount: 40, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: colores })
  }, 350)
})
onUnmounted(() => clearInterval(intervalo))
</script>

<template>
  <Modal ancho="max-w-xl">
    <article class="papel overflow-hidden rounded-3xl border-4 border-tinta text-center shadow-2xl">
      <div class="px-6 pt-7 pb-5" :style="{ background: `${ganador.color}22` }">
        <p class="text-7xl">🏆</p>
        <p class="mt-2 text-sm font-extrabold tracking-widest text-tinta/60 uppercase">¡Llegaron a la meta!</p>
        <h2 class="mt-1 font-display text-4xl leading-tight sm:text-5xl" :style="{ color: ganador.color }">
          {{ ganador.avatar }} {{ ganador.nombre }}
        </h2>
        <p class="mt-1 text-lg font-bold">son los guardianes del Eco-Park U'wa</p>
      </div>

      <ol class="space-y-2 px-5 py-5 text-left">
        <li
          v-for="(eq, i) in ranking"
          :key="eq.id"
          class="flex items-center gap-3 rounded-2xl border-2 bg-white px-3 py-2"
          :style="{ borderColor: eq.color }"
        >
          <span class="w-8 text-center text-2xl">{{ MEDALLAS[i] ?? `${i + 1}.` }}</span>
          <span class="text-2xl">{{ eq.avatar }}</span>
          <span class="min-w-0 flex-1 truncate font-extrabold">{{ eq.nombre }}</span>
          <span class="text-sm font-semibold whitespace-nowrap text-tinta/60">✔ {{ eq.aciertos }} · ✘ {{ eq.fallos }}</span>
          <span class="rounded-full px-2 py-0.5 text-sm font-extrabold whitespace-nowrap text-white tabular-nums" :style="{ background: eq.color }">
            {{ eq.puntos }} pts
          </span>
        </li>
      </ol>

      <div class="grid gap-3 px-5 pb-6 sm:grid-cols-2">
        <button
          type="button"
          class="rounded-2xl bg-bosque px-5 py-3 font-display text-xl text-white shadow-[0_5px_0_#134524] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
          @click="emit('revancha')"
        >
          🔁 Revancha
        </button>
        <button
          type="button"
          class="rounded-2xl border-[3px] border-tinta bg-white px-5 py-3 font-display text-xl transition hover:-translate-y-0.5 hover:shadow-lg"
          @click="emit('nueva')"
        >
          Nueva partida
        </button>
      </div>
    </article>
  </Modal>
</template>
