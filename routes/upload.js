const router = require('express').Router()
const auth = require('../middle/auth')
const authResearcher = require('../middle/authResearcher')
const cloudinary = require('cloudinary')
const fs = require('fs')

//I used cloudinary to upload pdf,doc,media files to store. Here first we need to config it
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET

})

// router.post('/upload',auth,authResearcher, (req,res) =>{
router.post('/upload', (req,res) =>{
    try{
        console.log(req.files)
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg:'Upload Not Successfull. Please Select your research File Again'})

        const file = req.files.file;
        //Here I check the file size of the research is more than 20MB
        if(file.size > 1024*1024*20){
            removeTempFile(file.tempFilePath)
            return res.status(400).json({msg: 'File size cannot be more than 20MB'})
        }
        


        if(file.mimetype !== 'application/pdf' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        {
            removeTempFile(file.tempFilePath)
            return res.status(400).json({msg: 'File type is not correct (Available Formats are pdf/jpeg/docx'})
        }
        
        //resource_type: "raw"
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err, result) =>{
            if(err) throw err;

            removeTempFile(file.tempFilePath)
            res.json({public_id: result.public_id, result: result.secure_url})
         
        })


        

    }catch(err){
        res.status(500).json({msg: err.message})
    }
})

router.post('/delete',auth,authResearcher, (req,res) =>{
    try{

        const {public_id} = req.body;
        if(!public_id)
        return res.status(400).json({msg: 'Please select the Research you want to delete'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result) =>{
            if(err) throw err;

            res.json({msg: "Research Deleted"})
        })

    }catch(err){
       return res.status(500).json({msg: err.message})
    }
    

})

    //here i removed temporily file 
    const removeTempFile = (path) =>{
        fs.unlink(path, err=>{
            if(err) throw err;
        })

    }

module.exports = router