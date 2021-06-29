const mongoose = require('mongoose')

const workshopSchema = new mongoose.Schema({

    workshop_id:{
        type: String,
        unique: true,
        trim: true,
        required:true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    time:{ 
        type: String,
        trim: true,
        required: true
    },
    date:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true

    },
    status:{
        type: String,
        default: 'un_checked'

    }

},{
    timestamps:true
})

module.exports = mongoose.model("WorkshopsN", workshopSchema)