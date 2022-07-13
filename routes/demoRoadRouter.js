const express = require('express')
const router = express.Router()
const demoRoadController = require('../controllers/demoRoadController')
const {getAllRoads, createRoad, getRoad, updateRoad, deleleRoad, checkID, getRoadByName, checkName} = demoRoadController


router.param('id', checkID)
router.route('/').get(getAllRoads).post(createRoad)
router.route('/:id').get(getRoad).patch(updateRoad).delete(deleleRoad)
router.route('/place/:place').get(getRoadByName)

module.exports = router