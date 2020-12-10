# HospitalAPI

A basic API to keep track of patients covid status and generate reports for them. 

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
