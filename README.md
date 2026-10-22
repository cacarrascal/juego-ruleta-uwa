# Desafío Eco-Park U'wa 🎡

Juego de ruleta por equipos sobre flora, fauna, paisajes, cultura U'wa y servicios del parque.
Hecho con Vue 3, Tailwind CSS 4 y Vite.

Desarrollado por David Carrascal, Anyeli Pérez y Sebastián Santiago.

---

## Cómo se juega

1. Se arman de 2 a 6 equipos (nombre, animal y color) y se elige la duración y el tiempo por pregunta.
2. Por turnos, cada equipo **gira la ruleta**. La ruleta escoge una de 6 categorías y se roba una carta de ese mazo:
   Flora, Fauna, Paisajes, Cultura U'wa, Servicios o Retos.
3. **Respuesta correcta o reto cumplido: +10 puntos** (la ficha avanza una casilla del tablero; cada casilla vale 10).
4. **Si fallan, tienen otra oportunidad:** vuelven a girar en el mismo turno.
   Si fallan **2 veces en el mismo turno** (preguntas o retos), giran la **ruleta de penalización**.
5. Los **retos** tienen cronómetro y los califica el moderador (✔ lo lograron / ✘ no lo lograron).
6. Gana el primer equipo en llegar a la **META** (80, 120 o 160 puntos según la duración elegida).

### Casillas especiales del tablero

Al responder bien y llegar a una de estas casillas, se roba una carta especial:

| Casilla | Carta | Qué hace |
| --- | --- | --- |
| ⭐ | **Bonus +2** | Avanza 2 casillas (+20 puntos) |
| 🎁 | **Puntos extra** | +10 puntos o vuelve a girar la ruleta |
| ⚠️ | **Penalidad** | Retrocede 1 o 2 casillas (−10 o −20 puntos) o pierde el próximo turno |

Tocando cualquiera de estas tres cartas (o su ícono en el tablero) se abre una explicación con todas las cartas del mazo.

### Ruleta de penalización

Sale cuando un equipo falla 2 veces en el mismo turno:

- 📉 **Quitarle 5 puntos al equipo**
- ⏳ **¡Inténtalo después!** (no pierde nada más)
- 🚫 **Quítale el turno al equipo siguiente**
- ⏪ **Pierdes los puntos de la ronda pasada**
- 🤝 **Pierdes 10 puntos y debes darlos a un equipo** (el equipo penalizado elige a quién)

Durante el turno de cada equipo aparece la card **"Penalizaciones de [equipo]"** con todo lo que le ha tocado
(ronda y puntos perdidos). Solo se muestra en el turno de ese equipo y si tiene alguna penalización.

### Atajos de teclado

| Tecla | Acción |
| --- | --- |
| `Espacio` | Girar la ruleta |
| `1`–`4` o `A`–`D` | Responder |
| `S` / `N` | Calificar un reto (lo lograron / no) |
| `Enter` | Continuar |
| `M` | Activar o silenciar el sonido |
| `Esc` | Salir de la partida |

### Otras funciones

- **Botón "← Inicio"** (o `Esc`): permite **volver al inicio** dejando la partida guardada para continuarla después, o **finalizar la partida** y borrar el progreso.
- **Partida guardada:** si se recarga la página, en el inicio aparece "Continuar partida".
- **Preguntas al azar:** los mazos se barajan en cada partida y las cartas que ya salieron en partidas anteriores quedan al fondo, para que no se repitan en el mismo orden ni se puedan memorizar. Las opciones A–D también cambian de lugar.
- **Inactividad:** si nadie toca el juego durante **5 minutos**, aparece un aviso de 30 segundos y luego la partida termina y vuelve al inicio.
- Pantalla completa, sonidos (sin archivos de audio) y diseño adaptable a computador, proyector y celular.

---

## Jugar en el computador

Doble clic en **`jugar.bat`**: la primera vez instala lo necesario, luego prepara el juego y lo abre en el navegador.
Si el computador no tiene Node.js, abre la última versión ya compilada (`dist/index.html`).

Comandos (requieren [Node.js](https://nodejs.org) 22.12 o superior):

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run preview
```

- `npm run dev`: modo edición con recarga automática.
- `npm run build`: genera **un solo archivo**, `dist/index.html`, con todo incluido (fuentes y logo). Funciona sin internet, incluso abriéndolo con doble clic.
- `npm run preview`: sirve la versión compilada con las mismas cabeceras de seguridad que Vercel.

---

## Desplegar en Vercel

1. En GitHub crea un repositorio nuevo, por ejemplo `desafio-ecopark-uwa`.
2. **Add file → Upload files** y arrastra **solo** esto:
   - la carpeta `src` (completa)
   - `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `vercel.json`, `.gitignore`, `README.md`, `jugar.bat`

   ⚠️ **No** subas `node_modules` ni `dist` (Vercel los genera solo).
3. En Vercel: **Add New → Project → Import** el repositorio → **Deploy**.
   No hay que cambiar nada: `vercel.json` ya le indica que es Vite, que instale con `npm ci`, compile con `npm run build` y publique la carpeta `dist`.

Cada vez que cambies algo en GitHub (por ejemplo, las preguntas), Vercel vuelve a publicar solo en unos segundos.

### Seguridad de la URL

`vercel.json` también:

- obliga a usar HTTPS (`Strict-Transport-Security`);
- impide que otra página meta el juego dentro de un marco (`X-Frame-Options` / `frame-ancestors`);
- bloquea scripts, conexiones o formularios hacia otros sitios (`Content-Security-Policy`);
- hace que cualquier ruta (por ejemplo `/algo`) abra el juego en vez de dar error 404.

> Por la protección de marcos, el juego no se puede incrustar en otra página (por ejemplo, Google Sites).
> Si algún día se necesita, hay que quitar `X-Frame-Options` y `frame-ancestors 'none'` de `vercel.json`.

---

## Personalizar el juego

Todos estos archivos se pueden editar directo en GitHub con el lápiz ✏️:

| Archivo | Qué contiene |
| --- | --- |
| `src/data/preguntas.js` | Las 60 preguntas (12 por categoría) y los 15 retos |
| `src/data/especiales.js` | Cartas de Bonus +2, Puntos extra y Penalidad |
| `src/data/castigos.js` | Opciones de la ruleta de penalización |
| `src/data/reglas.js` | Puntos por acierto, puntos por casilla, fallos para la penalización y minutos de inactividad |
| `src/data/equipos.js` | Nombres, animales y colores de equipo por defecto |
| `src/data/categorias.js` | Categorías de la ruleta (nombre, color e ícono) |

### Formato de las preguntas

```js
{
  p: '¿Cuál es el único oso que vive en Sudamérica?',
  o: ['El oso de anteojos', 'El oso pardo', 'El oso polar', 'El oso panda'],
  dato: 'Se llama así por las manchas claras alrededor de sus ojos.',
}
```

- `p`: la pregunta.
- `o`: las opciones. **La primera siempre es la correcta** (el juego las revuelve al mostrarlas).
- `dato`: dato curioso que aparece después de responder (opcional).

Los retos llevan `texto` y `segundos` (duración del cronómetro).

---

## Estructura del proyecto

```
src/
  App.vue                 pantalla de inicio o de juego, logo y aviso de inactividad
  components/             ruleta, mazos, cartas, tablero, ruleta de penalización, ventanas…
  composables/
    useJuego.js           estado y reglas de la partida (turnos, puntos, mazos, penalizaciones)
    useInactividad.js     reinicio por inactividad
    useSonido.js          efectos de sonido con Web Audio
  data/                   contenido y reglas editables (ver tabla de arriba)
  utils/azar.js           azar con crypto para barajar y girar
  assets/                 logo
```
