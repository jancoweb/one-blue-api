# **API TESTE OneBlue**



npm install para instalar pacotes utilizados para construção desta API:

- 'pg' - criação do Pool para conexão com o banco de dados;

- 'secure-password' - Responsável pela segurança da informação "senha" do usuário

- 'jsonwebtoken' - Responsável pela criação de um token para autenticação do usuário

- 'express' - Criação da API

## IMPORTANTE!

No arquivo "conexao.js" presente na pasta "src" será necessário editar as informações de usuário necessárias para acessar o banco de dados local:

```
const { Pool } = require('pg');

const pool = new Pool({
  user: "SEU USUÁRIO AQUI",
  host: "localhost",
  database: "oneblue",
  password: "SUA SENHA AQUI",
  port: 5432
});

const query = (text, param)=>{
  return pool.query(text, param);
}

module.exports = { query }
```

Após instalação de pacotes e edição do arquivo "conexao.js", execute o comando:

    npm run dev



**Agora a API já está funcionando!**



Funcionalidades: 



**Usuário**

- Cadastrar usuário

- Visualizar conta

- Excluir cadastro do usuário

- Editar cadastro do usuário

**Pensamentos**

- Cadastrar pensamentos

- Editar pensamentos

- Excluir pensamentos

- Visualizar pensamentos

- Curtir pensamentos



**Banco de dados**

Instruções para criação do banco de dados presentes no arquivo '/src/schema.sql' :

```
CREATE DATABASE oneblue

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE pensamentos (
  id SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL,
  conteudo TEXT NOT NULL,
  curtidas INT DEFAULT 0,
  data TIMESTAMPTZ,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
```

#### Rotas e Endpoints - Usuário

- Cadastro de usuário:
  
  Método **POST**
  
  ''**/cadastrar**'' - Recebe  dados do usuário a ser cadastrado pelo corpo da requisição.

- Login do usuário:
  
  Método **POST**
  
  "**/login**" - Recebe email e senha cadastrados pelo usuário fazendo validações. Para efetuar o login a API valida a senha informada no corpo da requisição da rota com a HASH criada pelo pacote "secure-password" que está guardada no banco de dados como a "senha" do usuário. Ao validar as informações, o pacote "jsonwebtoken" cria um elemento "token" que será usado para transmitir as informações do usuário para outras rotas.

- Autenticação:
  
  O arquivo "auth.js" é um middleware responsável pela criação do "token" no momento do **Login**. Este token é utilizado para fazer a autenticação do usuário para que possa acessar **todas** rotas exceto: "/cadastrar" e "/login".

- Visualizar perfil do usuário:
  
  Método **GET** 
  
  "**/perfil**" - Responde a requisição mostrando os dados do usuário recebidos pela requisição e suas publicações.

- Editar cadastro do usuário:
  
  Método **PUT**
  
  "**/perfil/editar**" - Recebe as informações do usuário através do "token" criado quando o usuário efetua o login, e permite alteração do cadastro no banco de dados. **A edição de todos os campos são obrigatórias**.

- Excluir cadastro do usuário:
  
  Método **DELETE**
  
  "**/perfil/excluir-conta**" - Recebe as informações do usuário através do "token" criado quando usuário efetua o login. Permite o usuário excluir seu cadastro do  banco de dados.

## Rotas e Endpoints - Publicações

- Publicar pensamento:
  
  Método **POST**
  
  "**/publicar**" - Recebe dados do usuário através do "token" e o conteúdo da publicação a ser criada no banco de dados através do corpo da requisição.

- Editar pensamento:
  
  Método **PUT** 
  
  "**/perfil/posts/editar/:id**" - Recebe os dados do usuário através do "token", permitindo edição do conteúdo da publicação selecionada através do seu "id" nos parâmetros da requisição.

- Listar pensamentos do usuário:
  
  Método **GET**
  
  "**/perfil/posts**" - Recebe dados do usuário através do "token", permitidindo a listagem de todas as publicações feitas por **este usuário**.

- Listar todos pensamentos cadastrados:
  
  Método **GET**
  
  "**/posts**" - Listagem de todas as publicações presentes no banco de dados, essa rota só é acessível para usuários logados e autenticados.

- Excluir pensamento:
  
  Método **DELETE**
  
  "**/perfil/posts/excluir/:id**" - Recebe os dados do usuário através do "token", permite excluir uma publicação específica de acordo com o "id" informado nos parâmetros da rota. **O usuário só consegue realizar essa ação se a publicação foi feita pelo mesmo**.

- Curtir publicação:
  
  Método **PATCH**
  
  "**/curtir/:id**"- Rota acessível somente para usuários logados e autenticados. Através do "id" da publicação fornecido nos parâmetros da rota, permite alterar o valor da coluna "curtidas" da publicação na tabela "Pensamentos" presente no banco de dados.
