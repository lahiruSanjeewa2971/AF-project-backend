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

//Display all Conferences, uploaded
conferenceRouter.route("/displayall").get((req, res)=>{
    Conference.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

conferenceRouter.route("/updateStatus").post(async (req, res) => {
    Conference.findOneAndUpdate({conferenceid: req.body.conferenceid}, {
        status: req.body.status
    }, (err) => {
        if(!err){
            res.send("Status has being changed..!")
        }else{
            res.send(err)
        }
    })
})
/**
 * var newvalues = { $set: { address: "Canyon 123" } };
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) 
 */
module.exports = conferenceRouter;