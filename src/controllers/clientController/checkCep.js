const axios = require("axios");

const HTTP_SUCCESS = 200;
const HTTP_SERVER_ERROR = 500;

async function fetchAddressByCep(req, res) {
  const { cep } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.status(HTTP_SUCCESS).json({
      cep: response.data.cep,
      address: response.data.logradouro,
      complement: response.data.complemento,
      neighborhood: response.data.bairro,
      city: response.data.localidade,
      state: response.data.uf,
    });
  } catch (error) {
    res.status(HTTP_SERVER_ERROR).json({ message: "Falha ao buscar CEP" });
  }
}

module.exports = {
  fetchAddressByCep,
};
