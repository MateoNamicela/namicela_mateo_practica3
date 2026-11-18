export function filtrarPersonajes(personajes, texto) {
  const busqueda = texto.trim().toLowerCase()

  if (busqueda === '') {
    return personajes
  }

  return personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda)
  )
}
