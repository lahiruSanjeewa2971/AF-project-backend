const ReviewerResearchRouter = require('express').Router();

// let Researcher = require('../models/researcherModel')
let Researcher = require('../models/researcherModel')
 
//Display not checked researchers by reviewer
ReviewerResearchRouter.route("/").get((req, res)=>{
    Researcher.find({status: "un_checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


//Display all researchers, uploaded
ReviewerResearchRouter.route("/displayallR").get((req, res)=>{
    Researcher.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

ReviewerResearchRouter.route("/getresearchers").post( (req, res) => {
    Researcher.find({researche_id: req.body.researche_id}, (docs, err) => {
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err);
        }
    })
})
//Display all checked Researcher
ReviewerResearchRouter.route("/checkedR").get((req, res)=>{
    Researcher.find({status: {$ne: "un_checked"}}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


ReviewerResearchRouter.route("/updateresearchopstatus").post( (req, res) => {
    Researcher.findOneAndUpdate({researche_id: req.body.researche_id}, {
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
ReviewerResearchRouter.route("/updateR").post(async (req, res) => {
    Researcher.findOneAndUpdate({resercher_id: req.body.resercher_id}, {
        status: req.body.status
    }, (err) => {
        if(!err){
            res.send("Status has being changed..!")
        }else{
            res.send(err)
        }
    })
})

ReviewerResearchRouter.route("/getwresearchers").post(async (req, res) => {
    Researcher.find({researche_id: req.body.researche_id}, (docs, err) => {
        if(!err){
            res.send(docs);
        }else{
            res.send(err);
        }
    })
})

//Delete Workshop
ReviewerResearchRouter.route("/deleteR").post(async (req, res) => {
    Researcher.findOneAndDelete({researche_id: req.body.researche_id}, (err) => {
        if(!err){
            res.send("Researcher Deleted..!")
            alert("Deleted")
        }else{
            res.send(err)
        }
    })
})
module.exports = ReviewerResearchRouter;