import { obras, autores } from '$lib/bd';
import { find_autor, minAno, maxAno } from '$lib/utils/utils';

import type { PageServerLoad } from './$types';
import type { AnalisePageData } from '$lib/utils/types';

export const load: PageServerLoad = (): AnalisePageData => {
	return {
		obras: obras
			.sort((a, b) => a.nome.localeCompare(b.nome))
			.map((obra) => ({
				nome: obra.nome,
				autor: find_autor(obra, autores),
				publicacao: parseInt(obra.publicacao),
				url_simples: obra.url_simples,
				edicoes: obra.edicoes
			})),

		autores: autores
			.sort((a, b) => a.sobrenome.localeCompare(b.sobrenome) || a.nome.localeCompare(b.nome))
			.map((autor) => ({
				nome: autor.nome,
				sobrenome: autor.sobrenome,
				nascimento: autor.nascimento,
				morte: autor.morte,
				url_simples: autor.url_simples,
				num_obras: obras.filter((obra) => obra.autor_uid === autor.uid).length
			})),

		primeira_publicacao: minAno(obras.map((obra) => obra.publicacao)),
		ultima_publicacao: maxAno(obras.map((obra) => obra.publicacao)),
		primeiro_nascimento: minAno(autores.map((autor) => autor.nascimento)),
		ultima_morte: maxAno(autores.map((autor) => autor.morte))
	};
};