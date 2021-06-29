const editorConferenceRouter = require('express').Router();
let ConferenceEditor = require('../models/conference');

//Display all Conferences uploaded for Editor
editorConferenceRouter.route("/displayallEditorConferences").get((req, res) => {
    ConferenceEditor.find({}, function(docs, err){
        if(!docs, err){
            res.send(docs)
        }
        else{
            res.send(err)
        }
    })
})

module.exports = editorConferenceRouter;