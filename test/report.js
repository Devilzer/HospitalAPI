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

describe("Reports",()=>{
    const payload = {username : "doctor",password : "password"};
    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECERT,{
        expiresIn : "10m"
    });
    beforeEach((done)=>{
            Reports.remove({},(err)=>{
                done();
            });   
    });


    //test for reports all status
    describe("/GET /reports/:status",()=>{

        //sending all status request without auth token
        it("it should say invalid request because of missing - Reports All Status",(done)=>{
                Reports.create({patient_name :"temp",created_by_doc:"Doc",status:"Negative"},(err,report)=>{
                    chai.request(server)
                    .get("/api/v1/reports/N")
                    .end((err,res)=>{
                        console.log(res.body);
                        res.should.have.status(401);
                        res.body.should.have.property("message");
                        res.body.message.should.be.eql("Invalid request");
                        done();
                    });
                });
        });

        //sending all status request with wrong status
        it("it should say Please enter correct status because of wrong status - Reports All Status",(done)=>{
            Reports.create({patient_name :"temp",created_by_doc:"Doc",status:"Negative"},(err,report)=>{
                chai.request(server)
                .get("/api/v1/reports/AB")
                .set({"authorization":`Bearer ${accessToken}`})
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(400);
                    res.body.should.have.property("message");
                    res.body.message.should.be.eql("Please enter correct status");
                    done();
                });
            });
        });


        //sending all status request with correct status
        it("it should say Reports with status generated - Reports All Status",(done)=>{
            Reports.create({patient_name :"temp",created_by_doc:"Doc",status:"Negative"},(err,report)=>{
                chai.request(server)
                .get("/api/v1/reports/N")
                .set({"authorization":`Bearer ${accessToken}`})
                .end((err,res)=>{
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property("message");
                    res.body.should.have.property("reports");
                    res.body.reports.length.should.be.eql(1);
                    res.body.reports[0].should.have.property("patient_name");
                    res.body.reports[0].should.have.property("created_by_doc");
                    res.body.reports[0].should.have.property("status");
                    done();
                });
            });
        });

    }); 





});