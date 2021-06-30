const mongoose = require('mongoose')

const researcherSchema = new mongoose.Schema({

    name:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    researche_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    title:{
        type: String,
        required: true,
        trim: true
    },

    description:{
        type: String,
        required: true 
    },
    images:{
        type: Object,
        required: true
    },
    contact_name:{
        type: String,
        required: true,
        trim: true
    },
    contact_no:{
        type: Number,
        required: true,
        trim: true
    },
    contact_mail:{
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        default: 'un_checked'

    }


}, {
    timestamps: true
})

module.exports = mongoose.model("Researcher", researcherSchema)