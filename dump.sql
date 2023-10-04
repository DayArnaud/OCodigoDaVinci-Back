DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS charges;

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
  state CHAR(2),
  status TEXT DEFAULT 'Em dia'
);

CREATE TABLE charges (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pendente',
  value NUMERIC(10, 2) NOT NULL,
  due_date DATE NOT NULL
);
