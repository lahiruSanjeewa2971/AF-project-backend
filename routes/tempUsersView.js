const tempUsersViewRouter = require('express').Router();
let TempUsers = require('../models/userModel');

//display all conferences by admin
tempUsersViewRouter.route("/displayusers").get((req, res)=>{
    TempUsers.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = tempUsersViewRouter;