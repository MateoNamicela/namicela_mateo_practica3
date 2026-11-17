import { describe, it, expect } from 'vitest';
import { filtrarPersonajes } from './filtrarPersonajes';

describe('filtrarPersonajes', () => {
  const personajes = [
    { id: 1, name: 'Homer Simpson' },
    { id: 2, name: 'Marge Simpson' },
    { id: 3, name: 'Ned Flanders' },
  ];

  it('filtra por nombre sin distinguir mayúsculas y minúsculas', () => {
    const resultado = filtrarPersonajes(personajes, 'HOMER');

    expect(resultado).toEqual([{ id: 1, name: 'Homer Simpson' }]);
  });

  it('encuentra coincidencias en cualquier parte del nombre', () => {
    const resultado = filtrarPersonajes(personajes, 'simp');

    expect(resultado).toHaveLength(2);
  });

  it('devuelve todos los personajes si la búsqueda está vacía o solo tiene espacios', () => {
    const resultado = filtrarPersonajes(personajes, '   ');

    expect(resultado).toEqual(personajes);
  });

  it('devuelve un arreglo vacío si ningún nombre coincide', () => {
    const resultado = filtrarPersonajes(personajes, 'zzz');

    expect(resultado).toEqual([]);
  });
});
