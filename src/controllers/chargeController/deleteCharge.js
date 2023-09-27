const knex = require("../../connection");
const yup = require("yup");

const { validateDeleteCharge } = require("../../schemasYup/chargeValidations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

const deleteCharge = async (req, res) => {
  const { id } = req.params;

  try {
    const charge = await knex("charges").where({ id }).first();

    if (!charge) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "Cobrança não encontrada" });
    }

    const [year, month, day] = charge.due_date
      .toISOString()
      .split("T")[0]
      .split("-");
    const formattedDate = `${day}/${month}/${year}`;

    await validateDeleteCharge.validate({
      id,
      status: charge.status,
      due_date: formattedDate,
    });

    await knex("charges").where({ id }).del();

    return res
      .status(HTTP_SUCCESS)
      .json({ message: "Cobrança excluída com sucesso" });
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
  deleteCharge,
};
