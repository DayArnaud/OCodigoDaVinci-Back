const dbOperations = require("../../utils/dbOperations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function listUsers(req, res) {
  try {
    const users = await dbOperations.getAllUsers();
    return res.status(HTTP_SUCCESS).json(users);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  listUsers,
};
