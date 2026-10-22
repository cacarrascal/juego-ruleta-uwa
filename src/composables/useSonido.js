import { reactive, watch } from 'vue'

// Efectos de sonido sintetizados con Web Audio: no hace falta ningún archivo de audio.
const CLAVE = 'desafio-ecopark-uwa:sonido'

function leerPreferencia() {
  try {
    return localStorage.getItem(CLAVE) !== 'off'
  } catch {
    return true
  }
}

export const ajustes = reactive({ sonido: leerPreferencia() })

watch(
  () => ajustes.sonido,
  (activo) => {
    try {
      localStorage.setItem(CLAVE, activo ? 'on' : 'off')
    } catch {}
  },
)

let ctx = null
function audio() {
  if (!ctx) {
    const Contexto = window.AudioContext || window.webkitAudioContext
    if (!Contexto) return null
    ctx = new Contexto()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tono(frecuencia, duracion, { tipo = 'sine', volumen = 0.15, retraso = 0, hasta = null } = {}) {
  if (!ajustes.sonido) return
  const c = audio()
  if (!c) return
  const t0 = c.currentTime + retraso
  const osc = c.createOscillator()
  const gan = c.createGain()
  osc.type = tipo
  osc.frequency.setValueAtTime(frecuencia, t0)
  if (hasta) osc.frequency.exponentialRampToValueAtTime(hasta, t0 + duracion)
  gan.gain.setValueAtTime(0.0001, t0)
  gan.gain.exponentialRampToValueAtTime(volumen, t0 + 0.012)
  gan.gain.exponentialRampToValueAtTime(0.0001, t0 + duracion)
  osc.connect(gan).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + duracion + 0.03)
}

const secuencia = (notas, paso, opciones) =>
  notas.forEach((f, i) => tono(f, opciones.duracion ?? 0.2, { ...opciones, retraso: i * paso }))

export const sonido = {
  tick: () => tono(1500, 0.03, { tipo: 'square', volumen: 0.05 }),
  carta: () => tono(320, 0.2, { tipo: 'triangle', volumen: 0.12, hasta: 960 }),
  paso: () => tono(620, 0.09, { volumen: 0.12, hasta: 930 }),
  reloj: () => tono(980, 0.05, { tipo: 'square', volumen: 0.045 }),
  correcto: () => secuencia([523.25, 659.25, 783.99, 1046.5], 0.09, { tipo: 'triangle', volumen: 0.16, duracion: 0.24 }),
  incorrecto: () => {
    tono(311, 0.22, { tipo: 'sawtooth', volumen: 0.07 })
    tono(220, 0.42, { tipo: 'sawtooth', volumen: 0.07, retraso: 0.2 })
  },
  alarma: () => secuencia([880, 880, 880], 0.16, { tipo: 'square', volumen: 0.06, duracion: 0.1 }),
  premio: () => secuencia([784, 988, 1175, 1568], 0.07, { volumen: 0.13, duracion: 0.2 }),
  penalidad: () => secuencia([392, 330, 262], 0.18, { tipo: 'square', volumen: 0.06, duracion: 0.3 }),
  victoria: () => {
    secuencia([523, 659, 784, 1047, 784], 0.14, { tipo: 'triangle', volumen: 0.16, duracion: 0.16 })
    tono(1047, 0.8, { tipo: 'triangle', volumen: 0.16, retraso: 0.7 })
  },
}
