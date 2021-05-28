const users = require('../models/userModel')

//password encrypted using bcrypt
const bcrypt = require('bcrypt')

//user authentication using jsonwebtoken
const jwt = require('jsonwebtoken')

const userC = {

    register: async(req, res) => {
        try{

            const {name, email, password} = req.body;

            const user = await users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists"})

            if(password.length < 6)
            return res.status(400).json({msg: "Password Should be at least 6 Characters"})

            

            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new users({
                name, email, password: passwordHash
            })


            //Save mongodb using save()
            await newUser.save()

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})
            // res.json({msg:"Successfully Registered!!"})

            res.cookie('refreshtoken', refreshtoken,{
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try{
        const rf_token = req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({msg:"please login or register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET,(err,user) =>{
            if(err) return res.status(400).json({msg:"Please Login or Register"})
            const accesstoken = createAccessToken({id: user.id})
            res.json({user, accesstoken})
        })
        
        res.json({accesstoken})
        }
        catch(err){return res.status(500).json({msg: err.message})}
    }
}


const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'})
}

module.exports = userC