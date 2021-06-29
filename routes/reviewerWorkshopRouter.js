const reviewerWorkshopRouter = require('express').Router();
let Workshop = require('../models/workshopModel');
let Researcher = require('../models/researcherModel')


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
    Workshop.find({status: "Checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

//Update Status
reviewerWorkshopRouter.route("/updateW").post(async (req, res) => {
    Workshop.findOneAndUpdate({workshopid: req.body.workshopid}, {
        status: req.body.status
    }, (err) => {
        if(!err){
            res.send("Status has being changed..!")
        }else{
            res.send(err)
        }
    })
})

//Delete Workshop
reviewerWorkshopRouter.route("/delete").post(async (req, res) => {
    Workshop.findOneAndDelete({workshopid: req.body.workshopid}, {
        status: req.body.status
    }, (err) => {
        if(!err){
            res.send("Workshop Deleted..!")
        }else{
            res.send(err)
        }
    })
})

module.exports = reviewerWorkshopRouter;