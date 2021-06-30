const reviewerWorkshopRouter = require('express').Router();
let Workshop = require('../models/workshopModel');


//Display not checked workshops 
reviewerWorkshopRouter.route("/").get((req, res)=>{
    Workshop.find({status: "un_checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//Display all workshops, uploaded
reviewerWorkshopRouter.route("/displayallW").get((req, res)=>{
    Workshop.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//Display checked workshops
reviewerWorkshopRouter.route("/checkedW").get((req, res)=>{
    Workshop.find({status: {$ne: "un_checked"}}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//getWorkshop details by reviewer   getwworkshops
reviewerWorkshopRouter.route("/getwworkshops").post( (req, res) => {
    Workshop.find({workshop_id: req.body.workshop_id}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
//Update Workshop status by reviewer    updateworkshopstatus
reviewerWorkshopRouter.route("/updateworkshopstatus").post( (req, res) => {
    Workshop.findOneAndUpdate({workshop_id: req.body.workshop_id}, {
        status: req.body.status,

    }, (err) => {
        if(!err){
            res.send('Updated details')
        }
        else{
            res.send(err)
        }
    })
})

//Update Status
reviewerWorkshopRouter.route("/updateW").post(async (req, res) => {
    Workshop.findOneAndUpdate({workshop_id: req.body.workshop_id}, {
        status: req.body.status

    }, (err) => {
        if(!err){
            res.send('Status Updated By Reviewer')
        }
        else{
            res.send(err)
        }
    })
})

reviewerWorkshopRouter.route("/getwworkshops").post(async (req, res) => {
    Workshop.find({workshop_id: req.body.workshop_id}, (docs, err) => {
        if(!err){
            res.send(docs);
        }else{
            res.send(err);
        }
    })
})

//Delete Workshop
reviewerWorkshopRouter.route("/deleteW").post(async (req, res) => {
    Workshop.findOneAndDelete({workshopid: req.body.workshopid}, (err) => {
        if(!err){
            res.send("Workshop Deleted..!")
            alert("Deleted")
        }else{
            res.send(err)
        }
    })
})

module.exports = reviewerWorkshopRouter;