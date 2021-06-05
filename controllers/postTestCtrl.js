const PostTest = require('../models/posts')
const postTestCtrl = {
    getPostTests: async(req, res) => {
        try {
            const Posts = await PostTest.find()
            res.json(Posts)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = postTestCtrl