// Sectores de la ruleta en sentido horario, empezando arriba (igual que el tablero de cartulina).
export const CATEGORIAS = [
  { id: 'fauna', nombre: 'Fauna', lineas: ['FAUNA'], color: '#f8d42b', icono: 'huella' },
  { id: 'paisajes', nombre: 'Paisajes', lineas: ['PAISAJES'], color: '#4aa3e6', icono: 'montana' },
  { id: 'cultura', nombre: "Cultura U'wa", lineas: ['CULTURA', "U'WA"], color: '#a57ad8', icono: 'uwa' },
  { id: 'servicios', nombre: 'Servicios', lineas: ['SERVICIOS'], color: '#f7942e', icono: 'casa' },
  { id: 'retos', nombre: 'Retos', lineas: ['RETOS'], color: '#ee4b5a', icono: 'caminante' },
  { id: 'flora', nombre: 'Flora', lineas: ['FLORA'], color: '#5dbb4c', icono: 'planta' },
]

export const CATEGORIA_POR_ID = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]))
