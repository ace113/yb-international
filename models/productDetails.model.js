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
        type: String
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

module.exports = ProductDetail