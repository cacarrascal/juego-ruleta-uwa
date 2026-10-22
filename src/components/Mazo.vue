<script setup>
import Icono from './Icono.vue'

defineProps({
  nombre: { type: String, required: true },
  etiqueta: { type: String, default: 'Preguntas' },
  color: { type: String, required: true },
  icono: { type: String, required: true },
  cantidad: { type: Number, default: null },
  activo: Boolean,
  inclinacion: { type: Number, default: 0 },
})
</script>

<template>
  <div
    class="relative w-full transition-transform duration-300"
    :class="activo ? 'z-10 scale-110' : ''"
    :style="{ rotate: `${inclinacion}deg` }"
  >
    <!-- Cartas de abajo del mazo -->
    <div
      class="absolute inset-0 translate-x-[5px] translate-y-[7px] rotate-[3deg] rounded-xl border-2 border-black/20 brightness-90"
      :style="{ background: color }"
    />
    <div
      class="absolute inset-0 translate-x-[2px] translate-y-[3px] -rotate-[2deg] rounded-xl border-2 border-black/20 brightness-95"
      :style="{ background: color }"
    />
    <div
      class="relative flex aspect-[3/2] flex-col items-center justify-center gap-1 rounded-xl border-2 border-black/25 px-2 text-center text-tinta shadow-md"
      :class="activo && 'animate-brillo'"
      :style="{ background: color }"
    >
      <Icono :nombre="icono" class="size-7 sm:size-9" />
      <p class="font-display text-[0.7rem] leading-none uppercase sm:text-sm xl:text-base">
        <span v-if="etiqueta" class="block">{{ etiqueta }}</span>
        <span class="block">{{ nombre }}</span>
      </p>
      <span
        v-if="cantidad !== null"
        class="absolute -top-2 -right-2 grid h-6 min-w-6 place-items-center rounded-full border-2 border-tinta bg-papel px-1 text-xs font-extrabold"
        :title="`${cantidad} cartas en el mazo`"
      >
        {{ cantidad }}
      </span>
    </div>
  </div>
</template>
