const express = require("express");
const router = express();
const doctorController = require("../../../controllers/doctorController");

router.post("/register",doctorController.register);
router.post("/login",doctorController.login);


module.exports = router;