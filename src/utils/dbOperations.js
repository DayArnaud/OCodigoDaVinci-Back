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

async function verifyLoginUser(emailUser) {
  const user = await knex("users").where({ email: emailUser }).first().debug();

  if (!user) {
    throw new Error(
      "The email you entered isn't registered. Please check and try again."
    );
  }

  return user;
}

module.exports = {
  isEmailValid,
  registerNewUser,
  verifyLoginUser,
};
