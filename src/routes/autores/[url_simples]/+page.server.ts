import { autores, obras } from "$lib/bd";
import { error } from '@sveltejs/kit';

import type { Autor, Obra } from '$lib/utils/types';
import type { PageServerLoad } from './$types';

export function entries(): { url_simples: string }[] {
	return autores.map((autor) => ({
		url_simples: autor.url_simples
	}));
}

export const load: PageServerLoad = ({ params }) => {
	const autor: Autor | undefined = autores.find((a) => a.url_simples === params.url_simples);

	if (!autor) {
		error(404, 'Autor não encontrado');
	}

	const obras_autor: Obra[] = obras
		.filter((obra) => obra.autor_uid === autor.uid)
		.sort((a, b) => a.nome.localeCompare(b.nome));

	return {
		autor,
		obras_autor
	};
};