const express = require("express");
const router = express();
const patientController = require("../../../controllers/patientController");
const jwtController = require("../../../controllers/jwt");

router.post("/register",jwtController.authenticate,patientController.register);
module.exports = router;