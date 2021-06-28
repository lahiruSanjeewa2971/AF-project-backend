const Researcher = require('../models/researcherModel')

const researcherC = {
    getResearcher: async (req,res) => {
        try{
            const researchers = await Researcher.find()
            res.json(researchers)

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
        
    },

    createResearcher: async(req, res) => {
        try{
            const {name} = req.body;
            const researcher = await Researcher.findOne({name})
            if(researcher) 
            return res.status(400).json({msg:"Already There is a research article from this name"})

            const newResearcher = new Researcher({name})
            await newResearcher.save()
            res.json('Researcher added')

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
            const {name} = req.body;
            await Researcher.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Research Updated"})

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

}

module.exports = researcherC