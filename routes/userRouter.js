const router = require('express').Router()
const userC = require('../controllers/userC')

router.post('/register', userC.register)
router.get('/refresh_token', userC.refreshToken)


module.exports = router