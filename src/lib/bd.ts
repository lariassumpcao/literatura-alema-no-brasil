import autores_data from '$lib/autores.json';
import obras_data from '$lib/obras.json';
import type { Autor, Obra, CatalogoAutores, CatalogoObras } from '$lib/utils/types';

export const autores: Autor[] = Object.values(autores_data);
export const obras: Obra[] = Object.values(obras_data);

export const catalogoAutores = autores_data as CatalogoAutores;
export const catalogoObras = obras_data as CatalogoObras;