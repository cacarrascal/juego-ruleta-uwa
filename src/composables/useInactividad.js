import { ref, onMounted, onUnmounted } from 'vue'
import { juego, nuevaPartida, avisar } from './useJuego'
import { MINUTOS_INACTIVIDAD, SEGUNDOS_AVISO_INACTIVIDAD } from '../data/reglas'

const LIMITE = MINUTOS_INACTIVIDAD * 60_000
const AVISO = SEGUNDOS_AVISO_INACTIVIDAD * 1000
const EVENTOS_PASIVOS = ['pointerdown', 'pointermove', 'wheel', 'touchstart']

// Durante una partida, si nadie interactúa en MINUTOS_INACTIVIDAD, se termina y vuelve al inicio.
// En los últimos segundos devuelve la cuenta regresiva para mostrar un aviso.
export function useInactividad() {
  const segundosRestantes = ref(null) // null = no hay que mostrar aviso
  let ultimaActividad = Date.now()
  let intervalo = null

  function actividad() {
    ultimaActividad = Date.now()
    segundosRestantes.value = null
  }

  // Con el aviso en pantalla, la tecla solo lo cierra (así no se gira la ruleta por accidente).
  function tecla(e) {
    if (segundosRestantes.value !== null) {
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    actividad()
  }

  function revisar() {
    if (juego.pantalla !== 'juego') return actividad()
    const restante = LIMITE - (Date.now() - ultimaActividad)
    if (restante <= 0) {
      actividad()
      nuevaPartida()
      avisar('⏱️ El juego volvió al inicio por inactividad', 6000)
    } else {
      segundosRestantes.value = restante <= AVISO ? Math.ceil(restante / 1000) : null
    }
  }

  onMounted(() => {
    EVENTOS_PASIVOS.forEach((ev) => window.addEventListener(ev, actividad, { capture: true, passive: true }))
    window.addEventListener('keydown', tecla, { capture: true })
    intervalo = setInterval(revisar, 1000)
  })
  onUnmounted(() => {
    EVENTOS_PASIVOS.forEach((ev) => window.removeEventListener(ev, actividad, { capture: true }))
    window.removeEventListener('keydown', tecla, { capture: true })
    clearInterval(intervalo)
  })

  return { segundosRestantes, seguir: actividad }
}
