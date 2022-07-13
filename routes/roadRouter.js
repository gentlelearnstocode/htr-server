const express = require('express')
const router = express.Router()
const roadController = require('../controllers/roadController')
const {createRoad, getAllRoads, getRoad, updateRoad, deleteRoad, topCheapRoads, getRoadStats} = roadController

router.route('/get-stats').get(getRoadStats)
router.route('/top-3-cheap').get(topCheapRoads, getAllRoads)
router.route('/').post(createRoad).get(getAllRoads)
router.route('/:id').get(getRoad).patch(updateRoad).delete(deleteRoad)

module.exports = router