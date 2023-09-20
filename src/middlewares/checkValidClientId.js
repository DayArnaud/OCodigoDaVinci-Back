const { isValidClientId } = require("../utils/dbOperations");

async function checkValidClientId(req, res, next) {
  const { id } = req.params;
  const isValid = await isValidClientId(id);

  if (!isValid) {
    return res.status(400).json({ error: "Invalid client ID" });
  }

  next();
}

module.exports = checkValidClientId;
