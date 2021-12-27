const router = require('express').Router()
const Announcement = require('../models/announcement')

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

module.exports = router