const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conference = new Schema({
    conferenceid: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    researcher: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'Not checked'
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Conference', conference)