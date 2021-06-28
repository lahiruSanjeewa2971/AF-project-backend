const conferenceRouter = require('express').Router();
const { request } = require('express');
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
<<<<<<< HEAD
conferenceRouter.route("/displayconferences").get((req, res)=>{
=======

//Display all Conferences, uploaded
conferenceRouter.route("/displayall").get((req, res)=>{
>>>>>>> a327bf80c66c285f221a900b71d3dfed06ef2c44
    Conference.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
<<<<<<< HEAD

conferenceRouter.route("/getSingleConference").post(async (req, res) => {
=======
conferenceRouter.route("/getConf").post(async(req, res) => {
>>>>>>> a327bf80c66c285f221a900b71d3dfed06ef2c44
    Conference.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
<<<<<<< HEAD

=======
conferenceRouter.route("/getConference").post(async (req, res) => {
    Conference.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
/**
 * serviceRouter.route("/getservice").post(async (req, res) => {
    Service.find({serviceid:req.body.serviceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
 */

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
>>>>>>> a327bf80c66c285f221a900b71d3dfed06ef2c44
module.exports = conferenceRouter;