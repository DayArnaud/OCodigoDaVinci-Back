const { isValidClientId } = require("../utils/dbOperations");

const HTTP_BAD_REQUEST = 400;

async function checkValidClientId(req, res, next) {
  const { client_id } = req.params;

  if (!client_id) {
    return res
      .status(HTTP_BAD_REQUEST)
      .json({ error: "ID do cliente não fornecido" });
  }
  const isValid = await isValidClientId(client_id);

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
