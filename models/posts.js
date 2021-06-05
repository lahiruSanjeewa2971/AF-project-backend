const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postTestSchema = new Schema({
    postid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    views: {
        type: Number,
        require: true
    }
})


const PostTest = mongoose.model("PostTest", postTestSchema);
module.exports = PostTest;