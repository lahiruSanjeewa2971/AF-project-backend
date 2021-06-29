const adminDashboardWorkshopRouter = require('express').Router();
let AdminDashboard = require('../models/workshopModel');

adminDashboardWorkshopRouter.route("/displayAllWorkshopsindb").get((req, res)=>{
    AdminDashboard.find({}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})


module.exports = adminDashboardWorkshopRouter;