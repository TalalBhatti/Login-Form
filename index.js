const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello this is my first Backend server")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server is running on 5000");
})