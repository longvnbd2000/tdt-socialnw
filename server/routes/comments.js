const router = require('express').Router()
const Comment = require('../models/comment')
const Post = require('../models/post')

//Create comment
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body)

    try{
        const comment = await newComment.save()
        res.status(200).json(comment)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Get post comments
router.get('/:id', async (req, res) => {
    try{
        const comments = await Comment.find({"postId" : req.params.id}).sort([['createdAt', -1]])
        res.status(200).json(comments)    
    }
    catch(err){
        res.status(500).json(err)
    }

})

//Update comments
router.put('/:id', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id)
        if(comment.userId == req.body.userId){
            const updated = await Comment.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updated)
        }
        else{
            res.status(400).json('You can only update your comments')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Delete comment
router.delete('/:id', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id)
        if(comment.userId == req.body.userId){
            const deleted = await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json(deleted)
        }
        else{
            res.status(400).json('You can delete only your comments')
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router