const AppError = require('../utils/AppError');
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  else{
    // console.error(err)
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong, try again later'
    })
  }
};
const castErrorHandlerDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const duplicateErrorHandlerDB = (err) => {
    const duplicateValue = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0]
    const message = `Duplicate value: ${duplicateValue}`
    return new AppError(message, 400)
}
const validationErrorDB = (err) => {
    const errors = Object.values(err.errors)
    const messages = errors.map((error) => {
        return error.message
    }).join(', ')
    const message = `Invalid input data: ${messages}`
    return new AppError(message, 400)
}

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, errmsg: err.message };
    console.log(error);
    if (error.name === 'CastError') {
      error = castErrorHandlerDB(error);
    }
    if (error.code === 11000){
        error = duplicateErrorHandlerDB(error)
    }
    if (err.name === 'ValidationError') {
        error = validationErrorDB(error)
    }
    sendErrorProd(error, res);
  }
};
