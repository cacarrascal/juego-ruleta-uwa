// Ruleta de penalización: sale cuando un equipo falla 2 veces en el mismo turno.
// lineas: texto que aparece en el sector de la ruleta.
export const CASTIGOS = [
  {
    id: 'menos5',
    titulo: 'Quitarle 5 puntos al equipo',
    explicacion: 'El equipo penalizado pierde 5 puntos.',
    lineas: ['-5', 'PUNTOS'],
    emoji: '📉',
    color: '#ff6b6b',
  },
  {
    id: 'despues',
    titulo: '¡Inténtalo después!',
    explicacion: 'No pierde nada más: lo intenta de nuevo en su próximo turno.',
    lineas: ['INTÉNTALO', 'DESPUÉS'],
    emoji: '⏳',
    color: '#ffd43b',
  },
  {
    id: 'quitaTurno',
    titulo: 'Quítale el turno al equipo siguiente',
    explicacion: 'El equipo que sigue en la ronda pierde su próximo turno.',
    lineas: ['SIN TURNO', 'AL SIGUIENTE'],
    emoji: '🚫',
    color: '#ff922b',
  },
  {
    id: 'rondaPasada',
    titulo: 'Pierdes los puntos de la ronda pasada',
    explicacion: 'Pierde los puntos que ganó en la ronda anterior.',
    lineas: ['PIERDES', 'RONDA PASADA'],
    emoji: '⏪',
    color: '#da77f2',
  },
  {
    id: 'dar10',
    titulo: 'Pierdes 10 puntos y debes darlos a un equipo',
    explicacion: 'Pierde 10 puntos y se los regala al equipo que elija.',
    lineas: ['-10 PARA', 'OTRO EQUIPO'],
    emoji: '🤝',
    color: '#4dabf7',
  },
]
