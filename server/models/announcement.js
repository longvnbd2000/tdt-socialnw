const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    file:{
        type: String,
        default: ""
    },
    category: {
        type: String,
        
    }
    
},
{timestamps})

module.exports = mongoose.model('Announcement', AnnouncementSchema)