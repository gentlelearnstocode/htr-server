const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const demoRoadRouter = require('./routes/demoRoadRouter')
const userRouter = require('./routes/userRouter')
const roadRouter = require('./routes/roadRouter')
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./controllers/errorController')

const app = express()
////Utility middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))
app.use((req, res, next) =>{
    req.requestTime = new Date().toISOString()
    next()
    }
)
//Routing middlewares
app.use('/api/v1/roads', demoRoadRouter)
app.use('/api/v2/users', userRouter)
app.use('/api/v2/roads', roadRouter)

//Error handling middlewares
app.all('*', (req, res, next) => {
    next(new AppError(`Resources not found at ${req.originalUrl}`, 404))
})
app.use(globalErrorHandler)

module.exports = app