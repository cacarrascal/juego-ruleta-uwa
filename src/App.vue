<script setup>
import { juego } from './composables/useJuego'
import Configuracion from './components/Configuracion.vue'
import Juego from './components/Juego.vue'
import Aviso from './components/Aviso.vue'
import AvisoInactividad from './components/AvisoInactividad.vue'
import { useInactividad } from './composables/useInactividad'
import logo from './assets/logo-ing-carlos.webp'

const { segundosRestantes, seguir } = useInactividad()
</script>

<template>
  <div class="fondo-mesa min-h-dvh p-2 font-sans text-tinta sm:p-4 lg:p-6">
    <Configuracion v-if="juego.pantalla === 'inicio'" />
    <Juego v-else />
    <footer class="mt-3 flex justify-center">
      <img
        :src="logo"
        alt="Ing. Carlos"
        title="Ing. Carlos"
        width="44"
        height="44"
        class="size-11 rounded-full shadow-[0_2px_10px_rgb(0_0_0/0.45)] ring-2 ring-papel/30"
      />
    </footer>
    <Aviso />
    <AvisoInactividad v-if="segundosRestantes !== null" :segundos="segundosRestantes" @seguir="seguir" />
  </div>
</template>
