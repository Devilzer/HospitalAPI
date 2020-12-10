const Doctors = require("../models/doctors");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//doctor sign up meathod
module.exports.register =async (req,res)=>{
    try {
        // console.log(req.body);
        const doctor = new Doctors;
        doctor.username = req.body.username;
        doctor.password = req.body.password;
        const tempdoc =await Doctors.findOne({username:doctor.username,password:doctor.password});
        if(tempdoc){
            return res.status(409).json({
                message : "user already exists please login."
            });
        }else{
            await doctor.save();
        return res.status(200).json({
            message : "user created!"
        });
        }  
    } catch (error) {
        return res.status(400).json({
            message : `Error in creating user ${error}`
        });   
    }  
};

//doctor sign in meathod using jwt
module.exports.login = async(req,res)=>{
    try {
        const doctor  = await Doctors.findOne({username:req.body.username,password:req.body.password});
        if(doctor){
            console.log(doctor);
            const payload = {
                username : doctor.username,
                password : doctor.password
            };
            const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECERT,{
                expiresIn : "1d"
            });
           
            return res.status(200).json({
                message:"login success!!",
                AccessToken :accessToken
            });
        }
        else{
            return res.status(401).json({
                message:"Invalid username or Password"
            });
        }
    } catch (error) {
        return res.status(400).json({
            message : error
        });
    }
};

