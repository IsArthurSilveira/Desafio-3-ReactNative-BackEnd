# API Web Backend - Biblioteca Virtual (CRUD Livro)

Este repositório contém a API RESTful de gerenciamento de livros, desenvolvida em Node.js e TypeScript.

## Tecnologias

A API é construída com Node.js/Express.js, utiliza TypeScript para tipagem e TypeORM para a persistência de dados. O banco de dados utilizado é o PostgreSQL na nuvem (Neon).

## Entidade Livro

O modelo Livro possui os seguintes campos principais, que suportam as operações CRUD:

id (Chave Primária)

titulo, autor, isbn

anoPublicacao

disponivel (boolean)

## Configuração e Execução

Pré-requisitos

Node.js (v18+) e npm.

Credenciais de conexão para o Neon (PostgreSQL).

1. Instalação

npm install


2. Variáveis de Ambiente

Crie o arquivo .env na raiz do projeto e insira as credenciais do seu banco de dados.

ATENÇÃO: Nunca publique este arquivo em seu repositório!

# .env (Exemplo com credenciais do Neon)
PORT=3000
DB_TYPE=postgres
DB_HOST=SEU_HOST_DO_NEON
DB_PORT=5432
DB_USERNAME=SEU_USUARIO
DB_PASSWORD=SUA_SENHA_AQUI
DB_DATABASE=SEU_NOME_DO_BANCO


3. Execução

O servidor é iniciado no modo de desenvolvimento e se conecta ao banco de dados:

npm run dev


Se a conexão for bem-sucedida, o backend estará rodando em http://localhost:3000.

## Endpoints da API (CRUD)

Todos os endpoints utilizam o prefixo base /api.

Criar (POST): /api/livros

Listar Todos (GET): /api/livros

Buscar por ID (GET): /api/livros/:id

Atualizar (PUT): /api/livros/:id

Excluir (DELETE): /api/livros/:id