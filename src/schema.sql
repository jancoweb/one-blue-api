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