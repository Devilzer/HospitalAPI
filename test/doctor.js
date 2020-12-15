const Doctors = require("../models/doctors");
//Require the dev-dependencies
const chai = require("chai");
const chaiHTTP = require("chai-http");
const server = require("../index");
const should = chai.should();

chai.use(chaiHTTP);

describe('Doctors',()=>{
    beforeEach((done)=>{
        Doctors.remove({},(err)=>{
            done();
        });
    });

    describe("/POST /doctors/register",()=>{
        const missingDoctorDetails = {username :"tempName",password:""};
        const correctDoctorDetails = {username:"tempName",password:"tempPassword"};
        // sending doctor register request with missing details
        it("it should say bad request because of missing field - Doctor register req",(done)=>{
            chai.request(server)
            .post("/api/v1/doctors/register")
            .set("content-type","application/x-www-form-urlencoded")
            .send(missingDoctorDetails)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(400);
                done();
            });
        });
        //sending doctor register request with correct details
        it("it should say user registered - Doctor register req",(done)=>{
            chai.request(server)
            .post("/api/v1/doctors/register")
            .set("content-type","application/x-www-form-urlencoded")
            .send(correctDoctorDetails)
            .end((err,res)=>{
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.have.property("details");
                res.body.details.should.have.property("username");
                res.body.details.should.have.property("password");
                done();
            });
        });
    });
});