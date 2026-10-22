<script setup>
defineProps({ ancho: { type: String, default: 'max-w-2xl' } })
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto bg-tinta/60 backdrop-blur-[3px]">
      <div class="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div class="w-full animate-entrar" :class="ancho">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
