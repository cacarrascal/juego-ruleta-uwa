import { reactive, watch } from 'vue'
import { CATEGORIAS, CATEGORIA_POR_ID } from '../data/categorias'
import { PREGUNTAS, RETOS } from '../data/preguntas'
import { ESPECIALES } from '../data/especiales'
import { CASTIGOS } from '../data/castigos'
import { PUNTOS_ACIERTO, PUNTOS_CASILLA, FALLOS_PARA_CASTIGO } from '../data/reglas'
import { sonido } from './useSonido'
import { barajar } from '../utils/azar'

const CLAVE = 'desafio-ecopark-uwa:partida'
const CLAVE_VISTAS = 'desafio-ecopark-uwa:vistas'

// Casillas especiales del tablero: el patrón se repite desde la casilla 1 (null = casilla normal).
const PATRON = [null, 'bonus', null, 'penalidad', null, 'extra']

export function tipoCasilla(i, meta) {
  if (i <= 0 || i >= meta) return null
  return PATRON[(i - 1) % PATRON.length]
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))
const casillaDe = (puntos) => Math.floor(puntos / PUNTOS_CASILLA)

function tamanoMazo(id) {
  if (id === 'retos') return RETOS.length
  if (ESPECIALES[id]) return ESPECIALES[id].cartas.length
  return PREGUNTAS[id].length
}

const nombreMazo = (id) => CATEGORIA_POR_ID[id]?.nombre ?? ESPECIALES[id].nombre

// Cartas que ya salieron (en esta o en partidas anteriores) desde que el mazo se completó por última vez.
// Al barajar quedan al fondo: cada partida nueva empieza con cartas que no se han visto y en otro orden.
const vistas = (() => {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_VISTAS) ?? '{}') ?? {}
  } catch {
    return {}
  }
})()

function marcarVista(id, indice) {
  const lista = (vistas[id] ??= [])
  if (!lista.includes(indice)) lista.push(indice)
  if (lista.length >= tamanoMazo(id)) vistas[id] = [] // ya salieron todas: empieza un ciclo nuevo
  try {
    localStorage.setItem(CLAVE_VISTAS, JSON.stringify(vistas))
  } catch {}
}

function mazoBarajado(id) {
  const yaVistas = new Set(vistas[id] ?? [])
  const indices = [...Array(tamanoMazo(id)).keys()]
  const nuevas = indices.filter((i) => !yaVistas.has(i))
  const repetidas = indices.filter((i) => yaVistas.has(i))
  // Se roba con pop() (desde el final): las cartas nuevas quedan encima.
  return [...barajar(repetidas), ...barajar(nuevas)]
}

function mazosNuevos() {
  const ids = [...CATEGORIAS.map((c) => c.id), ...Object.keys(ESPECIALES)]
  return Object.fromEntries(ids.map((id) => [id, mazoBarajado(id)]))
}

// penalizaciones: lo que le ha tocado al equipo ({ ronda, emoji, texto, detalle, puntos }); se muestra en su turno.
const marcadorEnCero = () => ({ puntos: 0, aciertos: 0, fallos: 0, pierdeTurno: false, historial: {}, penalizaciones: [] })

function registrarPenalizacion(equipo, { emoji, texto, detalle, puntos = 0 }) {
  ;(equipo.penalizaciones ??= []).push({ ronda: juego.ronda, emoji, texto, detalle, puntos })
}

const textoPuntos = (puntos) => `${puntos} pts`.replace('-', '−')

export const juego = reactive({
  pantalla: 'inicio', // 'inicio' | 'juego'
  config: { meta: 12, tiempo: 30 }, // meta en casillas; en puntos es meta × PUNTOS_CASILLA
  equipos: [],
  turno: 0,
  ronda: 1,
  intento: 1, // intento del equipo en este turno (al fallar vuelve a girar)
  fase: 'girar', // 'girar' | 'girando' | 'carta' | 'moviendo' | 'especial' | 'castigo' | 'fin'
  categoria: null,
  carta: null,
  especial: null,
  mazos: {},
  ganador: null,
  aviso: null,
})

export const metaPuntos = () => juego.config.meta * PUNTOS_CASILLA

let temporizadorAviso = null
let numeroAviso = 0
export function avisar(texto, ms = 2600) {
  juego.aviso = { id: ++numeroAviso, texto }
  clearTimeout(temporizadorAviso)
  temporizadorAviso = setTimeout(() => (juego.aviso = null), ms)
}

export function iniciarPartida(equipos, config) {
  Object.assign(juego, {
    pantalla: 'juego',
    config: { ...config },
    equipos: equipos.map((e, i) => ({
      id: i,
      nombre: e.nombre.trim() || `Equipo ${i + 1}`,
      avatar: e.avatar,
      color: e.color,
      ...marcadorEnCero(),
    })),
    turno: 0,
    intento: 1,
    ronda: 1,
    fase: 'girar',
    categoria: null,
    carta: null,
    especial: null,
    mazos: mazosNuevos(),
    ganador: null,
  })
}

export function revancha() {
  juego.equipos.forEach((e) => Object.assign(e, marcadorEnCero()))
  Object.assign(juego, {
    turno: 0,
    intento: 1,
    ronda: 1,
    fase: 'girar',
    categoria: null,
    carta: null,
    especial: null,
    mazos: mazosNuevos(),
    ganador: null,
  })
}

// Vuelve al inicio dejando la partida guardada para continuarla después.
export function pausarPartida() {
  juego.pantalla = 'inicio'
}

// Termina la partida, vuelve al inicio y borra el progreso guardado.
export function nuevaPartida() {
  Object.assign(juego, { pantalla: 'inicio', fase: 'girar', carta: null, especial: null, ganador: null })
  try {
    localStorage.removeItem(CLAVE)
  } catch {}
}

export const equipoActual = () => juego.equipos[juego.turno]
export const siguienteEquipo = () => juego.equipos[(juego.turno + 1) % juego.equipos.length]

// Puntos netos que el equipo ganó en la ronda anterior (0 si perdió o no hay ronda anterior).
export const puntosRondaPasada = (equipo) => Math.max(0, equipo.historial[juego.ronda - 1] ?? 0)

function robar(id) {
  if (!juego.mazos[id]?.length) {
    juego.mazos[id] = mazoBarajado(id)
    avisar(`🔄 Se barajó de nuevo el mazo de ${nombreMazo(id)}`)
  }
  const indice = juego.mazos[id].pop()
  marcarVista(id, indice)
  return indice
}

// La ruleta cayó en una categoría: se roba la carta de ese mazo.
export function caerEn(categoriaId) {
  juego.categoria = categoriaId
  const indice = robar(categoriaId)
  if (categoriaId === 'retos') {
    const reto = RETOS[indice]
    juego.carta = { tipo: 'reto', categoria: 'retos', texto: reto.texto, segundos: reto.segundos ?? 30 }
  } else {
    const pregunta = PREGUNTAS[categoriaId][indice]
    juego.carta = {
      tipo: 'pregunta',
      categoria: categoriaId,
      texto: pregunta.p,
      opciones: barajar(pregunta.o.map((texto, i) => ({ texto, correcta: i === 0 }))),
      dato: pregunta.dato,
    }
  }
  juego.fase = 'carta'
}

// Suma o resta puntos poco a poco para que la ficha se vea avanzar (máx. una casilla por paso).
// Devuelve los puntos que realmente cambiaron (no se baja de 0 ni se pasa de la meta).
async function mover(equipo, puntos) {
  juego.fase = 'moviendo'
  const inicial = equipo.puntos
  let restante = puntos
  while (restante !== 0) {
    const paso = Math.sign(restante) * Math.min(PUNTOS_CASILLA, Math.abs(restante))
    const nuevo = Math.min(metaPuntos(), Math.max(0, equipo.puntos + paso))
    if (nuevo === equipo.puntos) break
    equipo.historial[juego.ronda] = (equipo.historial[juego.ronda] ?? 0) + (nuevo - equipo.puntos)
    equipo.puntos = nuevo
    restante -= paso
    sonido.paso()
    await esperar(380)
  }
  await esperar(250)
  return equipo.puntos - inicial
}

function llegoALaMeta(equipo) {
  if (equipo.puntos < metaPuntos()) return false
  juego.ganador = equipo.id
  juego.fase = 'fin'
  sonido.victoria()
  return true
}

function sacarEspecial(tipo) {
  const carta = ESPECIALES[tipo].cartas[robar(tipo)]
  juego.especial = { tipo, ...carta }
  juego.fase = 'especial'
  if (tipo === 'penalidad') sonido.penalidad()
  else sonido.premio()
}

export async function resolverCarta(acierto) {
  const equipo = equipoActual()
  juego.carta = null
  if (acierto) {
    equipo.aciertos++
    juego.intento = 1
    const casillaAntes = casillaDe(equipo.puntos)
    await mover(equipo, PUNTOS_ACIERTO)
    if (llegoALaMeta(equipo)) return
    const casilla = casillaDe(equipo.puntos)
    const tipo = casilla > casillaAntes ? tipoCasilla(casilla, juego.config.meta) : null
    if (tipo) {
      await esperar(200)
      sacarEspecial(tipo)
      return
    }
  } else {
    equipo.fallos++
    if (juego.intento >= FALLOS_PARA_CASTIGO) {
      juego.intento = 1
      juego.fase = 'castigo'
      sonido.penalidad()
      return
    }
    // Primer fallo del turno: el mismo equipo vuelve a girar.
    juego.intento++
    juego.fase = 'girar'
    avisar(`${equipo.avatar} ¡${equipo.nombre} tiene otra oportunidad! Giren de nuevo`)
    return
  }
  siguienteTurno()
}

// Los efectos de las casillas especiales no se encadenan: si caes en otra casilla especial no pasa nada.
export async function resolverEspecial() {
  const equipo = equipoActual()
  const { tipo, texto, efecto } = juego.especial
  juego.especial = null
  switch (efecto.tipo) {
    case 'avanza':
      await mover(equipo, efecto.n * PUNTOS_CASILLA)
      if (llegoALaMeta(equipo)) return
      break
    case 'retrocede': {
      const perdidos = await mover(equipo, -efecto.n * PUNTOS_CASILLA)
      registrarPenalizacion(equipo, {
        emoji: '⚠️',
        texto,
        detalle: perdidos < 0 ? `Casilla de penalidad: ${textoPuntos(perdidos)}` : 'Casilla de penalidad: no tenían puntos que perder',
        puntos: perdidos,
      })
      break
    }
    case 'pierde':
      equipo.pierdeTurno = true
      if (tipo === 'penalidad') registrarPenalizacion(equipo, { emoji: '⚠️', texto, detalle: 'Casilla de penalidad: pierde el próximo turno' })
      break
    case 'gira':
      juego.fase = 'girar'
      avisar(`${equipo.avatar} ¡${equipo.nombre} gira otra vez!`)
      return
  }
  siguienteTurno()
}

// Resultado de la ruleta de penalización (ver data/castigos.js).
export async function aplicarCastigo({ id, receptorId }) {
  const equipo = equipoActual()
  const { emoji, titulo } = CASTIGOS.find((c) => c.id === id)
  const registrar = (detalle, puntos = 0) => registrarPenalizacion(equipo, { emoji, texto: titulo, detalle, puntos })
  switch (id) {
    case 'menos5': {
      const perdidos = await mover(equipo, -5)
      registrar(perdidos < 0 ? textoPuntos(perdidos) : 'No tenían puntos: se salvaron', perdidos)
      break
    }
    case 'despues':
      registrar('Sin pérdida de puntos')
      break
    case 'quitaTurno': {
      const siguiente = siguienteEquipo()
      siguiente.pierdeTurno = true
      registrar(`${siguiente.avatar} ${siguiente.nombre} pierde su turno`)
      registrarPenalizacion(siguiente, {
        emoji: '⏸️',
        texto: 'Perdieron un turno',
        detalle: `Por la ruleta de penalización de ${equipo.avatar} ${equipo.nombre}`,
      })
      break
    }
    case 'rondaPasada': {
      const perdidos = puntosRondaPasada(equipo) > 0 ? await mover(equipo, -puntosRondaPasada(equipo)) : 0
      registrar(perdidos < 0 ? textoPuntos(perdidos) : 'No ganaron puntos la ronda pasada: se salvaron', perdidos)
      break
    }
    case 'dar10': {
      const receptor = juego.equipos.find((e) => e.id === receptorId)
      const perdidos = receptor ? await mover(equipo, -Math.min(10, equipo.puntos)) : 0
      registrar(perdidos < 0 ? `Regalaron ${-perdidos} pts a ${receptor.avatar} ${receptor.nombre}` : 'No tenían puntos para regalar', perdidos)
      if (perdidos < 0) {
        await mover(receptor, -perdidos)
        if (llegoALaMeta(receptor)) return
      }
      break
    }
  }
  siguienteTurno()
}

function siguienteTurno() {
  const total = juego.equipos.length
  let siguiente = juego.turno
  for (let intento = 0; intento < total; intento++) {
    siguiente = (siguiente + 1) % total
    if (siguiente === 0) juego.ronda++
    const equipo = juego.equipos[siguiente]
    if (!equipo.pierdeTurno) break
    equipo.pierdeTurno = false
    avisar(`${equipo.avatar} ${equipo.nombre} pierde este turno`)
  }
  juego.turno = siguiente
  juego.intento = 1
  juego.fase = 'girar'
}

// ---- Partida guardada (por si se recarga la página a mitad de juego) ----

export function partidaGuardada() {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE) ?? 'null')
    if (guardada?.pantalla === 'juego' && guardada.equipos?.length >= 2 && guardada.fase !== 'fin') return guardada
  } catch {}
  return null
}

export function continuarGuardada() {
  const guardada = partidaGuardada()
  if (!guardada) return
  // Si el banco de preguntas cambió desde que se guardó, se descartan las cartas que ya no existen.
  const mazos = mazosNuevos()
  for (const id in mazos) {
    const previo = guardada.mazos?.[id]
    if (!Array.isArray(previo)) continue
    const validos = previo.filter((i) => Number.isInteger(i) && i >= 0 && i < tamanoMazo(id))
    if (validos.length) mazos[id] = validos
  }
  // Las partidas de la versión anterior contaban casillas (pos) en vez de puntos.
  const equipos = guardada.equipos.map(({ pos, ...e }) => ({
    ...marcadorEnCero(),
    ...e,
    puntos: e.puntos ?? (pos ?? 0) * PUNTOS_CASILLA,
  }))
  Object.assign(juego, {
    ...guardada,
    intento: guardada.intento ?? 1,
    equipos,
    mazos,
    fase: 'girar',
    carta: null,
    especial: null,
    ganador: null,
    aviso: null,
  })
}

// Solo se guarda mientras se juega: así, al volver al inicio, la última partida queda disponible para continuarla.
watch(
  juego,
  (estado) => {
    if (estado.pantalla !== 'juego') return
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ ...estado, aviso: null }))
    } catch {}
  },
  { deep: true },
)
