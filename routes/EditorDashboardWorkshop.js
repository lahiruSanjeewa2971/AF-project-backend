const editorDashboardRouter = require('express').Router();
let EditorDashboard = require('../models/workshopModel');

editorDashboardRouter.route("/displayAllWorkshops").get((req, res)=>{
    EditorDashboard.find({status: "checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})



module.exports = editorDashboardRouter;