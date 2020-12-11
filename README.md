# HospitalAPI

A basic API to keep track of patients' covid status and generate reports for them. 

## Features

* Register Doctor with username and password.
* User login and returns jwt token to access protected routes.
* Patient Registration(jwt protected) : A doctor can register a patient with name and phone no.
* Report Generation(jwt protected) : A doctor can generate report providing patient status.
* View all reports (jwt protected) : A doctor can view all reports of a particular patient.
* Reports filtered by status (jwt protected): A doctor can view all reports present in database filtered by status.

## How to install and run?

1. Clone this project
2. Install all dependencies by `npm install`
3. Config MongoDB by adding your db connect url in `HospitalAPI/config/mongoose.js`
4. `npm start`

## How to use the API?

#### Base URL : `http://localhost:3000/api/v1`

#### API End points :

1. `/doctors/register`(POST): Register Doctor with username and password.<br/>
Example input:<br/>
<img src="assets/images/drlogin.png"/><br/>
Example output:<br/>
<img src="assets/images/drRegisterOP.png"/><br/>

2. `/doctors/login`(POST): login Doctor with your username and password.<br/>
Example input:<br/>
<img src="assets/images/drlogin.png"/><br/>
Example output:(Recieve jwt token in response)<br/>
<img src="assets/images/drloginOP.png"/><br/>
> All further requests will include JWT token in Authorization header.<br/>
<img src="assets/images/jwtToken.png"/><br/>

3. `/patients/register`(POST): Register Patient with his name and phone no.<br/>
Example input:<br/>
<img src="assets/images/createPatIN.png"/><br/>
Example output:<br/>
<img src="assets/images/createPatOUT.png"/><br/>

4. `/patients/:phone/create_report`(POST): create patient report using phone no and status. Here patient phone no is being treated as patient ID.<br/>
Example input:<br/>
NOTE: Status N,TQ,SQ,PA are mapped to Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit.<br/>
<img src="assets/images/createRepIN.png"/><br/>
Example output:<br/>
<img src="assets/images/createRepOUT.png"/><br/>

5. `/patients/:phone/all_reports`(GET): Generate all reports of a patient by ID (phone number) sent in params.<br/>
Example output :<br/>
<img src="assets/images/allReports.png" height = "500px"/><br/>
6. `/reports/:status`(GEt): Generate  all the reports of all the patients filtered by a specific status.<br/>
NOTE: Status N,TQ,SQ,PA are mapped to Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit.<br/>
Example output :<br/>
<img src="assets/images/statusReports.png" height="350px"/><br/>

## Directory Structure

This project follows MVC Structure.<br/>
`assets` Contains Static files.<br/>
`config` Contains config files for js libries used in project.<br/>
`controllers` Contains functions for controlling the api endpoints.<br/>
`models` Contains different database models.<br/>
`routes` Contains all routes.
        
