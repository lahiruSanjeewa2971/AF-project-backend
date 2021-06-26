const editorDashboardRouter = require('express').Router();
let EditorDashboard = require('../models/workshopModel');

editorDashboardRouter.route("/").get((req, res)=>{
    EditorDashboard.find({status: "un_checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
//Display all workshops, uploaded
/**workshopRouter.route("/displayall").get((req, res)=>{
    Workshop.find({"status": {$ne: "un_checked"}}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

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
 
workshopRouter.route("/getworkshop").post(async (req, res) => {
    Workshop.find({workshopid: req.body.workshopid}, (docs, err) => {
        if(!err){
            res.send(docs);
        }else{
            res.send(err);
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
workshopRouter.route("/update").post(async (req, res) => {
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
*/

module.exports = editorDashboardRouter;