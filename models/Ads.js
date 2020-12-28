const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

///initialize plugin
mongoose.plugin(slug);

const AdsSchema = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    AdsImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
        slug_padding_size: 3
    }
})

module.exports = mongoose.model('ads', AdsSchema)