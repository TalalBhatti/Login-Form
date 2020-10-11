const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const User = {
    id: 1,
    email: "Furqanali@admin.com",
    password: "Ajkstio94u3D"
}

app.use(bodyParser.urlencoded({ extended: true }));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login',(req, res) => {
    if((req.body.email == User.email) && (req.body.password == User.password)){
        res.redirect('/dashboard');
    }
    else{
        console.log("incorrect");
    }
})
app.get('/dashboard',(req,res)=>{
    res.sendFile('dashboard.html')
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server is running on 5000");
})