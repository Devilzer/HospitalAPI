const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
},{
    timestamps :true
});

const Doctors = mongoose.model("Doctors",doctorSchema);

module.exports = Doctors;