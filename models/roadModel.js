const mongoose = require('mongoose')

const roadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Road must have a name'],
        unique: true
    },
    budget: {
        type: Number,
        required: [true, 'Road must have a budget'],
    },
    duration: {
        type: Number,
        required: [true, 'Road must have the duration']
    },
    rating: {
        type: Number,
        min: [1.0, 'Minimum rating must be at least 1'],
        max: [5.0, 'Rating must not exceed 5'],
        default: 5.0,
        required: [true, 'Road must have rating']
    },
    destination: {
        type: Number,
        default: 1
    },
    imageCover: String,
    description: {
        type: String,
        required: [true, 'A road must have description']
    },
    createtOn: {
        type: Date,
        default: Date.now(),
        select: false
    },
    difficulty: {
        type: String,
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: 'Difficulty must be either easy, medium or hard'
        }
    }
})

const Road = mongoose.model('Road', roadSchema)

module.exports = Road