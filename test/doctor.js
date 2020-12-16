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

    // tests for register routes..
    describe("/POST /doctors/register",()=>{
        const missingDoctorDetails = {username :"tempName",password:""};
        const correctDoctorDetails = {username:"tempName",password:"tempPassword"};

        // sending doctor register request with missing details
        it("it should say bad request because of missing field - Doctor register",(done)=>{
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
        it("it should say user registered - Doctor register",(done)=>{
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


    //tests for login route
    describe("/POST /doctors/login",()=>{

        //sending doctor login req with missing details
        it("it should say Invalid username or Password - Doctor login",(done)=>{
                Doctors.create({username:"tempDoc",password:"tempPass"},(err,doctor)=>{
                chai.request(server)
                .post("/api/v1/doctors/login")
                .set("content-type","application/x-www-form-urlencoded")
                .send({username:"tempDoc",password:""})
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(401);
                    res.body.should.have.property("message");
                    res.body.message.should.be.eql("Invalid username or Password!");
                    done();
                });
            });
        });


        //sending correct doctor login details
        it("it should login success here is your token - Doctor login",(done)=>{
            Doctors.create({username:"tempDoc",password:"tempPass"},(err,doctor)=>{
                chai.request(server)
                .post("/api/v1/doctors/login")
                .set("content-type","application/x-www-form-urlencoded")
                .send({username:"tempDoc",password:"tempPass"})
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property("message");
                    res.body.should.have.property("AccessToken");
                    res.body.message.should.be.eql("login success here is your token.");
                    done();
                });
            });
        });


    });
    
});