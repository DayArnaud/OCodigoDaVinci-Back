const { isValidClientId } = require("../utils/dbOperations");

const HTTP_BAD_REQUEST = 400;

async function checkValidClientId(req, res, next) {
  const { clientId } = req.params;

  if (!clientId) {
    return res
      .status(HTTP_BAD_REQUEST)
      .json({ error: "ID do cliente não fornecido" });
  }
  const isValid = await isValidClientId(clientId);

  if (!isValid) {
    return res
      .status(HTTP_BAD_REQUEST)
      .json({ error: "ID do cliente é inválido" });
  }

  next();
}

module.exports = {
  checkValidClientId,
};
