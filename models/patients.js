const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
},{
    timestamps :true
});

const Patients = mongoose.model("Patients",patientSchema);
module.exports = Patients;