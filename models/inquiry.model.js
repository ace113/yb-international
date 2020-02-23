const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: false
    }
},{
    timestamps: true
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)

module.exports = Inquiry;