const workshopRouter = require('express').Router();
let Workshop = require('../models/workshop');

//add new workshop
workshopRouter.route("/addworkshop").post((req, res) => {
    const workshopid = req.body.workshopid;
    const name = req.body.name;
    const title = req.body.title;
    const place = req.body.place;
    const guestSpeaker = req.body.guestSpeaker;
    const newWorkshop = new Workshop({
        workshopid,
        name,
        title,
        place,
        guestSpeaker,
    })
    newWorkshop.save().then(() => {
        res.json("Workshop added")
    }).catch((err) => {
        console.log(err)
    })
})
//Display not checked workshops by editor
workshopRouter.route("/").get((req, res)=>{
    Workshop.find({status: "un_checked"}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})
//Display all workshops, uploaded
workshopRouter.route("/displayall").get((req, res)=>{
    Workshop.find({"status": {$ne: "un_checked"}}, function(docs, err){
        if(!err){
            res.send(docs)
        }else{
            res.send(err)
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
workshopRouter.route("/getworkshop").post(async (req, res) => {
    Workshop.find({workshopid: req.body.workshop_id}, (docs, err) => {
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
 */
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

module.exports = workshopRouter;