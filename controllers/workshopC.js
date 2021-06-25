const { query } = require('express');
const WorkshopsN = require('../models/workshopModel')

class APIsteps {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} 
        // console.log({before: queryObj})
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        // console.log({after: queryObj})

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        // here we use replace as,
        // gte = greater than or equal
        // gt = greater than
        // lt = lesser than
        // if it is = then it is equal
        //regex used to search even one word from values

        // console.log({queryStr})

        this.query.find(JSON.parse(queryStr))
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 6
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const workshopC = {
    getWorkshop: async(req, res) => {
        try{
            // console.log(req.query)
            const steps = new APIsteps(WorkshopsN.find(), req.query).filtering().sorting().paginating()
            const workshopsN = await steps.query
            // res.json(workshopsN)

            res.json({
                status: 'success',
                result: workshopsN.length,
                workshopsN: workshopsN
            })
            
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    createWorkshop: async(req, res) =>{
        try{
            const{workshop_id, title, time, date, description,images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Please enter your banner"})

            const workshop = await WorkshopsN.findOne({workshop_id})
            if(workshop)
            return res.status(400).json({msg: "This workshop already exists"})

            const newWorkshop = new WorkshopsN({
                workshop_id, title, time, date, description,images, category
                //removed images
            })
            await newWorkshop.save()
            res.json({msg: "Details send to reviewer for approval"})
            // res.json(newWorkshop)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteWorkshop: async(req, res) =>{
        try{
            await WorkshopsN.findByIdAndDelete(req.params.id)
            res.json({msg: "Your workshop deleted before approval"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateWorkshop: async(req, res) =>{
        try{
            const {title, time, date, description, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Please upload your banner"})

            await WorkshopsN.findByIdAndUpdate({_id: req.params.id}, {
                title, time, date, description, images, category
            })
            res.json({msg: "Your workshop updated successfuly"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = workshopC