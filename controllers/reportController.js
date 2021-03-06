const Reports = require("../models/reports");

module.exports.status = async(req,res)=>{
    try {
        let status="";
        if(req.params.status=="N"){
            status = "Negative"
        }
        else if(req.params.status=="TQ"){
            status = "Travelled-Quarantine"
        }
        else if(req.params.status=="SQ"){
            status = "Symptoms-Quarantine"
        }
        else if(req.params.status=="PA"){
            status = "Positive-Admit"
        }
        if(status===""){
            return res.status(400).json({
                message : "Please enter correct status"
            });
        }
        const report =await Reports.find({status :status});
        // console.log(report);
        return res.status(200).json({
            message: `Reports with status ${status} generated`,
            reports : report
        })
    } catch (error) {
        return res.status(400).json({
            message : `error in finding reports ${error}`
        })
    }
    
};