const mongoose = require('mongoose')
const Product = require('./product.model')
const Customer = require('./customer.model')

const orderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order