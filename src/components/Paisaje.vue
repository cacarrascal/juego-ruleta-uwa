<script setup>
// Franja decorativa inferior: bosque con un río en el centro, como la cartulina.
let semilla = 7
const azar = () => ((semilla = (semilla * 9301 + 49297) % 233280) / 233280)

const VERDES = ['#2f7d32', '#3f9142', '#4fa34a', '#5cb85c', '#2a6b2e']
const arboles = []
for (let x = 10; x < 1200; x += 26 + azar() * 22) {
  if (x > 520 && x < 690) continue // el río
  const y = 96 + azar() * 40
  arboles.push({ x, y, r: 14 + azar() * 12, conifera: azar() < 0.35, color: VERDES[Math.floor(azar() * VERDES.length)] })
}
arboles.sort((a, b) => a.y - b.y)
</script>

<template>
  <svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path d="M0 150V92c180-34 360 4 560-20 210-26 420 10 640-12v90z" fill="#9fd07a" />
    <path d="M0 150v-34c220-20 380 6 600-6 240-14 400 8 600-4v44z" fill="#7fbd5e" />
    <path d="M588 70c26 14-28 22 8 36 44 16-46 26-86 44h270c-40-18-50-30-6-42 36-10-20-24 14-38z" fill="#5fb4e8" />
    <path d="M600 92c18 6 30 4 46 0M574 122c30 8 60 8 96 0M556 140c40 6 90 6 140-2" stroke="#e3f4ff" stroke-width="3" fill="none" stroke-linecap="round" />
    <ellipse cx="548" cy="138" rx="18" ry="8" fill="#9aa5ad" />
    <ellipse cx="720" cy="132" rx="22" ry="9" fill="#8a959d" />
    <g v-for="(a, i) in arboles" :key="i">
      <template v-if="a.conifera">
        <rect :x="a.x - 2.5" :y="a.y - 4" width="5" height="10" fill="#6b4423" />
        <path :d="`M${a.x} ${a.y - a.r * 2.4}l${a.r * 0.75} ${a.r * 2.2}h${-a.r * 1.5}z`" :fill="a.color" />
      </template>
      <template v-else>
        <rect :x="a.x - 3" :y="a.y - 6" width="6" height="14" fill="#6b4423" />
        <circle :cx="a.x" :cy="a.y - a.r" :r="a.r" :fill="a.color" />
        <circle :cx="a.x - a.r * 0.55" :cy="a.y - a.r * 0.7" :r="a.r * 0.7" :fill="a.color" />
        <circle :cx="a.x + a.r * 0.55" :cy="a.y - a.r * 0.75" :r="a.r * 0.65" :fill="a.color" />
        <circle :cx="a.x - a.r * 0.3" :cy="a.y - a.r * 1.3" :r="a.r * 0.35" fill="#fff" opacity=".12" />
      </template>
    </g>
  </svg>
</template>
