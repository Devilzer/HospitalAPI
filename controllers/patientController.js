const Patients = require("../models/patients");
const Reports = require("../models/reports");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//method for registering patients to database
module.exports.register=async(req,res)=>{
    try { 
        const oldPatient =await Patients.findOne({name : req.body.name,phone:req.body.phone});
        if(oldPatient){
            return res.status(409).json({
                message : "Patient already exits with same details"
            });
        }
        const patient = new Patients;
        patient.name = req.body.name;
        patient.phone = req.body.phone;
        await patient.save();
        return res.status(200).json({
            message:"Success patient registered!",
            details :patient
        });
    } catch (error) {
        return res.status(400).json({
            message : `Error in creating patient ${error}`
        });
    }
};
//method for creating patient report 
module.exports.createReport = async(req,res)=>{
    try {
        const patient =await Patients.findOne({phone:req.params.phone});
        if(patient){
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            const doctor = jwt.verify(token,process.env.ACCESS_TOKEN_SECERT);
            const report  = new Reports;
            report.patient_name=patient.name;
            report.created_by_doc= doctor.username;
            if(req.body.status=="N"){
                report.status = "Negative"
            }
            else if(req.body.status=="TQ"){
                report.status = "Travelled-Quarantine"
            }
            else if(req.body.status=="SQ"){
                report.status = "Symptoms-Quarantine"
            }
            else if(req.body.status=="PA"){
                report.status = "Positive-Admit"
            }
            await report.save();
            return res.status(200).json({
                message : "Report created",
                report : report
            });

        }
        else{
            return res.status(400).json({
                message:"error in finding patient"
            });
        }
        // const report = new Reports;
        // report.patient_name
        
        

    } catch (error) {
        return res.status(400).json({
            message:`error in creating report ${error}`
        });
    }
}; 

//method to generate all reports
module.exports.allreports = async(req,res)=>{
    try {
        const patient =await Patients.findOne({phone:req.params.phone});
        if(patient){
            
            const report = await Reports.find({patient_name:patient.name});
            return res.status(200).json({
                message:" all reports generated ",
                reports : report
            });
        }
        else{
            return res.status(400).json({
                message:"patient not found"
            });
        }

        
    } catch (error) {
        return res.status(400).json({
            message: `error in finding reports ${error}`
        });
    }
};