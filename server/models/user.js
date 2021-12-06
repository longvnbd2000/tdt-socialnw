const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    authId:{
        type: String,
        default: ""
    },
    email:{
        type: String, 
        require: true,
        max: 100,
        unique: true
    },
    username:{
        type: String,
        default: ""
    },
    password:{
        type: String,
        min: 6
    },
    avatar:{
        type: String,
        default: ""
    },
    background:{
        type: String,
        default: ""
    },
    role:{
        type: String,
        default: "student"
    }
},
{timestamps: true})

module.exports = mongoose.model('User', UserSchema)