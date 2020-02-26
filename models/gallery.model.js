const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    image: {
        type: String,
        Required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
  
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery;