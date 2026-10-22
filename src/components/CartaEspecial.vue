<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import Modal from './Modal.vue'
import Icono from './Icono.vue'
import { ESPECIALES, textoEfecto } from '../data/especiales'

const props = defineProps({
  especial: { type: Object, required: true },
  equipo: { type: Object, required: true },
})
const emit = defineEmits(['continuar'])

const info = computed(() => ESPECIALES[props.especial.tipo])

let enviado = false
function continuar() {
  if (enviado) return
  enviado = true
  emit('continuar')
}

function tecla(e) {
  if (e.repeat || (e.key !== 'Enter' && e.key !== ' ')) return
  e.preventDefault()
  continuar()
}

onMounted(() => window.addEventListener('keydown', tecla))
onUnmounted(() => window.removeEventListener('keydown', tecla))
</script>

<template>
  <Modal ancho="max-w-md">
    <article class="overflow-hidden rounded-3xl border-4 border-tinta text-center text-tinta shadow-2xl" :style="{ background: info.color }">
      <div class="p-6 sm:p-8">
        <p class="text-sm font-extrabold tracking-wide uppercase">Casilla especial · {{ equipo.avatar }} {{ equipo.nombre }}</p>
        <div class="mx-auto mt-4 grid size-28 place-items-center rounded-full border-4 border-tinta bg-papel">
          <Icono :nombre="info.icono" class="size-16 animate-flotar" />
        </div>
        <h2 class="mt-3 font-display text-4xl uppercase">{{ info.nombre }}</h2>
        <p class="mt-3 text-xl font-bold text-balance">{{ especial.texto }}</p>
        <p class="mt-5 inline-block rounded-full bg-tinta px-5 py-2 font-display text-2xl text-papel">
          {{ textoEfecto(especial.efecto) }}
        </p>
        <button
          type="button"
          class="mt-6 block w-full rounded-2xl border-[3px] border-tinta bg-papel px-6 py-3 font-display text-xl transition hover:-translate-y-0.5 hover:shadow-lg"
          @click="continuar"
        >
          Continuar <kbd class="ml-2 rounded bg-tinta/10 px-1.5 py-0.5 text-xs">Enter</kbd>
        </button>
      </div>
    </article>
  </Modal>
</template>
