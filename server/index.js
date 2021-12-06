const express = require('express')
const app = express()
PORT =  8080 || process.env.PORT
const db = require('./db')
const helmet = require('helmet')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

app.use(express.json())
app.use(helmet())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})