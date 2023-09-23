const bcrypt = require("bcrypt");
const dbOperations = require("../../utils/dbOperations");
const {
  validEmail,
  validateName,
  validatePassword,
  validateCpf,
  validatePhone,
} = require("../../schemasYup/userClientValidations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function updateUser(req, res) {
  const { id } = req.user;
  let { name, email, password, cpf, phone } = req.body;

  if (!name) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'nome' para seguir com a atualização",
    });
  }

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({
      message:
        "É obrigatório preencher o campo 'email' para seguir com a atualização",
    });
  }

  try {
    const existingUser = await dbOperations.verifyUserById(id);
    await validateName.validate({ name });

    if (email !== existingUser.email) {
      await validEmail.validate({ email });
      await dbOperations.isUserEmailValid(email, "users");
    }

    if (password) {
      await validatePassword.validate({ password });
      password = await bcrypt.hash(password, 10);
    }

    if (cpf && cpf !== existingUser.cpf) {
      await validateCpf.validate({ cpf });
      await dbOperations.isUserCpfValid(cpf, "users");
    }

    if (phone && phone !== existingUser.phone) {
      await validatePhone.validate({ phone });
    }

    await dbOperations.updatingUser(name, email, password, cpf, phone, id);

    return res.status(HTTP_SUCCESS).json("Usuário foi atualizado com sucesso");
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  updateUser,
};
