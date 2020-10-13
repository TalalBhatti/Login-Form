const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Admin = require("./model/Admin");
const mongoose = require('mongoose');

// const User = {
//     id: 1,
//     email: "Furqanali@admin.com",
//     password: "Ajkstio94u3D"
// }

mongoose.connect('mongodb://localhost/Website',{ useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log("Database connected......"))
.catch(error=> console.log(error))

app.use(bodyParser.urlencoded({ extended: true }));
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.post("/signup", (req, res) => {

    console.log("req.body.email", req.body.email)
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (admin) {
                // email = false
                res.send(false)
                console.log("signup failed user exists...")
            } else {
                // email = true
                // res.send(true)

                let newAdmin = new Admin({
                    email: req.body.email,
                    password: req.body.password
                })
                newAdmin.save()
                        .then(admin => {
                            console.log("successfully signup data")
                            res.redirect('/');
                        })
                        .catch(err => {
                            console.log(err);
                            return;
                        });
                        }
        })

})
                   
// app.post('/login', (req, res) => {
//     if ((req.body.email == User.email) && (req.body.password == User.password)) {
//         res.redirect('/dashboard');
//     }
//     else {
//         console.log("incorrect");
//     }
// })

app.post('/login',(req,res)=> {
    
    let email = req.body.email;
    let password = req.body.password;
    
    Admin.findOne({email:email},(err,adminData)=>{
        console.log('data is:',adminData)
    })
    .then( admin => {
        if (!admin){
            console.log('email not found')
        }
        if(password==admin.password){
            console.log("success")
        res.redirect('/dashboard')                
        }
        else{
            console.log("try again")
        }
    })
    .catch(err=> (console.log(err)))

    
    
    
})
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("server is running on 5000");
})