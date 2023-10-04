const knex = require("../../connection");

const HTTP_NOT_FOUND = 404;
const HTTP_SUCCESS = 200;
const HTTP_SERVER_ERROR = 500;

const listClientCharges = async (req, res) => {
  const { client_id } = req.params;

  try {
    const charges = await knex("charges").where({ client_id }).select("*");

    if (!charges.length) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "Nenhuma cobrança encontrada para este cliente" });
    }

    return res.status(HTTP_SUCCESS).json(charges);
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_SERVER_ERROR)
      .json({ message: "Erro interno do servidor" });
  }
};

module.exports = listClientCharges;
