const Doctors = require("../models/doctors");
const jwt = require("jsonwebtoken");
module.exports.register =async (req,res)=>{
    try {
        // console.log(req.body);
        const doctor = new Doctors;
        doctor.username = req.body.username;
        doctor.password = req.body.password;
        await doctor.save();
        return res.status(200).json({
            message : "user created!"
        });
    } catch (error) {
        return res.status(400).json({
            message : error
        });
        
    }  

};