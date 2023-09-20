const express = require("express");
const {
  signUp,
  checkEmailAvailability,
} = require("../controllers/userController/signUpUser");
const signIn = require("../controllers/userController/signInUser");
const {
  registerClient,
  checkClientEmailAvailability,
} = require("../controllers/clientController/registerClient");
const { showUser } = require("../controllers/userController/showUser");
const { authenticate } = require("../middlewares/checkLoginAuth");
const { updateUser } = require("../controllers/userController/updateUser");
const { deleteUser } = require("../controllers/userController/deleteUser");
const { listUsers } = require("../controllers/userController/listUsers");

const routes = express();

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

routes.use(authenticate);

routes.get("/me", showUser);
routes.patch("/update-me", updateUser);
routes.get("/list-users", listUsers);
routes.delete("/me", deleteUser);

routes.post("/validate-client-email", checkClientEmailAvailability);
routes.post("/clients", registerClient);

module.exports = routes;
