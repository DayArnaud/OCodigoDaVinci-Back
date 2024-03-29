const knex = require("../../connection");
const yup = require("yup");
const { validateCharge } = require("../../schemasYup/chargeValidations");
const { markAsPaid, formatDueDate } = require("../../utils/dbOperations");

const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_SERVER_ERROR = 500;

const registerCharge = async (req, res) => {
  const { description, value, due_date, status } = req.body;
  const { client_id } = req.params;

  try {
    await validateCharge.validate({
      value,
      due_date,
      description,
    });

    const formattedDueDate = formatDueDate(due_date);

    const newCharge = {
      client_id,
      description,
      value,
      due_date: formattedDueDate,
      status,
    };

    const [insertedCharge] = await knex("charges")
      .insert(newCharge)
      .returning("*");

    if (status === "Paga") {
      await markAsPaid(insertedCharge.id);
    }

    return res.status(HTTP_CREATED).json(insertedCharge);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
    }
    return res
      .status(HTTP_SERVER_ERROR)
      .json({ message: "Erro interno do servidor" });
  }
};

module.exports = registerCharge;
