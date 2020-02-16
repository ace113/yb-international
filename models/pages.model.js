const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
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