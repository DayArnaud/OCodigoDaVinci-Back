DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  cpf CHAR(11),
  phone VARCHAR(16) 
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf CHAR(11) NOT NULL UNIQUE,
  phone VARCHAR(16) NOT NULL,
  cep CHAR(8),
  address TEXT,
  complement TEXT,
  neighborhood TEXT,
  city TEXT,
  state CHAR(2)
);