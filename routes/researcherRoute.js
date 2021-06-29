const router = require('express').Router()
const researcherC = require('../controllers/researcherC')
const auth = require('../middle/auth')
const authResearcher = require('../middle/authResearcher')

router.route('/researcher')
.get(researcherC.getResearcher)
// .post(auth, authResearcher, researcherC.createResearcher)
.post(researcherC.createResearcher)


router.route('/researcher/:id')
// .delete(auth, authResearcher, researcherC.deleteResearcher)
// .put(auth, authResearcher, researcherC.updateResearcher)

.delete(researcherC.deleteResearcher)
.put(researcherC.updateResearcher)





module.exports = router