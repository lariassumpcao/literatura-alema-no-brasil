import { obras, autores, catalogoAutores } from '$lib/bd';
import { minAno, maxAno, find_autor } from '$lib/utils/utils';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        obras: obras.sort((a,b) => a.nome.localeCompare(b.nome)).map((obra) => ({
            nome: obra.nome,
            autor: find_autor(obra, catalogoAutores),
            publicacao: parseInt(obra.publicacao),
            url_simples: obra.url_simples,
            edicoes: obra.edicoes
        })),
        // autores: autores.sort((a,b) => a.sobrenome.localeCompare(b.sobrenome) || a.nome.localeCompare(b.nome)).map((autor) => ({
        autores: autores.map((autor) => ({
            nome: autor.nome,
            sobrenome: autor.sobrenome,
            url_simples: autor.url_simples,
            num_obras: obras.filter((obra) => obra.autor_uid == autor.uid).length,
        })).sort((a,b) => b.num_obras - a.num_obras),
        // iniciais: listaObras.map((obra) => obra.nome.slice(0,1)).filter((value, index, array) => array.indexOf(value) === index).sort(),
        primeira_publicacao: minAno(obras.map((obra) => obra.publicacao)),
        ultima_publicacao: maxAno(obras.map((obra) => obra.publicacao)),
    }
}