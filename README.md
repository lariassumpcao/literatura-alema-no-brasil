# Projeto Literatura Alema

## Utilização
Para utilizar o projeto localmente, são necessários apenas os seguintes comandos:
```sh
# Instalar todas as dependências do projeto
npm install
```

Após a instalação das dependências, o próximo passo é inicializar o servidor e abrir o site.
```sh
# Abre o servidor nodejs e define uma URL para usar no navegador, provavelmente http://localhost:5173.
npm run dev

# Se quiser, é possível iniciar o servidor e abrir o navegador padrão do sistema já no site com esse comando
npm run dev -- --open
```

Após a adição de novas funcionalidades ou outras alterações, use o comando abaixo para gerar uma versão final pronta para a publicação.
```sh
npm run build
```

Se necessário, é possível pré visualizar a versão final usando o comando `npm run preview`.
