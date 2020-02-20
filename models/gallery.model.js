const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    imageName: {
        type: String,
        Required: true
    },
    imagePath: {
        type: String,
        Required: true
    }
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery;