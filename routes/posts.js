const postRouter = require('express').Router();
let Post = require('../models/posts');

postRouter.route("/getall").get((req, res) => {
    Post.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})
postRouter.route("/").get((req, res) => {
    Post.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = postRouter;
