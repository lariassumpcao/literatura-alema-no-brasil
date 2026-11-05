import { obras, autores } from "$lib/bd";
import { error } from '@sveltejs/kit';

import type { Autor, Obra } from '$lib/utils/types';
import type { PageServerLoad } from './$types';

export function entries(): { url_simples: string }[] {
	return obras.map((obra) => ({
		url_simples: obra.url_simples
	}));
}

// export function load({ params }) {
//     const obra = obras.find((obra) => obra.url_simples === params.url_simples);
//     if (!obra) error(404);

//     const autor = autores.find((autor) => obra.autor_uid === autor.uid);

//     return {
//         obra, autor
//     };
// };


export const load: PageServerLoad = ({ params }) => {
	const obra = obras.find((obra) => obra.url_simples === params.url_simples);

	if (!obra) {
		error(404, 'Obra não encontrada');
	}

    const autor: Autor | undefined = autores.find((autor) => obra.autor_uid === autor.uid);

	return {
		obra,
        autor
	};
};