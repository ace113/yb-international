const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    pageType: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Pages = mongoose.model('Pages', pageSchema)
module.exports = Pages;