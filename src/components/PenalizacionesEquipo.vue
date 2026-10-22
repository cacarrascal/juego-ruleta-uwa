<script setup>
import { computed } from 'vue'
import Icono from './Icono.vue'

// Penalizaciones del equipo que tiene el turno; no se muestra si no tiene ninguna.
const props = defineProps({ equipo: { type: Object, required: true } })

const MAXIMO = 4
const lista = computed(() => props.equipo.penalizaciones ?? [])
const recientes = computed(() => [...lista.value].reverse().slice(0, MAXIMO))
const perdidos = computed(() => lista.value.reduce((total, p) => total + Math.min(0, p.puntos), 0))
</script>

<template>
  <section v-if="lista.length" class="animate-entrar overflow-hidden rounded-2xl border-[3px] border-[#c92a2a] bg-red-50 text-left shadow-md">
    <header class="flex items-center gap-2 bg-[#c92a2a] px-3 py-1.5 text-white">
      <Icono nombre="alerta" class="size-6 shrink-0" />
      <div class="min-w-0 flex-1 leading-tight">
        <p class="text-[0.65rem] font-extrabold tracking-wider uppercase opacity-85">Penalizaciones de</p>
        <p class="truncate font-display text-base" :title="equipo.nombre">{{ equipo.avatar }} {{ equipo.nombre }}</p>
      </div>
      <span class="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-extrabold text-[#c92a2a]">{{ lista.length }}</span>
    </header>
    <ul class="divide-y divide-red-200">
      <li v-for="(p, i) in recientes" :key="lista.length - i" class="flex items-start gap-2 px-3 py-1.5">
        <span class="text-lg leading-6">{{ p.emoji }}</span>
        <span class="min-w-0 flex-1 leading-tight">
          <span class="block text-sm font-extrabold">{{ p.texto }}</span>
          <span class="block text-xs font-semibold text-tinta/65">{{ p.detalle }} · ronda {{ p.ronda }}</span>
        </span>
        <span
          v-if="p.puntos < 0"
          class="mt-0.5 shrink-0 rounded-full bg-[#c92a2a] px-2 py-0.5 text-xs font-extrabold whitespace-nowrap text-white tabular-nums"
        >
          −{{ -p.puntos }}
        </span>
      </li>
    </ul>
    <p class="flex justify-between gap-2 border-t border-red-200 bg-red-100/70 px-3 py-1 text-xs font-extrabold text-[#a61e1e]">
      <span>{{ lista.length > MAXIMO ? `y ${lista.length - MAXIMO} más…` : 'Total perdido' }}</span>
      <span class="tabular-nums">{{ perdidos ? `−${-perdidos} pts` : '0 pts' }}</span>
    </p>
  </section>
</template>
