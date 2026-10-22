<script setup>
import { juego } from '../composables/useJuego'
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="juego.aviso"
        :key="juego.aviso.id"
        role="status"
        class="fixed top-4 left-1/2 z-[60] max-w-[92vw] -translate-x-1/2 rounded-full border-[3px] border-tinta bg-papel px-5 py-2 text-center font-extrabold shadow-xl"
      >
        {{ juego.aviso.texto }}
      </div>
    </Transition>
  </Teleport>
</template>
