const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use("/",require("./routes"));
app.get("/",(req,res)=>{
    return res.json({
        message : "wellcome"
    });
});
app.listen(port,(err)=>{
    if(err){
        console.log("Error in starting Server ",err);
    }
    console.log("Server is up and running at ",port);
    
});