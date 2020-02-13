const mongoose = require('mongoose')

const productDetailSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    gallery: {
        type: Buffer
    }
})

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

module.exports = ProductDetail