const express = require("express");
const { signUp, checkEmailAvailability } = require("../controllers/signUpUser");
const signIn = require("../controllers/signInUser");
const {
  registerClient,
  checkClientEmailAvailability,
} = require("../controllers/registerClient");
const { showUser } = require("../controllers/showUser");
const { authenticate } = require("../middlewares/checkLoginAuth");

const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

routes.use(authenticate);

routes.get("/me", showUser);

routes.post("/validate-client-email", checkClientEmailAvailability);
routes.post("/clients", registerClient);

module.exports = routes;
