const messageRouter = require('express').Router();
let Message = require('../models/message');
const { timeStamp } = require('console')

messageRouter.route("/addnewmessage").post((req, res) => {
    const messageid = req.body.messageid;
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const newService = new Message({
        messageid,
        name,
        email,
        message,
    })

    newService.save().then(() => {
        res.json("Message added..!")
    }).catch((err) => {
        console.log(err);
    })
})
messageRouter.route("/").get((req, res) => {
    Message.find({name: "Lahiru"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
//display
messageRouter.route("/displaymessages").get((req, res) => {
    Message.find({}, function(docs, err){
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
module.exports = messageRouter;