const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    authId:{
        type: String,
        default: ""
    },
    email:{
        type: String, 
        max: 100,
        unique: true
    },
    emailname:{
        type: String,
        required: true,
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
    },
    permissions:{
        type: Array
    },
    className:{
        type: String
    },
    major:{
        type: String
    },
    birthday:{
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model('User', UserSchema)