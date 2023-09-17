const bcrypt = require("bcrypt");
const dbOperations = require("../utils/dbOperations");
const validation = require("../utils/validation");
const validEmail = require("../schemas/validEmail");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

async function updateUser(req, res) {
  let { name, email, password, cpf, phone } = req.body;
  const { id } = req.user;

  if (!name && !email && !password && !cpf && !phone) {
    return res
      .status(HTTP_BAD_REQUEST)
      .json({ message: "At least one field must be provided for the update." });
  }

  try {
    const existingUser = await dbOperations.verifyUserById(id);

    if (name && name !== existingUser.name) {
      await validation.validateName(name);
    }

    if (email && email !== existingUser.email) {
      await validEmail.validate(req.body);
      await dbOperations.isUserEmailValid(email, "users");
    }

    if (password) {
      await validation.validatePassword(password);
      password = await bcrypt.hash(password, 10);
    }

    if (cpf && cpf !== existingUser.cpf) {
      await dbOperations.isCpfValid(cpf, "users");
      await validation.validateCpf(cpf);
    }

    if (phone && phone !== existingUser.phone) {
      await validation.validatePhone(phone);
    }

    await dbOperations.updatingUser(name, email, password, cpf, phone, id);

    return res.status(HTTP_SUCCESS).json("User has been successfully updated.");
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  updateUser,
};
