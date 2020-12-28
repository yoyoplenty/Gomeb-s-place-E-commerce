const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

///initialize plugin
mongoose.plugin(slug);

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slug_padding_size: 2
    }
})


module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema)