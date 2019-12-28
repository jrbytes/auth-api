const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
)

app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

app.listen(3000, () => console.log('Server up and running'))