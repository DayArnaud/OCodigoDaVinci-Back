const updateChargeStatus = require("../../utils/dbOperations");

async function markAsPaid(req, res) {
  const { id } = req.params;
  await updateChargeStatus(id, "paga");
  res.json({ message: "Pagamento efetuado com sucesso!" });
}

module.exports = {
  markAsPaid,
};
