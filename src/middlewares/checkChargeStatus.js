const { updateChargeStatus, getChargeById } = require("../utils/dbOperations");

const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

async function checkChargeStatus(req, res, next) {
  const { id } = req.params;

  try {
    const charge = await getChargeById(id);

    if (!charge) {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ error: "Pagamento não encontrado" });
    }

    const { dueDate, status } = charge;

    if (status === "Paga") {
      return next();
    }

    const today = new Date();
    const expiryDate = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    if (today > expiryDate) {
      const updateStatusSuccess = await updateChargeStatus(id, "vencida");

      if (!updateStatusSuccess) {
        throw new Error("Falha ao atualizar o status da cobrança");
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(HTTP_SERVER_ERROR).json({ error: error.message });
  }
}

module.exports = { checkChargeStatus };
