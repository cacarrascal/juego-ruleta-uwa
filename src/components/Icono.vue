<script setup>
import { computed } from 'vue'

const props = defineProps({ nombre: { type: String, required: true } })

// relleno: true → silueta sólida (estilo tablero); false → ícono de línea
const ICONOS = {
  planta: {
    relleno: true,
    svg: `<path d="M11.1 11h1.8v10.6a.9.9 0 0 1-1.8 0z"/>
      <path d="M12 11c-1-3.5-1-7 0-10 1 3 1 6.5 0 10z"/>
      <path d="M11.4 12C8 11.5 5.2 9 4.5 5.2 8 5.8 10.6 8.4 11.4 12z"/>
      <path d="M12.6 12c3.4-.5 6.2-3 6.9-6.8-3.5.6-6.1 3.2-6.9 6.8z"/>
      <path d="M11.3 16.5c-3.8.3-7.1-1.5-8.8-4.7 3.8-.4 7 1.5 8.8 4.7z"/>
      <path d="M12.7 16.5c3.8.3 7.1-1.5 8.8-4.7-3.8-.4-7 1.5-8.8 4.7z"/>`,
  },
  huella: {
    relleno: true,
    svg: `<ellipse cx="12" cy="16.5" rx="5.2" ry="4.6"/>
      <ellipse cx="5.2" cy="10.2" rx="2.2" ry="2.7" transform="rotate(-20 5.2 10.2)"/>
      <ellipse cx="9.4" cy="5.8" rx="2.3" ry="2.9" transform="rotate(-8 9.4 5.8)"/>
      <ellipse cx="14.6" cy="5.8" rx="2.3" ry="2.9" transform="rotate(8 14.6 5.8)"/>
      <ellipse cx="18.8" cy="10.2" rx="2.2" ry="2.7" transform="rotate(20 18.8 10.2)"/>`,
  },
  montana: {
    relleno: true,
    svg: `<path d="M1 19 8.5 6l4 6.5 2.5-3.8L23 19z"/>
      <path d="M8.5 6 6.4 9.6l1.3-.6 1 1.2 1-1.3 1 .7z" fill="#fff"/>
      <path d="M15 8.7 13.8 10.5l.9-.3.6.8.6-.7.5.2z" fill="#fff"/>
      <path d="M3 22c3-1.6 6-1.6 9 0s6 1.6 9 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  },
  uwa: {
    relleno: true,
    svg: `<path d="M4 8.5C5 5 8.2 2.8 12 2.8s7 2.2 8 5.7z"/>
      <rect x="2.5" y="8" width="19" height="1.8" rx=".9"/>
      <path d="M6.6 6.4h10.8" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="1.2 1"/>
      <path d="M8 10.5h8v2.3a4 4 0 0 1-8 0z"/>
      <circle cx="10.3" cy="11.8" r=".6" fill="#fff"/>
      <circle cx="13.7" cy="11.8" r=".6" fill="#fff"/>
      <path d="M5.5 22c0-4.5 2.7-7.2 6.5-7.2s6.5 2.7 6.5 7.2z"/>
      <path d="M8.2 19.2h7.6" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="1.2 1"/>`,
  },
  casa: {
    relleno: true,
    svg: `<path d="M12 2.5 1.5 11.2l1.3 1.5L4 11.6V21h6v-6h4v6h6v-9.4l1.2 1.1 1.3-1.5L19 8.3V4h-3v1.8z"/>`,
  },
  caminante: {
    relleno: true,
    svg: `<circle cx="13.5" cy="3.5" r="2.1"/>
      <rect x="7.2" y="7" width="3.8" height="6.5" rx="1.2"/>
      <path d="M11.5 7.2h2.4l1.5 6.3h-4.2z"/>
      <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12.2 13.5 10.6 18l-2 4"/>
        <path d="m14.6 13.4 1.7 4 .8 4.6"/>
        <path d="m13.7 8.4 2.6 2.7 2.2-1.3"/>
      </g>
      <path d="M18.9 7.5 20.1 22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>`,
  },
  hoja: {
    relleno: true,
    svg: `<path d="M4.5 19.5C3.8 11 9 4 20.5 3.5 20.8 14 14 20.5 4.5 19.5z"/>
      <path d="M4.5 19.5 15 9" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>`,
  },
  estrella: {
    relleno: true,
    svg: `<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>`,
  },
  regalo: {
    relleno: false,
    svg: `<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>`,
  },
  alerta: {
    relleno: false,
    svg: `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
  },
  sonido: {
    relleno: false,
    svg: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`,
  },
  silencio: {
    relleno: false,
    svg: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>`,
  },
  pantalla: {
    relleno: false,
    svg: `<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>`,
  },
  reiniciar: {
    relleno: false,
    svg: `<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>`,
  },
  ayuda: {
    relleno: false,
    svg: `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
  },
  reloj: {
    relleno: false,
    svg: `<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M10 2h4"/>`,
  },
  play: {
    relleno: true,
    svg: `<path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/>`,
  },
  atras: { relleno: false, svg: `<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>` },
  pausa: { relleno: true, svg: `<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>` },
  bandera: { relleno: false, svg: `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>` },
  check: { relleno: false, svg: `<path d="M20 6 9 17l-5-5"/>` },
  cruz: { relleno: false, svg: `<path d="M18 6 6 18"/><path d="m6 6 12 12"/>` },
}

const icono = computed(() => ICONOS[props.nombre] ?? ICONOS.estrella)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    :fill="icono.relleno ? 'currentColor' : 'none'"
    :stroke="icono.relleno ? 'none' : 'currentColor'"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    v-html="icono.svg"
  />
</template>
