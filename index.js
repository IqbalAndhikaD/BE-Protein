const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
require('dotenv').config()

connectDB()

app.use('/users', require('./routes/userRoute'))
app.use('/admins', require('./routes/adminRoute'))

app.listen(process.env.PORT, () => {
    console.log(`Server berjalan pada http://localhost:${process.env.PORT}`)
})