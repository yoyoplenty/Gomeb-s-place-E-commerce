const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    NoOfPost: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('categories', categorySchema)