const express = require("express");
const { signUp, checkEmailAvailability } = require("../controllers/signUpUser");
const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);

module.exports = routes;
