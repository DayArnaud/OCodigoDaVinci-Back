const axios = require("axios");
const dbOperations = require("../utils/dbOperations");
const validEmail = require("../schemas/validEmail");
const validation = require("../utils/validation");

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

async function checkClientEmailAvailability(req, res) {
  const { email } = req.body;

  try {
    await validEmail.validate(req.body);
    await dbOperations.isClientEmailValid(email, "clients");
    return res.status(HTTP_SUCCESS).json({ message: "Valid email" });
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

async function fetchAddressByCep(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch CEP");
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
    await validation.validateName(name);
    await dbOperations.isClientEmailValid(email, "clients");
    await validEmail.validate(req.body);
    await dbOperations.isCpfValid(cpf, "clients");
    await validation.validateCpf(cpf);
    await validation.validatePhone(phone);

    if (cep) {
      await validation.validatePostal(cep);
      const cepData = await fetchAddressByCep(cep);
      address = cepData.logradouro;
      complement = cepData.complemento;
      neighborhood = cepData.bairro;
      city = cepData.localidade;
      state = cepData.uf;
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
  checkClientEmailAvailability,
  registerClient,
};
