const express = require("express");
const router = express();
const jwtController = require("../../../controllers/jwt");
const reportController = require("../../../controllers/reportController");

router.get("/:status",jwtController.authenticate,reportController.status);

module.exports = router;