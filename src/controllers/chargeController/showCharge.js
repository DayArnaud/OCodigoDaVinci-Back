const knex = require("../../connection");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function showCharge(req, res) { 
  const chargeId = req.params.id;
  try {
    const charge = await knex("charges").where("id", chargeId).first();

    if (!charge) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ message: "Cobrança não encontrado" });
    }

    return res.status(HTTP_SUCCESS).json(charge);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ mensagem: error.message });
  }
}

module.exports = {
  showCharge,
};
