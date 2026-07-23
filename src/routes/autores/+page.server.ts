import { autores, obras } from '$lib/bd';

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

export function load() {
    return {
        autores: autores.sort((a,b) => a.sobrenome.localeCompare(b.sobrenome) || a.nome.localeCompare(b.nome)).map((autor) => ({
            nome: autor.nome,
            sobrenome: autor.sobrenome,
            nascimento: autor.nascimento,
            morte: autor.morte,
            url_simples: autor.url_simples,
            num_obras: obras.filter((obra) => obra.autor_uid == autor.uid).length,
        })),
        // iniciais: autores.map((autor) => autor.sobrenome.slice(0,1).toUpperCase()).filter((value, index, array) => array.indexOf(value) === index).sort(),
        primeiro_nascimento: autores.map((autor) => autor.nascimento).min(),
        ultima_morte: autores.map((autor) => autor.morte).max(),
    }
}