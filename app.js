require("dotenv").config();
const express = require('express');
const app= express();
const PORT = process.env.PORT || 3000;


// route


// server Initializing
app.listen(PORT,()=>{
    console.log("Server Has Started");
});


