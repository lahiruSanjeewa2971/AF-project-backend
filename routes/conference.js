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

conferenceRouter.route("/getConf").post(async(req, res) => {
    Conference.find({conferenceid: req.body.conferenceid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})

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
//update conference details by editor
conferenceRouter.route("/updateconference").post(async (req, res) => {
    Conference.findOneAndUpdate({conferenceid: req.body.conferenceid}, {
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description,
        note: req.body.note

    }, (err) => {
        if(!err){
            res.send('Update details')
        }
        else{
            res.send(err)
        }
    })
})
/**
 * serviceRouter.route("/update").post(async (req, res) => {
    Service.findOneAndUpdate({serviceid: req.body.serviceid}, {

        servicename: req.body.servicename,
        imgurl: req.body.imgurl,
        category: req.body.category,
        price: req.body.price,
        owner: req.body.owner,
        location: req.body.location

    }, (err) => {

        if(!err){
            res.send("Item updated.....")
        }
        else{
            res.send(err)
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
//display all conferences by admin
conferenceRouter.route("/displayconferences").get((req, res)=>{
    Conference.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

module.exports = conferenceRouter;