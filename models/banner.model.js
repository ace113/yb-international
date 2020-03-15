const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const banner = mongoose.model('Banner', bannerSchema)

module.exports = banner