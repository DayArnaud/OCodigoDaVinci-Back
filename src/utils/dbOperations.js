const knex = require("../connection");

const isUserEmailValid = async (email, table = "users") => {
  const user = await knex(table).where({ email }).first();
  if (user) {
    throw new Error("Email já registrado");
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
    throw new Error("Usuário não registrado");
  }

  return user;
};

const verifyLoginUser = async (emailUser) => {
  const user = await knex("users").where({ email: emailUser }).first();

  if (!user) {
    throw new Error(
      "O email que você digitou não está registrado. Por favor, verifique e tente novamente"
    );
  }

  return user;
};

const isCpfValid = async (cpf, table = "clients") => {
  const existingUser = await knex(table).where({ cpf }).first();
  if (existingUser) {
    throw new Error("CPF já registrado");
  }
};

const deleteUserById = async (userId) => {
  try {
    const rowsDeleted = await knex("users").where({ id: userId }).del();

    if (rowsDeleted > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(
      "Um erro ocorreu enquanto o usuário estava sendo deletado: " +
        error.message
    );
  }
};

const getAllUsers = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    throw new Error("Não foi possível listar os usuários");
  }
};

const isClientEmailValid = async (email, table = "clients") => {
  const client = await knex(table).where({ email }).first();
  if (client) {
    throw new Error("Email já registrado");
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

async function verifyUserById(userId) {
  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    throw new Error("Usuário não localizado");
  }
  return user;
}

async function updatingUser(name, email, password, cpf, phone, userId) {
  const schema = password
    ? {
        name,
        email,
        password,
        cpf,
        phone,
      }
    : {
        name,
        email,
        cpf,
        phone,
      };

  const updatedUser = await knex("users")
    .update(schema)
    .where({ id: userId })
    .returning("*");

  if (!updatedUser) {
    throw new Error("Usuário não foi atualizado");
  }

  return updatedUser[0];
}

async function isValidClientId(id) {
  const client = await knex("clients").where({ id: id });
  return client.length > 0;
}

async function getChargeById(id) {
  try {
    const [result] = await knex("charges").select("*").where({ id });

    if (!result) {
      throw new Error("Pagamento não encontrado");
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateChargeStatus(id, status) {
  try {
    await knex("charges").update({ status }).where({ id });

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o status da cobrança");
  }
}

module.exports = {
  isUserEmailValid,
  registerNewUser,
  verifyLoginUser,
  isCpfValid,
  deleteUserById,
  getAllUsers,
  isClientEmailValid,
  registerNewClient,
  verifyUserById,
  updatingUser,
  isValidClientId,
  getChargeById,
  updateChargeStatus,
};
