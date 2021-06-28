const adminConferenceRouter = require('express').Router();
let ConferenceAdmin = require('../models/conference');

adminConferenceRouter.route("/getSingleConference").post(async (req, res) => {
    ConferenceAdmin.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})


module.exports = adminConferenceRouter;