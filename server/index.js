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
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')


app.use(express.json())
app.use(helmet())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
    resave: false,   
    saveUninitialized: false,  
    secret: process.env.COOKIE_SECRET,  
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})