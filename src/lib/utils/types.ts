/**
 * Type definitions for the main catalog objects:
 * Autor, Obra and Edicao.
 */

/**
 * A single edition of a work.
 */
export interface Edicao {
	uid: string;
	nome: string;

	/**
	 * Translator / adapter of this edition.
	 */
	'tradutor-adaptador': string;

	/**
	 * Publication year as text.
	 * Examples: "1817", or "0000" when unknown.
	 */
	publicacao: string;
}

/**
 * A work, with its author reference and its editions.
 */
export interface Obra {
	uid: string;

	/** UID of the author (Autor) of this work. */
	autor_uid: string;

	nome: string;
	url_simples: string;

	/**
	 * Publication year as text.
	 * Examples: "1844", or "0" when unknown.
	 */
	publicacao: string;

	imagem: string;
	referencia: string;
	resumo: string;

	edicoes: Edicao[];
}

/**
 * An author of works.
 */
export interface Autor {
	uid: string;
	nome: string;
	sobrenome: string;
	url_simples: string;

	/** Alternative names / pseudonyms. */
	outros_nomes: string[];

	nascimento: number | null;
	morte: number | null;

	imagem: string;
	bio: string;
}

/**
 * The raw catalogs are stored as objects keyed by uid,
 * for example:
 *
 *     { "f7f6fa0a-...": { uid: "f7f6fa0a-...", nome: "Achim von", ... } }
 */
export type CatalogoAutores = Record<string, Autor>;
export type CatalogoObras = Record<string, Obra>;

/**
 * Transformed shapes returned by load() functions.
 * These are the shapes consumed by the pages/components.
 */

export interface ObraResumo {
	nome: string;
	autor: Autor | undefined;
	publicacao: number;
	url_simples: string;
	edicoes: Edicao[];
}

export interface AutorResumo {
	nome: string;
	sobrenome: string;
	nascimento: number;
	morte: number;
	url_simples: string;
	num_obras: number;
}

export interface AnalisePageData {
	obras: ObraResumo[];
	autores: AutorResumo[];
	primeira_publicacao: number;
	ultima_publicacao: number;
	primeiro_nascimento: number;
	ultima_morte: number;
}

/** 
 * Type for BarChart
*/
export interface ChartDatum {
	name: string;
	value: number;
}