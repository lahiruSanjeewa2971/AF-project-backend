const mongoose = require('mongoose')

const researcherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true

    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Researcher", researcherSchema)