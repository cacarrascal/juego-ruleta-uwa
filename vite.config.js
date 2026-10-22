import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run preview` usa las mismas cabeceras de seguridad que Vercel, para probarlas en local.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const cabecerasSeguridad = Object.fromEntries(vercel.headers[0].headers.map((h) => [h.key, h.value]))

// viteSingleFile empaqueta todo (JS, CSS y fuentes) en un único dist/index.html
// que funciona sin internet, incluso abriéndolo con doble clic.
export default defineConfig({
  plugins: [vue(), tailwindcss(), viteSingleFile()],
  preview: { headers: cabecerasSeguridad },
})
