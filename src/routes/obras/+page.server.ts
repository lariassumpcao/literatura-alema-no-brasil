import { obras, autores } from '$lib/bd';

let find_autor = (obra) => autores.find((autor) => autor.uid === obra.autor_uid);

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

export function load() {
    return {
        obras: obras.sort((a,b) => a.nome.localeCompare(b.nome)).map((obra) => ({
            nome: obra.nome,
            autor: find_autor(obra),
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
        // iniciais: obras.map((obra) => obra.nome.slice(0,1)).filter((value, index, array) => array.indexOf(value) === index).sort(),
        primeira_publicacao: obras.map((obra) => obra.publicacao).min(),
        ultima_publicacao: obras.map((obra) => obra.publicacao).max(),
    }
}