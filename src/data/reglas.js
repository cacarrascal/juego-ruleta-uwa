// Reglas de puntaje del juego.
export const PUNTOS_ACIERTO = 10 // por respuesta correcta o reto cumplido
export const PUNTOS_CASILLA = 10 // cada casilla del tablero equivale a 10 puntos
// Intentos por turno: si el equipo falla vuelve a girar; al fallar este número de veces en el mismo turno
// (preguntas o retos) le sale la ruleta de penalización.
export const FALLOS_PARA_CASTIGO = 2

// Si nadie toca el juego durante estos minutos, la partida termina y vuelve al inicio.
export const MINUTOS_INACTIVIDAD = 5
export const SEGUNDOS_AVISO_INACTIVIDAD = 30 // se avisa antes de reiniciar
