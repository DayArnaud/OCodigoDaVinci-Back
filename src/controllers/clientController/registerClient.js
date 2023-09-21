const dbOperations = require("../../utils/dbOperations");

const {
  validEmail,
  validateName,
  validateCpf,
  validatePhone,
  validateState,
} = require("../../schemasYup/userClientValidations");

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

async function checkClientEmailAvailability(req, res) {
  const { email } = req.body;

  try {
    await validEmail.validate({ email });
    await dbOperations.isClientEmailValid(email, "clients");
    return res
      .status(HTTP_SUCCESS)
      .json({ message: "Email disponível para uso" });
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

async function registerClient(req, res) {
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

  try {
    await validateName.validate({ name });
    await dbOperations.isClientEmailValid(email, "clients");
    await validEmail.validate({ email });
    await dbOperations.isCpfValid(cpf, "clients");
    await validateCpf.validate({ cpf });
    await validatePhone.validate({ phone });
    await validateState.validate({ state });

    const client = await dbOperations.registerNewClient(
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
    );

    return res.status(HTTP_CREATED).json(client);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  checkClientEmailAvailability,
  registerClient,
};
