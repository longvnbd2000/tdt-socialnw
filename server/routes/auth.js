const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send('auth page')
})

router.post('/register', async(req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err){
        console.log(err)
        res.status(500).json("username has been used")
    }
})

router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user){
            res.status(404).json("user not found")
        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword){
            res.status(400).json("wrong password")
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(500)
    }
    
})

module.exports = router