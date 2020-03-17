const mongoose = require('mongoose')
const BlogCategory = require('./blogCategory.model')

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory',
        required: true
    },
    hero: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
})

const blog = mongoose.model('Blog', blogSchema)

module.exports = blog