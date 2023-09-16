const bcrypt = require("bcrypt");
const dbOperations = require("../utils/dbOperations");
const validSignUp = require("../schemas/validSignUp");
const validEmail = require("../schemas/validEmail");

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;

async function checkEmailAvailability(req, res) {
  const { email } = req.body;

  try {
    await validEmail.validate(req.body);
    await dbOperations.isEmailValid(email, "users");
    return res.status(HTTP_SUCCESS).json({ message: "Valid email" });
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    await validSignUp.validate(req.body);
    await dbOperations.isEmailValid(email, "users");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await dbOperations.registerNewUser(
      name,
      email,
      encryptedPassword
    );
    const { password: _, ...sendUser } = user[0];

    return res.status(HTTP_CREATED).json(sendUser);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = {
  signUp,
  checkEmailAvailability,
};
