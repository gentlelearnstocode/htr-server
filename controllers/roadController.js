const Road = require('../models/roadModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError')

exports.createRoad = catchAsync(async (req, res, next) => {
  const roads = await Road.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      roads: roads,
    },
  });
});

exports.topCheapRoads = (req, res, next) => {
  req.query.sort = '-rating,budget';
  req.query.page = '1';
  req.query.limit = '3';
  next();
};

exports.getAllRoads = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Road.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const roads = await features.query;
  res.status(200).json({
    status: 'success',
    result: roads.length,
    data: {
      roads: roads,
    },
  });
});
exports.getRoad = catchAsync(async (req, res, next) => {
  const road = await Road.findById(req.params.id)
  if(!road){
    return next(new AppError(`No road found with this ID: ${req.params.id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      road: road,
    },
  });
});

exports.updateRoad = catchAsync(async (req, res, next) => {
  const road = await Road.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if(!road){
    return next(new AppError(`No road found with this ID: ${req.params.id}`, 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      road: road,
    },
  });
});

exports.deleteRoad = catchAsync(async (req, res, next) => {
  const road = await Road.findByIdAndDelete(req.params.id);
  if(!road){
    return next(new AppError(`No road found with this ID: ${req.params.id}`, 404))
  }
  res.status(204).json({
    status: 'success',
  });
});

////AGGREGATION PIPELINE
exports.getRoadStats = catchAsync(async (req, res, next) => {
  const stats = await Road.aggregate([
    {
      $match: {
        rating: { $gte: 1.0 },
      },
    },
    {
      $group: {
        _id: '$difficulty',
        numRoad: { $sum: 1 },
        averageRating: { $avg: '$rating' },
        averageBudget: { $avg: '$budget' },
        avgDuration: { $avg: '$duration' },
        minBudget: { $min: '$budget' },
        maxBudget: { $max: '$budget' },
      },
    },
    {
      $sort: { averageBudget: -1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats: stats,
    },
  });
});
