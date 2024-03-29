const knex = require("../../connection");
const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function listCharges(req, res) {
  try {
    const charges = await knex("charges")
      .select("charges.*", "clients.name as client_name")
      .join("clients", "charges.client_id", "clients.id");

    return res.status(HTTP_SUCCESS).json(charges);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json(error.message);
  }
}

module.exports = {
  listCharges,
};
