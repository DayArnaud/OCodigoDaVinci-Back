const dbOperations = require("../../utils/dbOperations");
const {
  validEmail,
  validateCpf,
  validatePhone,
  validateState,
  validateName,
} = require("../../schemasYup/userClientValidations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function updateClient(req, res) {
  const { id } = req.params;
  let {
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
  } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'nome' para seguir com a atualização",
    });
  }

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'email' para seguir com a atualização",
    });
  }

  if (!cpf) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'cpf' para seguir com a atualização",
    });
  }

  if (!phone) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'telefone' para seguir com a atualização",
    });
  }
  try {
    const existingClient = await dbOperations.verifyClientById(id);

    if (name && name !== existingClient.name) {
      await validateName.validate({ name });
    }

    if (email && email !== existingClient.email) {
      await validEmail.validate({ email });
      await dbOperations.isClientEmailValid(email, "clients", id);
    }

    if (cpf && cpf !== existingClient.cpf) {
      await validateCpf.validate({ cpf });
      await dbOperations.isClientCpfValid(cpf, "clients", id);
    }

    if (phone && phone !== existingClient.phone) {
      await validatePhone.validate({ phone });
    }

    await validateState.validate({ state });

    await dbOperations.updatingClient(
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
      id
    );

    return res
      .status(HTTP_SUCCESS)
      .json({ message: "Cliente foi atualizado com sucesso!" });
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({
      message: error.message,
      stack: error.stack, // Enviando o stack trace
    });
  }
}

module.exports = {
  updateClient,
};
