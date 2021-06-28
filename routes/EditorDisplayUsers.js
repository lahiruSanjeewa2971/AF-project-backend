const editorDisplayUserRouter = require('express').Router();
let EditorUser = require('../models/userModel');

editorDisplayUserRouter.route("/").get((req, res)=>{
    EditorUser.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = editorDisplayUserRouter;