import { autores, obras } from "$lib/bd";
import { error } from '@sveltejs/kit';

export function entries() {
  return autores.map((autor) => ({ url_simples: String(autor.url_simples) }));
}

export function load({ params }) {
    const autor = autores.find((autor) => autor.url_simples == params.url_simples);

    if (!autor) error(404, "Autor não encontrado");

    let obras_autor = obras.filter((obra) => obra.autor_uid == autor.uid).sort((a,b) => a.nome.localeCompare(b.nome));

    return {
        autor, obras_autor
    };
};