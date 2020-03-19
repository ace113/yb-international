const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    address: {
        type: [String],
        required: true
    },
    phone: {
        type: [Number],
        required: true
    },
    email: {
        type: [String],
        required: true
    }
})

const info = mongoose.model('Info', infoSchema)

module.exports = info