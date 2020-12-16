const Patients = require("../models/patients");
const Reports = require("../models/reports");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Require the dev-dependencies
const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHTTP);

describe("Patients",()=>{
    const payload = {username : "doctor",password : "password"};
    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECERT,{
        expiresIn : "10m"
    });
    beforeEach((done)=>{
        Patients.remove({},(err)=>{
            Reports.remove({},(err)=>{
                done();
            });
        });
        
    });


    //test for patients register
    describe("/POST /patients/register",()=>{
        const missingPatientDetails = {
            name : "tempPatient",
            phone : ""
        }
        const correctPatientDetails = {
            name : "tempPatient",
            phone : "1234567890"
        }

        //sending patient register request without autorization token
        it("it should say invalid request because of missing token - Patient register",(done)=>{
            chai.request(server)
            .post("/api/v1/patients/register")
            .set("content-type","application/x-www-form-urlencoded")
            .send(correctPatientDetails)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(401);
                res.body.should.have.property("message");
                res.body.message.should.be.eql("Invalid request");
                done();
            });
        });


        //sending patient register request with missing details
        it("it should say Error bad request because of missing patient details - Patient register",(done)=>{
            chai.request(server)
            .post("/api/v1/patients/register")
            .set("content-type","application/x-www-form-urlencoded")
            .set({"authorization":`Bearer ${accessToken}`})
            .send(missingPatientDetails)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(400);
                done();
            });
        });
        //sending correct Patient details
        it("it should says Success patient registered - Patient Register",(done)=>{
            chai.request(server)
            .post("/api/v1/patients/register")
            .set("content-type","application/x-www-form-urlencoded")
            .set({"authorization":`Bearer ${accessToken}`})
            .send(correctPatientDetails)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property("message");
                res.body.should.have.property("details");
                res.body.message.should.be.eql("Success patient registered!");
                res.body.details.should.have.property("name");
                res.body.details.should.have.property("phone");
                done();
            });
        });
    });


});