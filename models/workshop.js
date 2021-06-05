const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workshopSchema = new Schema({
    workshopid: {
        type:String,
        require: true
    },
    name: {
        type:String,
        require: true
    },
    title: {
        type:String,
        require: true
    },
    place: {
        type:String,
        require: true
    },
    guestSpeaker: {
        type:String,
        require: true
    },
    status: {
        type: String,
        default: 'un_checked'
    }
},{
    //using timestamps we can know created time and date
    timestamps: true
})
module.exports = mongoose.model('Workshop', workshopSchema)