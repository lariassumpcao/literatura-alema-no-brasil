import type { Autor, Obra, CatalogoAutores } from '$lib/utils/types';

export function find_autor(obra: Obra, autores: Autor[]): Autor | undefined;
export function find_autor(obra: Obra, catalogo: CatalogoAutores): Autor | undefined;

export function find_autor(obra: Obra, autores: Autor[] | CatalogoAutores): Autor | undefined {
	if (Array.isArray(autores)) {
		return autores.find((autor) => autor.uid === obra.autor_uid);
	}

	return autores[obra.autor_uid];
}

export function minAno(values: Array<number | string | null | undefined>): number {
  let min = Infinity;

  for (const value of values) {
    const year = Number(value);

    if (!Number.isFinite(year)) continue;

    // Ignore unknown/invalid years like 0 or "0000"
    // Deactivated for now, as we have a lot of works without exact dates.
    // if (year <= 0) continue;

    if (year < min) {
      min = year;
    }
  }

  return min === Infinity ? 0 : min;
}

export function maxAno(values: Array<number | string | null | undefined>): number {
  let max = -Infinity;

  for (const value of values) {
    const year = Number(value);

    if (!Number.isFinite(year)) continue;

    // Ignore unknown/invalid years like 0 or "0000"
    if (year <= 0) continue;

    if (year > max) {
      max = year;
    }
  }

  return max === -Infinity ? 0 : max;
}