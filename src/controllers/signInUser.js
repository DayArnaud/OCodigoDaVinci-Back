const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtToken = require("../token/jwtToken");
const validSignIn = require("../schemas/validSignIn");
const dbOperations = require("../utils/dbOperations");

const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    await validSignIn.validate(req.body);
    const user = await dbOperations.verifyLoginUser(email);
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, jwtToken, { expiresIn: "8h" });
    const { password: _, ...userDetails } = user;
    userDetails.token = token;

    return res.status(HTTP_SUCCESS).json(userDetails);
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json({ message: error.message });
  }
}

module.exports = signIn;
