const router = require('express').Router()
const userC = require('../controllers/userC')
const auth = require('../middle/auth')

router.post('/test', (req,res)=>{
    res.json({msg: "test completed"})
})

router.post('/register', userC.register)

router.post('/login', userC.login)
router.post('/adminlogin', userC.adminLogin)
router.post('/reviewerlogin', userC.reviewerLogin)
router.post('/editorlogin', userC.editorLogin)
router.post('/researcherlogin', userC.researcherLogin)
router.post('/workshoplogin', userC.workshopLogin)



router.get('/logout', userC.logout)

router.get('/refresh_token', userC.refreshToken)

router.get('/infor', auth, userC.getUser)


module.exports = router