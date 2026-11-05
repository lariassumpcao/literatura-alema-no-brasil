import { autores, obras } from '$lib/bd';
import { minAno, maxAno } from '$lib/utils/utils';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        autores: autores.sort((a,b) => a.sobrenome.localeCompare(b.sobrenome) || a.nome.localeCompare(b.nome)).map((autor) => ({
            nome: autor.nome,
            sobrenome: autor.sobrenome,
            nascimento: autor.nascimento,
            morte: autor.morte,
            url_simples: autor.url_simples,
            num_obras: obras.filter((obra) => obra.autor_uid == autor.uid).length,
        })),
        // iniciais: listaAutores.map((autor) => autor.sobrenome.slice(0,1).toUpperCase()).filter((value, index, array) => array.indexOf(value) === index).sort(),
        primeiro_nascimento: minAno(autores.map((autor) => autor.nascimento)),
                ultima_morte: maxAno(autores.map((autor) => autor.morte)),
    }
}