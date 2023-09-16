const express = require("express");
const { signUp, checkEmailAvailability } = require("../controllers/signUpUser");
const signIn = require("../controllers/signInUser");
const { regiterClient } = require("../controllers/registerClient");
const { showUser } = require("../controllers/showUser");
const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

routes.get('/users', showUser);

routes.post('/clients', regiterClient);

module.exports = routes;
