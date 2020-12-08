const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
return res.json({
    message:"api home"
});
});
module.exports = router;