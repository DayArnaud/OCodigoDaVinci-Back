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

  if (!name || !email) {
    return res
      .status(HTTP_BAD_REQUEST)
      .json({ message: "Name and email are mandatory for the update." });
  }

  try {
    const existingUser = await dbOperations.verifyUserById(id);

    await validateName.validate({ name });

    await validEmail.validate({ email });

    const emailUser = await dbOperations.isUserEmailValid(email, "users");
    if (emailUser && emailUser.id !== id) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ message: "This email is already in use." });
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
