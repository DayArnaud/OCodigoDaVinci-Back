const express = require("express");
const { signUp, checkEmailAvailability } = require("../controllers/signUpUser");
const signIn = require("../controllers/signInUser");
const {
  registerClient,
  checkClientEmailAvailability,
} = require("../controllers/registerClient");
const { showUser } = require("../controllers/showUser");
const { authenticate } = require("../middlewares/checkLoginAuth");
const { updateUser } = require("../controllers/updateUser");
const { deleteUser } = require("../controllers/deleteUser");

const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

routes.use(authenticate);

routes.get("/me", showUser);
routes.patch("/update-me", updateUser);
routes.delete("/me", deleteUser);

routes.post("/validate-client-email", checkClientEmailAvailability);
routes.post("/clients", registerClient);

module.exports = routes;
