const adminConferenceRouter = require('express').Router();
let ConferenceAdmin = require('../models/conference');

//view Single Conference data
adminConferenceRouter.route("/getSingleConference").post( (req, res) => {
    ConferenceAdmin.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
//Display all Conferences uploaded in Editor
adminConferenceRouter.route("/displayallEditorConferences").get((req, res) => {
    ConferenceAdmin.find({}, function(docs, err){
        if(!docs, err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

//update conference details by editor
adminConferenceRouter.route("/updateconference").post( (req, res) => {
    ConferenceAdmin.findOneAndUpdate({conferenceid: req.body.conferenceid}, {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        note: req.body.note

    }, (err) => {
        if(!err){
            res.send('Updated details')
        }
        else{
            res.send(err)
        }
    })
})

module.exports = adminConferenceRouter;