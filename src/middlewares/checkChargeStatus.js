const { updateChargeStatus, getAllCharges } = require("../utils/dbOperations");

const HTTP_SERVER_ERROR = 500;

async function checkChargeStatus(req, res, next) {
  try {
    const charges = await getAllCharges();

    for (const charge of charges) {
      await processCharge(charge);
    }

    next();
  } catch (error) {
    return res.status(HTTP_SERVER_ERROR).json({ error: error.message });
  }
}

async function processCharge(charge) {
  const { dueDate, status, id } = charge;
  if (status === "Paga") {
    return;
  }

  const today = new Date();
  const expiryDate = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  expiryDate.setHours(0, 0, 0, 0);

  if (today > expiryDate) {
    const updateStatusSuccess = await updateChargeStatus(id, "Vencida");
    if (!updateStatusSuccess) {
      throw new Error("Falha ao atualizar o status da cobrança");
    }
  }
}

module.exports = { checkChargeStatus };
