const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    messageid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;