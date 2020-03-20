const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
})

const banner = mongoose.model('Banner', bannerSchema)

module.exports = banner