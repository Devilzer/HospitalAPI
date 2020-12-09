const Patients = require("../models/patients");

module.exports.register=async(req,res)=>{
    try {
        const patient = new Patients;
        console.log(req.body);
        return res.status(200).json({
            message:"pat success"
        });
    } catch (error) {
        return res.status(400).json({
            message : `Error in creating patient ${error}`
        });
    }
}