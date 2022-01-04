const router = require('express').Router()
const Announcement = require('../models/announcement')
const User = require('../models/user')

//Create Announcement
router.post("/", async (req, res) => {
    const newAnnouncement = new Announcement(req.body)
    try{
        const announcement = await newAnnouncement.save()
        res.status(200).json(announcement)
        
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Update Announcement
router.put("/:id", async (req, res) => {
    try{
        const announcement = await Announcement.findById(req.params.id)
        if(announcement.userId == req.body.userId){
            const updated = await Announcement.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updated)
        }
        else{
            res.status(400).json('You can update only your announcements')
        }
    }
    catch(err){
        res.status(500).json(err)
    }    
})

//Get all Announcements
router.get('/', async(req,res) => {
    try{
        const allAnnouncements = await Announcement.find().sort([['createdAt', -1]])
        res.status(200).json(allAnnouncements);
    }catch(err){
        res.status(500).json(err)
    }
    
})

//Get user's announcement
router.get('/list/emailname/:emailname', async(req,res) => {
    try{
        let emailname = req.params.emailname
        const user = await User.findOne({ emailname: emailname})
        const userAnnouncement = await Announcement.find({userId: user._id}).sort(([['createdAt', -1]]))
        res.status(200).json(userAnnouncement)
    }catch{
        res.status(500)
    }
})

router.post('/:id', async(req, res) => {
    try{
        const announcement = await Announcement.findById(req.params.id)
        if(announcement.userId == req.body.userId){
            await Announcement.findByIdAndDelete(req.params.id)
            res.status(200).json("deleted")
        }
        else{
            res.status(400).json('you can delete only your posts')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router