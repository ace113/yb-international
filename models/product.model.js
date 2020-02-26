const mongoose = require('mongoose')

const Category = require('./category.model')

const gallerySchema = new mongoose.Schema({
    image: {
        type: String
    },
    imageType: {
        type: String
    }
})

const productSchema  = new mongoose.Schema({
    avatar: {
        type: String
    },   
    localName: {
        type: String,
        required: true
    },
    scientificName: {
        type: String
    },
    nepaliName: {
        type: String
    },
    available: {
        type: Boolean
       
    },
    productCode: {
        type: String,
        required: true,
    },
    pricing: {
        type: String
    },
    offers: {
        type: String
    },
    details: {
        type: String
    },
    gallery: {
        type: [gallerySchema]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
