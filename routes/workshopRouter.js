const router = require('express').Router()
const workshopC = require('../controllers/workshopC')

router.route('/workshopsN')
.get(workshopC.getWorkshop)
.post(workshopC.createWorkshop)

router.route('/workshopsN/:id')
.delete(workshopC.deleteWorkshop)
.put(workshopC.updateWorkshop)

module.exports = router