<script setup>
// Aviso tras un fallo: en el primero el equipo vuelve a girar; en el segundo del mismo turno, ruleta de penalización.
defineProps({ castigo: Boolean })
</script>

<template>
  <p
    class="mt-3 rounded-xl border-2 px-3 py-2 text-base font-extrabold"
    :class="castigo ? 'border-red-600 bg-red-600 text-white' : 'border-amber-400 bg-amber-100 text-amber-900'"
  >
    <template v-if="castigo">😱 ¡Segundo fallo en este turno! Les toca la ruleta de penalización.</template>
    <template v-else>🔁 ¡Tienen otra oportunidad! Vuelven a girar. Si fallan otra vez, les toca la ruleta de penalización.</template>
  </p>
</template>
