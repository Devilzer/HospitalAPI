const express = require("express");
const router = express.Router();

router.use("/doctors",require("./doctor"));
module.exports = router;