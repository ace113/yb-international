const mongoose = require('mongoose')

const blogCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
})

const blogCategory = mongoose.model('BlogCategory', blogCategorySchema)

module.exports = blogCategory