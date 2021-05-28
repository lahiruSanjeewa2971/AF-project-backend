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
module.exports = messageRouter;