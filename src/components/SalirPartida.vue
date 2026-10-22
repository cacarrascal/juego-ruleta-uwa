<script setup>
import Modal from './Modal.vue'
import Icono from './Icono.vue'

const emit = defineEmits(['pausar', 'finalizar', 'cerrar'])
</script>

<template>
  <Modal ancho="max-w-md">
    <article class="papel rounded-3xl border-4 border-tinta p-5 shadow-2xl sm:p-6">
      <h2 class="font-display text-3xl text-bosque">¿Salir de la partida?</h2>
      <p class="mt-1 font-semibold text-tinta/70">Elige qué hacer con la partida actual.</p>

      <div class="mt-4 space-y-3">
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-2xl border-[3px] border-bosque bg-green-50 p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
          @click="emit('pausar')"
        >
          <span class="grid size-11 shrink-0 place-items-center rounded-full bg-bosque text-white">
            <Icono nombre="pausa" class="size-5" />
          </span>
          <span>
            <strong class="block font-display text-xl font-normal">Volver al inicio</strong>
            <span class="text-sm font-semibold text-tinta/70">La partida queda guardada: puedes continuarla después.</span>
          </span>
        </button>

        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-2xl border-[3px] border-red-500 bg-red-50 p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
          @click="emit('finalizar')"
        >
          <span class="grid size-11 shrink-0 place-items-center rounded-full bg-red-600 text-white">
            <Icono nombre="bandera" class="size-5" />
          </span>
          <span>
            <strong class="block font-display text-xl font-normal">Finalizar partida</strong>
            <span class="text-sm font-semibold text-tinta/70">Se termina la partida y se borra el progreso.</span>
          </span>
        </button>

        <button
          type="button"
          class="w-full rounded-2xl border-2 border-tinta/20 bg-white py-2.5 font-display text-lg transition hover:border-tinta"
          @click="emit('cerrar')"
        >
          Seguir jugando <kbd class="ml-1 rounded bg-tinta/10 px-1.5 py-0.5 text-xs">Esc</kbd>
        </button>
      </div>
    </article>
  </Modal>
</template>
