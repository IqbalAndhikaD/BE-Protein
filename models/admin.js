const mongoose =  require('mongoose')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
      type: String,
      required: true,  
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
    isActive: {
        type: Boolean,
        require: false,
        default: false,
    }
},
    {timestamps: true}
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin