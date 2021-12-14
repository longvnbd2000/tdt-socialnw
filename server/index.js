const express = require('express')
require('dotenv').config()
const app = express()
PORT =  8080 || process.env.PORT
const db = require('./db')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const expressSession = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const corsOptions = {
    origin: true, 
    credentials: true,
};
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(helmet())
app.use(expressSession({
    resave: false,   
    saveUninitialized: false,  
    secret: process.env.COOKIE_SECRET,  
}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


const postStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images/post")
    },
    filename: (req, file, callback) => {
        callback(null, req.body.name)
    }
})
const postUpload = multer({postStorage})
app.post('/api/upload/post', postUpload.single("file"), (req, res) => {
    try{
        res.json("file uploaded")
    }
    catch(err){
        console.log(err)
    }
})


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})