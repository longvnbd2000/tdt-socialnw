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
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const emailname = req.body.email.split('@')[0]
        const newUser = new User({
            email: req.body.email,
            emailname: emailname,
            username: emailname,
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
        const decoded = await jwtHelper.verifyToken(req.body.token, accessTokenSecret)
        
        const user = await User.findOne({_id: decoded.data._id})
        const {password, ...other} = user._doc
        res.status(200).json(other)
    }
    catch(err){
        res.status(500).json(err)
    }
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        const authId = 'google:' + profile.id;
        User.findOne({ 'authId': authId })
        .then(user => {
            if(user) return done(null, user);
            new User({
                authId: authId,
                username: profile.displayName,
                email: profile.emails[0].value,
                role: 'student',
            }).save()
            .then(user => done(null, user))
            .catch(err => done(err, null));
        })
        .catch(err => {
            if(err) return done(err, null);
        });
    }
))
passport.serializeUser(function(user, done) {
    done(null, user._id);
})
  
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
})
  
router.get('/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
]}))


router.get('/google/callback', passport.authenticate('google', { 
    successRedirect: 'http://localhost:3000/',
    failureRedirect: 'http://localhost:3000/signin' 
}))

//router.get('/google/logout', function(req, res){
//    req.logout()
//    res.redirect('http://localhost:3000/signin')
//})


module.exports = router