const knex = require("../../connection");
const yup = require("yup");
const { validateCharge } = require("../../schemasYup/chargeValidations");
const { markAsPaid } = require("../../utils/dbOperations");

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

const updateCharge = async (req, res) => {
  const { id } = req.params;
  const { client_id, description, value, due_date, status } = req.body;

  try {
    await validateCharge.validate({
      value,
      due_date,
      description,
    });

    await knex("charges").where({ id }).update({
      client_id,
      description,
      value,
      due_date,
      status,
    });

    if (status === "paga") {
      await markAsPaid(id);
    }

    const updatedCharge = await knex("charges").where({ id }).first();

    if (!updatedCharge) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "Cobrança não encontrada" });
    }

    return res.status(HTTP_OK).json(updatedCharge);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(HTTP_SERVER_ERROR)
      .json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  updateCharge,
};
