const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        default: false
    },
    product: {
        type: String,
        required: true
    },
    submittedDate: {
        type: Date,
        default: Date.now
    }
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

module.exports = Testimonial;