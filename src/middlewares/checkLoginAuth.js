const jwt = require("jsonwebtoken");
const jwtToken = require("../token/jwtToken");
const knex = require("../connection");

const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;

async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();
    const { id } = jwt.verify(token, jwtToken);

    const foundUser = await knex("users").where({ id }).first();

    if (!foundUser) {
      return res.status(HTTP_NOT_FOUND).json("Usuário não encontrado");
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    req.user = userWithoutPassword;

    next();
  } catch (error) {
    return res.status(HTTP_BAD_REQUEST).json(error.message);
  }
}

module.exports = { authenticate };
