const knex = require("../connection");

const isUserEmailValid = async (email, table = "users") => {
  const user = await knex(table).where({ email }).first();
  if (user) {
    throw new Error("Email already registered");
  }
};

const registerNewUser = async (name, email, password) => {
  const user = await knex("users")
    .insert({
      name,
      email,
      password,
      cpf: "",
      phone: "",
    })
    .returning("*");

  if (!user) {
    throw new Error("The user was not registered.");
  }

  return user;
};

const verifyLoginUser = async (emailUser) => {
  const user = await knex("users").where({ email: emailUser }).first();

  if (!user) {
    throw new Error(
      "The email you entered isn't registered. Please check and try again."
    );
  }

  return user;
};

const isCpfValid = async (cpf, table = "clients") => {
  const existingUser = await knex(table).where({ cpf }).first();
  if (existingUser) {
    throw new Error("CPF already registered");
  }
};

const isClientEmailValid = async (email, table = "clients") => {
  const client = await knex(table).where({ email }).first();
  if (client) {
    throw new Error("Email already registered");
  }
};

const registerNewClient = async (
  name,
  email,
  cpf,
  phone,
  cep,
  address,
  complement,
  neighborhood,
  city,
  state
) => {
  const client = await knex("clients")
    .insert({
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      complement,
      neighborhood,
      city,
      state: state.toUpperCase(),
    })
    .returning("*");

  if (!client.length) {
    throw new Error("Cliente não cadastrado.");
  }

  return client[0];
};

module.exports = {
  isUserEmailValid,
  registerNewUser,
  verifyLoginUser,
  isCpfValid,
  isClientEmailValid,
  registerNewClient,
};
