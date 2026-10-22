<script setup>
import Icono from './Icono.vue'
import { ESPECIALES } from '../data/especiales'
import { CASTIGOS } from '../data/castigos'
import { PUNTOS_ACIERTO, PUNTOS_CASILLA, FALLOS_PARA_CASTIGO } from '../data/reglas'
</script>

<template>
  <div>
    <ol class="space-y-2 text-base">
      <li class="flex gap-2"><span class="font-display text-bosque">1.</span> Por turnos, cada equipo gira la ruleta.</li>
      <li class="flex gap-2"><span class="font-display text-bosque">2.</span> La ruleta escoge la categoría y se roba una carta de ese mazo.</li>
      <li class="flex gap-2">
        <span class="font-display text-bosque">3.</span>
        <span>
          <strong>Respuesta correcta o reto cumplido: +{{ PUNTOS_ACIERTO }} puntos</strong> (cada casilla del tablero vale {{ PUNTOS_CASILLA }}).
          Si falla o se acaba el tiempo, no suma.
        </span>
      </li>
      <li class="flex gap-2">
        <span class="font-display text-bosque">4.</span>
        <span>
          <strong>Si fallan, tienen otra oportunidad:</strong> vuelven a girar en el mismo turno. Si fallan
          {{ FALLOS_PARA_CASTIGO }} veces en el turno (preguntas o retos), giran la <strong>ruleta de penalización</strong>.
        </span>
      </li>
      <li class="flex gap-2"><span class="font-display text-bosque">5.</span> Las cartas de <strong>Retos</strong> las califica el moderador.</li>
      <li class="flex gap-2"><span class="font-display text-bosque">6.</span> Gana el primer equipo en llegar a la <strong>META</strong>. 🏁</li>
    </ol>

    <p class="mt-4 text-sm font-extrabold tracking-wide text-tinta/60 uppercase">Casillas especiales del tablero</p>
    <ul class="mt-2 grid gap-2">
      <li v-for="(e, tipo) in ESPECIALES" :key="tipo" class="flex items-center gap-2 rounded-xl border-2 border-tinta/15 bg-white px-2 py-1.5">
        <span class="grid size-8 shrink-0 place-items-center rounded-lg border-2 border-tinta/60" :style="{ background: e.color }">
          <Icono :nombre="e.icono" class="size-5" />
        </span>
        <span class="text-sm leading-tight">
          <strong>{{ e.nombre }}:</strong> <span class="text-tinta/75">{{ e.resumen }}</span>
        </span>
      </li>
    </ul>

    <p class="mt-4 text-sm font-extrabold tracking-wide text-tinta/60 uppercase">Ruleta de penalización</p>
    <ul class="mt-2 grid gap-1.5 sm:grid-cols-2">
      <li v-for="c in CASTIGOS" :key="c.id" class="flex items-center gap-2 rounded-xl border-2 bg-white px-2 py-1.5 text-sm font-bold" :style="{ borderColor: c.color }">
        <span class="text-lg">{{ c.emoji }}</span> {{ c.titulo }}
      </li>
    </ul>
  </div>
</template>
