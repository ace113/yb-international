const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    productCode: {
        type: String        
    },
    quantity: {
        type: String,
        required: true
    },
    requirements: {
        type: String
        
    },
    packingDetails: {
        type: String
    },
    callMe: {
        type: Boolean,
        required: true
    }

},{
    timestamps: true
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote;