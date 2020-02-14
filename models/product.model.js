const mongoose = require('mongoose')

const productSchema  = new mongoose.Schema({
    avatar: {
        type: String
    },
    localName: {
        type: String
    },
    scientificName: {
        type: String
    },
    nepaliName: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    productCode: {
        type: String,
    },
    category: {
        type: String
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
