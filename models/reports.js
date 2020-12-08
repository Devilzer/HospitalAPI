const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
    {
        patient_name :{
            type : String,
            required : true
        },
        created_by_doc : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required :true
        }
    },
    {
        timestamps : true
    }
);

const Reports = mongoose.model("Reports",reportSchema);
module.exports = Reports;