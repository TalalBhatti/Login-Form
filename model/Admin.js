const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema =  new Schema({
    email: String,
    password: String,
})

let admin = module.exports = mongoose.model('Admin',AdminSchema)