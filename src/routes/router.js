const express = require("express");
const { signUp, checkEmailAvailability } = require("../controllers/signUpUser");
const signIn = require("../controllers/signInUser");
const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

module.exports = routes;
