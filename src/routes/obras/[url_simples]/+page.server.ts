import { obras, autores } from "$lib/bd";
import { error } from '@sveltejs/kit';

export function entries() {
  return obras.map((obra) => ({ url_simples: String(obra.url_simples) }));
}

export function load({ params }) {
    const obra = obras.find((obra) => obra.url_simples === params.url_simples);
    if (!obra) error(404);

    const autor = autores.find((autor) => obra.autor_uid === autor.uid);

    return {
        obra, autor
    };
};