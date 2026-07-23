import autores_data from '$lib/autores.json';
import obras_data from '$lib/obras.json';

// TODO:
// Definir um Type Definition para cada objeto aqui, como Autor, Obra, Edição...

export const autores = Object.values(autores_data);
export const obras = Object.values(obras_data);

// export const autores = [
//     {
//         uid: 'a45arae45afgsre5y',
//         nome: 'August Heinrich Julius',
//         sobrenome: 'Lafontaine',
//         url_simples: 'august-heinrich-julius-lafontaine',
//         outros_nomes: [],
//         nascimento: 1758,
//         morte: 1831,
//         imagem: '',
//         bio: ''
//     }
// ];

// export const obras = [
//     {
//         uid: '54cwergerv6ewrthvety',
//         autor_uid: 'a45arae45afgsre5y',
//         nome: 'Tinschen oder die Männerprobe',
//         url_simples: 'tinschen-oder-die-maennerprobe',
//         publicacao: 1812,
//         imagem: '',
//         referencia: '',
//         resumo: '',
//         edicoes: [
//             {
//                 uid: '6vuewgcw45y65',
//                 nome: 'Tinschen oder die Männerprobe',
//                 publicacao: 1812,
//                 volumes: [
//                     {
//                         titulo: 'Volume 1',
//                         locais: [
//                             {
//                                 local: 'google-books',
//                                 url: 'https://books.google.de/books?id=vWRnAAAAcAAJ'
//                             },
//                             {
//                                 local: 'hathitrust',
//                                 url: 'https://books.google.de/books?id=vWRnAAAAcAAJ'
//                             }
//                         ]
//                     },
//                     {
//                         titulo: 'Volume 2',
//                         locais: [
//                             {
//                                 local: 'hathitrust',
//                                 url: 'https://books.google.de/books?id=vWRnAAAAcAAJ'
//                             }
//                         ]
//                     },
//                     {
//                         titulo: 'Volume 3',
//                         locais: [
//                             {
//                                 local: 'google-books',
//                                 url: 'https://books.google.de/books?id=vWRnAAAAcAAJ'
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ]