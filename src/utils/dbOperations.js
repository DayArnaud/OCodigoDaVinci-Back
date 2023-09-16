const knex = require("../connection");

async function isEmailValid(email, db) {
  const user = await knex(db).where({ email }).first();
  if (user) {
    throw new Error("Email already registered");
  }
}

async function registerNewUser(name, email, password) {
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
}

module.exports = {
  isEmailValid,
  registerNewUser,
};
