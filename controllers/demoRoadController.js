const fs = require('fs');
const roads = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/roads.json`, 'utf-8'))

exports.checkID = (req, res, next) =>{
    const { id } = req.params
    if (id * 1 > roads.length-1){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid request'
        })
    }
    next()
}
exports.getAllRoads = (req, res) =>{
    res.status(200).json({
        status: "success",
        result: roads.length,
        requestAt: req.requestTime,
        data: {
            roads: roads
        }
  })
}
exports.getRoad = (req, res) =>{
    const { id } = req.params
    const road = roads.find((item)=>{
        return item.id === id * 1
    })
    res.status(200).json({
        status: "success",
        data: {
            road: road
        }
    })
}
exports.getRoadByName = (req, res) =>{
    console.log(req.params);
    const {place} = req.params
    const road = roads.find((item) =>{
        return item.place.toLowerCase().replace(/ /g, "") === place.toLowerCase().replace(/ /g, "")
    })
    res.status(200).json({
        status: 'success',
        data: {
            road: road
        }
    })
}
exports.createRoad = (req, res) =>{
    const newId = roads[roads.length-1].id + 1
    const newRoad = {id: newId, ...req.body}
    roads.push(newRoad)
    fs.writeFile(`${__dirname}/dev-data/data/roads.json`, JSON.stringify(roads), ()=>{
        res.status(201).json({
            status: 'success',
            data: {
                roads: newRoad
            }
        })
    })
} 
exports.updateRoad = (req, res) =>{
    const { id } = req.params
    res.status(200).json({
        status: 'success',
        massage: `<Road number ${id} has been updated>`
    })
}
exports.deleleRoad = (req, res) =>{
    res.status(204).json({
        status: 'success',
        data: null
    })
}
