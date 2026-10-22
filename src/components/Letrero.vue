<script setup>
import Icono from './Icono.vue'

// enLinea: en pantallas grandes el título va en una sola línea para ahorrar alto.
defineProps({ enLinea: Boolean })
</script>

<template>
  <div class="inline-flex flex-col items-center">
    <div class="madera relative inline-block rounded-xl px-8 py-2 text-center sm:px-12" :class="enLinea ? 'lg:py-2' : 'sm:py-3'">
      <span v-for="pos in ['top-1.5 left-1.5', 'top-1.5 right-1.5', 'bottom-1.5 left-1.5', 'bottom-1.5 right-1.5']" :key="pos"
        class="absolute size-2 rounded-full bg-madera-oscura shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]" :class="pos" />
      <Icono nombre="hoja" class="absolute top-2 left-4 size-5 -rotate-12 text-bosque sm:size-6" />
      <Icono nombre="hoja" class="absolute right-4 bottom-2 size-5 rotate-[160deg] text-bosque sm:size-6" />
      <h1
        class="font-display leading-[0.95] text-bosque [text-shadow:0_2px_0_rgb(255_240_215/0.75)]"
        :class="enLinea ? 'text-[clamp(1.7rem,4.2vw,2.6rem)]' : 'text-[clamp(1.7rem,4.2vw,3.3rem)]'"
      >
        DESAFÍO<br :class="enLinea && 'lg:hidden'" /><span v-if="enLinea" class="hidden lg:inline">&nbsp;</span>ECO-PARK U'WA
      </h1>
    </div>
    <p class="mt-2.5 px-2 text-center text-xs font-bold text-tinta/60 sm:text-sm">
      Desarrollado por David Carrascal, Anyeli Pérez y Sebastián Santiago
    </p>
  </div>
</template>
