require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.authenticate = (req,res,next)=>{
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(token==null){
            return res.status(401).json({
                message: "Invalid request",
              });
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,user)=>{
            if(err){
                return res.status(401).json({
                    message: "Invalid request",
                  });
            }
            next();
        });
    } catch (error) {
        return res.status(400).json({
            message : `error in authenticating token ${error}`
        });
    }
};