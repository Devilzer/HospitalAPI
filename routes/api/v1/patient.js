const express = require("express");
const router = express();
const patientController = require("../../../controllers/patientController");
const jwtController = require("../../../controllers/jwt");

router.post("/register",jwtController.authenticate,patientController.register);
router.post("/:phone/create_report",jwtController.authenticate,patientController.createReport);
router.get("/:phone/all_reports",jwtController.authenticate,patientController.allreports);
module.exports = router;