const express = require('express')
var app = express()
const mongoose = require('mongoose')
const router = express.Router()

var Editormodel = mongoose.model('users', {
    ame: String, 
    email: String,
})

router.post('/login', function(req, res){
    Editormodel.find({
        name: req.body.name,
        email: req.body.email,
    }, function(err, documents){
        if(err){
            res.send("Name and email dosen't match")
        }else{
            if(documents.length == 0){
                res.send('error')
            }else{
                res.send("Login successful.")
            }
        }
    })
})

module.exports = router