const conferenceRouter = require('express').Router();
let Conference = require('../models/conference');

//add new conference
conferenceRouter.route("/addconference").post((req, res)=>{
    const conferenceid = req.body.conferenceid;
    const title = req.body.title;
    const date = req.body.selectedDate;
    const location = req.body.location;
    const description = req.body.description;
    const note = req.body.note;

    const newConference = new Conference({
        conferenceid,
        title,
        date,
        location,
        description,
        note,
    })
    newConference.save().then(()=>{
        res.json("Conference Added")
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = conferenceRouter;