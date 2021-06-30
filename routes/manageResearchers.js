const manageResearchersRouter = require('express').Router();
let ResearcherManage = require('../models/researcherModel');

manageResearchersRouter.route("/displayAll").get((req, res)=>{
    ResearcherManage.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


module.exports = manageResearchersRouter;