const mongoose = require('mongoose')

const Category = require('./category.model')

const productSchema  = new mongoose.Schema({
    avatar: {
        type: String
    },
    // avatarType: {
    //     type: String,
    //     required: true
    // },
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
})

// productSchema.virtual('avatarPath').get(function(){
//    if(this.avatar != null && this.avatarType != null) {
//        return `data: ${this.avatarType};charset=utf-8;base64,${this.avatar.toString('base64')}`
//    } 
// })

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
