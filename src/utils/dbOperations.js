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

// const isUserCpfValid = async (cpf, table = "users") => {
//   const existingUser = await knex(table).where({ cpf }).first();
//   if (existingUser) {
//     throw new Error("CPF já registrado");
//   }
// };

const isUserCpfValid = async (cpf, table = "users", excludeId = null) => {
  const query = knex(table).where({ cpf });

  if (excludeId) {
    query.whereNot({ id: excludeId });
  }

  const existingUser = await query.first();
  if (existingUser) {
    throw new Error("CPF já registrado para outro usuário");
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

const verifyUserById = async (userId) => {
  const user = await knex("users").where({ id: userId }).first();
  if (!user) {
    throw new Error("Usuário não localizado");
  }
  return user;
};

const updatingUser = async (name, email, password, cpf, phone, userId) => {
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
};

// const isClientEmailValid = async (email, table = "clients") => {
//   const client = await knex(table).where({ email }).first();
//   if (client) {
//     throw new Error("Email já registrado");
//   }
// };

const isClientEmailValid = async (
  email,
  table = "clients",
  excludeId = null
) => {
  const query = knex(table).where({ email });

  if (excludeId) {
    query.whereNot({ id: excludeId });
  }

  const client = await query.first();
  if (client) {
    throw new Error("Email já registrado");
  }
};

const isClientCpfValid = async (cpf, table = "clients", excludeId = null) => {
  const query = knex(table).where({ cpf });

  if (excludeId) {
    query.whereNot({ id: excludeId });
  }

  const existingClient = await query.first();
  if (existingClient) {
    throw new Error("CPF já registrado para outro cliente");
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

const isValidClientId = async (id) => {
  const client = await knex("clients").where({ id: id });
  return client.length > 0;
};

const verifyClientById = async (clientId) => {
  const client = await knex("clients").where({ id: clientId }).first();
  if (!client) {
    throw new Error("Cliente não localizado");
  }
  return client;
};

// const updateClient = async (id, clientData) => {
//   try {
//     await knex("clients").where({ id }).update(clientData);
//   } catch (error) {
//     throw new Error("Falha ao atualizar o cliente");
//   }
// };

const updatingClient = async (
  name,
  email,
  cpf,
  phone,
  cep,
  address,
  complement,
  neighborhood,
  city,
  state,
  clientId
) => {
  const schema = {
    name,
    email,
    cpf,
    phone,
    cep,
    address,
    complement,
    neighborhood,
    city,
    state,
  };

  const updatedClient = await knex("clients")
    .update(schema)
    .where({ id: clientId })
    .returning("*");

  if (!updatedClient) {
    throw new Error("Falha ao atualizar o cliente");
  }

  return updatedClient[0];
};

const getChargeById = async (id) => {
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
};

const getAllCharges = async () => {
  try {
    const charges = await knex("charges").select("*");
    return charges;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateChargeStatus = async (id, status) => {
  try {
    await knex("charges").update({ status }).where({ id });
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Falha ao atualizar o status da cobrança");
  }
};

const markAsPaid = async (id) => {
  await updateChargeStatus(id, "Paga");
};

const formatDueDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

module.exports = {
  isUserEmailValid,
  registerNewUser,
  verifyLoginUser,
  isUserCpfValid,
  deleteUserById,
  getAllUsers,
  isClientEmailValid,
  isClientCpfValid,
  registerNewClient,
  verifyUserById,
  updatingUser,
  isValidClientId,
  verifyClientById,
  getChargeById,
  getAllCharges,
  updateChargeStatus,
  markAsPaid,
  formatDueDate,
  updatingClient,
};
