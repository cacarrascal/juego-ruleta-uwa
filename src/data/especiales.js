import { PUNTOS_CASILLA } from './reglas'

// Cartas de las casillas especiales del tablero.
// efecto.tipo: 'avanza' | 'retrocede' (con n casillas), 'pierde' (pierde el próximo turno), 'gira' (vuelve a girar)
export const ESPECIALES = {
  bonus: {
    nombre: 'Bonus +2',
    color: '#5dbb4c',
    icono: 'estrella',
    cuando: 'Cuando un equipo responde bien y su ficha llega a una casilla ⭐ del tablero.',
    resumen: 'El equipo avanza 2 casillas extra (+20 puntos).',
    cartas: [
      { texto: 'Avistaste un cóndor andino planeando sobre la montaña.', efecto: { tipo: 'avanza', n: 2 } },
      { texto: 'Recogiste la basura que otros dejaron en el sendero.', efecto: { tipo: 'avanza', n: 2 } },
      { texto: 'Llevaste tu botella reutilizable y no usaste plásticos de un solo uso.', efecto: { tipo: 'avanza', n: 2 } },
      { texto: 'Ayudaste a un compañero con soroche a descansar e hidratarse.', efecto: { tipo: 'avanza', n: 2 } },
      { texto: 'Fotografiaste la fauna sin acercarte ni molestarla.', efecto: { tipo: 'avanza', n: 2 } },
      { texto: 'Separaste correctamente todos tus residuos.', efecto: { tipo: 'avanza', n: 2 } },
    ],
  },
  extra: {
    nombre: 'Puntos extra',
    color: '#4aa3e6',
    icono: 'regalo',
    cuando: 'Cuando un equipo responde bien y su ficha llega a una casilla 🎁 del tablero.',
    resumen: 'El equipo gana 1 casilla extra (+10 puntos) o vuelve a girar la ruleta.',
    cartas: [
      { texto: 'Encontraste huellas de oso de anteojos y le avisaste al guardaparques.', efecto: { tipo: 'avanza', n: 1 } },
      { texto: '¡Un colibrí te llenó de energía!', efecto: { tipo: 'gira' } },
      { texto: 'Respondiste todas las preguntas del guía intérprete.', efecto: { tipo: 'avanza', n: 1 } },
      { texto: 'El guardaparques te invita a otro desafío.', efecto: { tipo: 'gira' } },
      { texto: 'Sembraste un árbol nativo en la jornada de restauración.', efecto: { tipo: 'avanza', n: 1 } },
      { texto: "Compartiste con respeto lo que aprendiste de la cultura U'wa.", efecto: { tipo: 'gira' } },
    ],
  },
  penalidad: {
    nombre: 'Penalidad',
    color: '#ee4b5a',
    icono: 'alerta',
    cuando: 'Cuando un equipo responde bien pero su ficha llega a una casilla ⚠️ del tablero.',
    resumen: 'El equipo retrocede 1 o 2 casillas (−10 o −20 puntos) o pierde su próximo turno.',
    cartas: [
      { texto: 'Arrancaste un frailejón para tomarte una foto.', efecto: { tipo: 'retrocede', n: 2 } },
      { texto: 'Dejaste basura en el sendero.', efecto: { tipo: 'retrocede', n: 1 } },
      { texto: 'Te saliste del sendero y te perdiste en la niebla.', efecto: { tipo: 'pierde' } },
      { texto: 'Le diste comida a un animal silvestre.', efecto: { tipo: 'retrocede', n: 1 } },
      { texto: 'Hiciste una fogata en una zona prohibida.', efecto: { tipo: 'retrocede', n: 2 } },
      { texto: 'Pusiste música a todo volumen y espantaste a la fauna.', efecto: { tipo: 'pierde' } },
    ],
  },
}

const casillas = (n) => `${n} casilla${n === 1 ? '' : 's'}`

export function textoEfecto(efecto) {
  switch (efecto.tipo) {
    case 'avanza': return `Avanza ${casillas(efecto.n)} (+${efecto.n * PUNTOS_CASILLA} puntos)`
    case 'retrocede': return `Retrocede ${casillas(efecto.n)} (−${efecto.n * PUNTOS_CASILLA} puntos)`
    case 'pierde': return 'Pierde el próximo turno'
    case 'gira': return '¡Gira otra vez!'
  }
}

// Versión corta para etiquetas pequeñas.
export function chipEfecto(efecto) {
  switch (efecto.tipo) {
    case 'avanza': return `+${efecto.n * PUNTOS_CASILLA} pts`
    case 'retrocede': return `−${efecto.n * PUNTOS_CASILLA} pts`
    case 'pierde': return 'Pierde turno'
    case 'gira': return 'Gira otra vez'
  }
}
