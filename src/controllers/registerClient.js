const dbOperations = require("../utils/dbOperations");
const validEmail = require("../schemas/validEmail");
const validation = require("../utils/validation");

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

async function checkEmailAvailability(req, res) {
  const { email } = req.body;

  try {
    await validEmail.validate(req.body);
    await dbOperations.isClientEmailValid(email, "clients");
    return res.status(HTTP_SUCCESS).json({ message: "Valid email" });
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

async function registerClient(req, res) {
  const {
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
    await validation.validateName(name);
    await dbOperations.isClientEmailValid(email, "clients");
    await validEmail.validate(req.body);
    await dbOperations.isCpfValid(cpf, "clients");
    await validation.validateCpf(cpf);
    await validation.validatePhone(phone);

    if (cep) {
      await validation.validatePostal(cep);
    }

    if (state) {
      await validation.validateState(state);
    }

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
  checkEmailAvailability,
  registerClient,
};
