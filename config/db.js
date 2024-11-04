const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.URL_MONGODB)
        console.log('Database connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB