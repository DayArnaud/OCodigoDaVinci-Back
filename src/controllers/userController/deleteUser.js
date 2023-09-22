const dbOperations = require("../../utils/dbOperations");

const HTTP_SUCCESS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;

async function deleteUser(req, res) {
  const { id } = req.user;

  try {
    const result = await dbOperations.deleteUserById(id);

    if (result) {
      return res
        .status(HTTP_SUCCESS)
        .json({ message: "Usuário deletado com sucesso" });
    } else {
      return res
        .status(HTTP_NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  deleteUser,
};
