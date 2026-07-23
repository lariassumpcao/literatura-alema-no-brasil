import { obras, autores } from '$lib/bd';

export function load() {
    return {
        autores: autores.length,
        obras: obras.length,
        fontes: 132,
        cidades: 24,
        paises: 10
    }
}