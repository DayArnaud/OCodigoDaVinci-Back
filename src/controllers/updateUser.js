const bcrypt = require("bcrypt");
const dbOperations = require("../utils/dbOperations");
const {
  validEmail,
  validateName,
  validatePassword,
  validateCpf,
  validatePhone,
} = require("../schemasYup/userClientValidations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

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
      await validateName.validate({ name });
    }

    if (email && email !== existingUser.email) {
      await validEmail.validate({ email });
      await dbOperations.isUserEmailValid(email, "users");
    }

    if (password) {
      await validatePassword.validate({ password });
      password = await bcrypt.hash(password, 10);
    }

    if (cpf && cpf !== existingUser.cpf) {
      await validateCpf.validate({ cpf });
      await dbOperations.isCpfValid(cpf, "users");
    }

    if (phone && phone !== existingUser.phone) {
      await validatePhone.validate({ phone });
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
