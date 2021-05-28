const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name field is required'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password field is required'],
        trim: true
    }, 
    role: {
        type: Number,
        default:0
    }
    

    
    

},{
    //using timestamps we can know created time and date
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)