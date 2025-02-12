# Sobre esse projeto
Repositório do Backend Projeto Vitae - Sistemas de Vagas

## Tecnologias
Esse projeto foi desenvolvido com Node e Express e o banco de dados escolhido foi o PostgreSQL.

### Estrutura do Projeto
```
-- database
|
-- server
|
------ data
|
------ infra
|
------ middleware
|
------ route
|
------ service
|
------ utils
|
------ server.js
|
-- .gitignore
|
-- Profile
|
-- README.md
|
-- package-lock.json
|
-- package.json
```

- ./server/server.js
O arquivo server.js contém o servidor do projeto, criado com Node e Express. Junto ao arquivo estão as regras CORS, as rotas da API e algumas codificações de mensagens para os HTTP Error Codes.

- ./database
Dentro da pasta database, se encontram os scripts (SQL) utilizados no banco de dados. Para a criação das tabelas, alguns inserts, resets das tabelas e as queries utilizadas.

- ./server/data
Dentro da pasta data estão os códigos utilizados para a comunicação de cada rota da API com o banco de dados.

- ./server/infra
Código que estabiliza a conexão com o banco de dados.

- ./server/middleware
Código que realiza a interceptação da requisição para realizar a autenticação do usuário antes de prosseguir.

- ./server/routes
Cada arquivo contém os códigos para cada rota da aplicação, redirecionando para os serviços.

- ./server/service
Os serviços fazem o intermédio entre a chamada da rota e a chamada aos dados. Nessa camada os dados são tratados antes de serem enviados de volta à chamada da rota.

- ./server/utils
Contém dois arquivos, um deles contém os ENUMs utilizados nos códigos. E o outro é utils.js que contém diversas funções auxiliares utilizadas em toda a aplicação.