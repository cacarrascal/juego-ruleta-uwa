// Azar con crypto.getRandomValues: más impredecible que Math.random, para que nadie se aprenda el orden.

export function azar() {
  const valor = new Uint32Array(1)
  crypto.getRandomValues(valor)
  return valor[0] / 2 ** 32 // número entre 0 (incluido) y 1 (excluido)
}

export const azarEntero = (max) => Math.floor(azar() * max)

export function barajar(lista) {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = azarEntero(i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
