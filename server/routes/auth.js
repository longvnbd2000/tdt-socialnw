const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwtHelper = require('../helpers/jwtHelper')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

router.get('/', (req, res) => {
    res.send('auth page')
})

router.post('/register', async(req, res) => {
    try{
        const user = await User.findOne({emailname: req.body.emailname})
        if (user){
            res.status(400).json("Username has been used")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            emailname: req.body.emailname,
            username: req.body.name,
            password: hashedPass,
            role: "faculty",
            permissions: req.body.permissions
        })

        const created = await newUser.save()
        res.status(200).json("success")
    }
    catch (err){
        res.status(500).json("failed")
    }
})

router.post('/signin', async(req, res) => {
    try{
        const user = await User.findOne({emailname: req.body.emailname})
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
            emailname: user.emailname,
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife)

        res.status(200).json({code: 'success', userToken: accessToken})
        
    }
    catch(err){
        res.status(500).json(err)
    }
    
})

router.post('/signin/google', async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            const emailname = req.body.email.split('@')[0]
            const newUser = new User({
                authId: "google:" + req.body.authId,
                email: req.body.email,
                emailname: emailname,
                username: req.body.name,
            })
            await newUser.save()
        }
        const getUser = await User.findOne({email: req.body.email})
        const userData = {
            _id: getUser._id,
            username: getUser.username,
            email: getUser.email,
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife)
        
        res.status(200).json({code: 'success', userToken: accessToken})
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/user/:userToken', async(req, res) => {
    try{
        const jwt = req.params.userToken
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const decoded = await jwtHelper.verifyToken(jwt, accessTokenSecret)
        
        const user = await User.findOne({_id: decoded.data._id})
        const {password, ...other} = user._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports = router