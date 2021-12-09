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
    emailname:{
        type: String,
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
        default: "avatar/noAvatar.jpg"
    },
    background:{
        type: String,
        default: "background/nodejs.png"
    },
    role:{
        type: String,
        default: "student"
    }
},
{timestamps: true})

module.exports = mongoose.model('User', UserSchema)