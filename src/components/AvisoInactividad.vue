<script setup>
defineProps({ segundos: { type: Number, required: true } })
const emit = defineEmits(['seguir'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[70] flex items-center justify-center bg-tinta/70 p-4 backdrop-blur-sm" role="alertdialog" aria-live="assertive">
      <article class="w-full max-w-sm animate-entrar rounded-3xl border-4 border-tinta bg-papel p-6 text-center shadow-2xl">
        <p class="text-5xl">⏱️</p>
        <h2 class="mt-2 font-display text-3xl text-bosque">¿Siguen jugando?</h2>
        <p class="mt-2 font-semibold text-tinta/75">Por inactividad, el juego volverá al inicio en</p>
        <p class="font-display text-7xl text-red-600 tabular-nums">{{ segundos }}</p>
        <button
          type="button"
          class="mt-4 w-full rounded-2xl bg-bosque px-6 py-3 font-display text-xl text-white shadow-[0_5px_0_#134524] transition hover:brightness-110 active:translate-y-1 active:shadow-none"
          @click="emit('seguir')"
        >
          ¡Seguimos aquí!
        </button>
      </article>
    </div>
  </Teleport>
</template>
