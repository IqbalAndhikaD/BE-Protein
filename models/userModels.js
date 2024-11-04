const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bidang: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        require: false,
        default: false,
    }

},
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)
module.exports = User