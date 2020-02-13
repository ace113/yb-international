const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
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
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state:{
        type: String
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer