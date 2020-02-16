const Testimonial = require('../../models/testimonials.model')

module.exports = {
    //add Testimonial form 
    addTestimonialForm: (req, res, next) => {
        res.render('backend/Testimonials/addTestimonial')
    },

    // edit Testimonial form 
    editTestimonialForm: async (req, res, next) => {
        const id = req.params.id

        const TestimonialFound = await Testimonial.findOne({ _id: id })

        res.render('backend/Testimonials/editTestimonial', {
            Testimonial: TestimonialFound
        })

        /* use this to render the values to the edit Testimonial form */


    },

    // function to add Testimonial
    addTestimonial: async (req, res, next) => {
        let {
            author, 
            email, 
            comment, 
            product, 
            show, 
            submittedDate
        } = req.body

        const Testimonial = await Testimonial.findOne({ email })
        if (Testimonial) {
            return res.json({ message: "Testimonial is already made." })
        }

        const newTestimonial = new Testimonial({
            author, 
            email, 
            comment, 
            product, 
            show, 
            submittedDate
        })

        const saveTestimonial = await newTestimonial.save()

        if (!saveTestimonial) {
            return res.status(400).json({ message: "new cusomer not saved!" })
        }
        res.redirect('/admin/Testimonials')
    },

    // function to delete Testimonial
    editTestimonial: async (req, res, next) => {
        const id = req.params.id

        let {
            author, 
            email, 
            comment, 
            product, 
            show, 
            submittedDate
        } = req.body

        const editedTestimonial = await Testimonial.updateOne({
            _id: id
        }, {
            author, 
            email, 
            comment, 
            product, 
            show, 
            submittedDate
        })

        if (!editedTestimonial) {
            return res.status(400).json({ message: 'edit Testimonial failed' })
        }
        res.redirect('/admin/Testimonials')
    },

    // function to delete Testimonial
    deleteTestimonial: async (req, res, next) => {
        const id = req.params.id

        const deletedTestimonial = await Testimonial.deleteOne({
            _id: id
        })
        if (!deletedTestimonial) {
            return res.status(400).json({ message: 'delete Testimonial failed' })
        }
        res.redirect('/admin/Testimonials')
    },

    // function to get the list of Testimonial
    getTestimonialList: async (req, res, next) => {

        const Testimoniallist = await Testimonial.find()

        if (!Testimoniallist) {
            return res.status(400).json({ message: 'getting Testimonial list failed' })
        }

        res.render('backend/Testimonials/TestimonialList', {
            Testimonials: Testimoniallist
        })

    },

    // function to get the specific Testimonial
    getTestimonial: async (req, res, next) => {
        const id = req.params.id

        const TestimonialFound = await Testimonial.findOne({ _id: id })

        res.render('backend/Testimonials/TestimonialInfo', {
            Testimonial: TestimonialFound
        })

        // render found Testimonial to the Testimonial info page
    }



}