const Researcher = require('../models/researcherModel')

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
const researcherC = {
    getResearcher: async (req,res) => {
        try{
            const steps = new APIsteps(Researcher.find(), req.query)
            const researcher = await steps.query
            // res.json(researcher)
            res.json({
                status: 'success',
                result: researcher.length,
                researcher: researcher
            })
          

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
        
    },

    createResearcher: async(req, res) => {
        try{
            const {name, researche_id, title, description, images, contact_name, contact_no, contact_mail} = req.body;
            if(!images) return res.status(400).json({msg: "Please upload your document"})
            const researcher = await Researcher.findOne({name})
            if(researcher) 
                return res.status(400).json({msg:"This document already exists"})

            const newResearcher = new Researcher({name, researche_id, title, description, images, contact_name, contact_no, contact_mail})
            await newResearcher.save()
            res.json({msg: "Researcher Added"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    deleteResearcher: async(req, res) => {
        try{
            await Researcher.findByIdAndDelete(req.params.id)
            res.json({msg: "Research Deleted"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateResearcher: async(req, res) => {
        try{
            const {title,description,images,contact_name,contact_no,contact_mail} = req.body;
            if(!images) return res.status(400).json({msg: "Please upload your document"})
            await Researcher.findByIdAndUpdate({_id: req.params.id}, {title,description,images,contact_name,contact_no,contact_mail})

            res.json({msg: "Research Updated"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

}

module.exports = researcherC