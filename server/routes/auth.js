const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtHelper = require('../helpers/jwtHelper')

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
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife)
        req.session.userToken = accessToken
        res.status(200).json({code: "success", accessToken})
    }
    catch(err){
        res.status(500).json(err)
    }
    
})

router.get('/user', async(req, res) => {
    try{
        const jwt = req.session.userToken
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const decoded = await jwtHelper.verifyToken(jwt, accessTokenSecret)
        
        res.status(200).json(decoded.data)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router