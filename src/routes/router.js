const express = require("express");
const routes = express();

const {
  signUp,
  checkEmailAvailability,
} = require("../controllers/userController/signUpUser");
const signIn = require("../controllers/userController/signInUser");

const { showUser } = require("../controllers/userController/showUser");
const { updateUser } = require("../controllers/userController/updateUser");
const { deleteUser } = require("../controllers/userController/deleteUser");
const { listUsers } = require("../controllers/userController/listUsers");

const {
  registerClient,
  checkClientEmailAvailability,
} = require("../controllers/clientController/registerClient");
const {
  fetchAddressByCep,
} = require("../controllers/clientController/checkCep");
const {
  listAllClients,
} = require("../controllers/clientController/listAllClients");

const listClientCharges = require("../controllers/chargeController/listClientCharges");
const registerCharge = require("../controllers/chargeController/registerCharge");
const { listCharges } = require("../controllers/chargeController/listCharges");
const {
  updateCharge,
} = require("../controllers/chargeController/updateCharge");

const { authenticate } = require("../middlewares/checkLoginAuth");
const { checkValidClientId } = require("../middlewares/checkValidClientId");
// const { checkChargeStatus } = require("../middlewares/checkChargeStatus");

routes.post("/validate-email", checkEmailAvailability);
routes.post("/signup", signUp);
routes.post("/login", signIn);

routes.use(authenticate);

routes.get("/me", showUser);
routes.patch("/update-me", updateUser);
routes.get("/list-users", listUsers);
routes.delete("/me", deleteUser);

routes.post("/validate-client-email", checkClientEmailAvailability);
routes.get("/cep/:cep", fetchAddressByCep);
routes.post("/clients", registerClient);
routes.get("/clients", listAllClients);

routes.get("/charges", listCharges);

routes.post("/clients/:client_id/charges", checkValidClientId, registerCharge);
routes.patch(
  "/clients/:client_id/charges/:id",
  checkValidClientId,
  updateCharge
);
routes.get(
  "/clients/:client_id/charges",
  checkValidClientId,
  listClientCharges
);

// routes.use(checkChargeStatus);

module.exports = routes;
