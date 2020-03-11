const Inquiry = require('../../models/inquiry.model')


module.exports = {

    // inquiry list 
    getInquiryList: async (req, res, next) => {
        const inquiryList = await Inquiry.find({})
        res.render('backEnd/inquiry/inquirylist', {
            inquiryList: inquiryList
        })
    },

    //add product detail
    addInquiryFrom: async (req, res, next) => {
        res.render('backEnd/inquiry/addInquiry')
    },

    addInquiry: async (req, res, next) => {
        let {
            name,
            email,
            subject,
            message
        } = req.body

        if(name == "" || email == "" || subject == "" || message == "") {
            req.flash('error_msg', 'Please fill in all the fields.')
            return res.redirect('/admin/inquiry/add')
        }

        const newInquiry = await new Inquiry({
            name,
            email,
            subject,
            message
        })

        const inquiry = await newInquiry.save()
        if (!inquiry) {
            req.flash('error_msg', 'failed to save inquiry')
            return res.redirect('/admin/inquiry/add')
        }
        res.redirect('/admin/inquiries')
    },

    //edit product detail
    editInquiryForm: async (req, res, next) => {
        const id = req.params.id

        const inquiry = await Inquiry.findOne({ _id: id })
        if (!inquiry) {
            return res.status(400).json({ message: 'inquiry not found' })
        }
        // render the found category values to the edit form 
        res.render('backEnd/inquiry/editInquiry', {
            inquiry: inquiry
        })
    },

    editInquiry: async (req, res, next) => {
        const id = req.params.id
        let {
            name,
            email,
            subject,
            message
        } = req.body

        if(name == "" || email == "" || subject == "" || message == "") {
            req.flash('error_msg', 'Please fill in all the fields.')
            return res.redirect(`/admin/inquiry/edit/${id}`)
        }

        const updateInquiry = await Inquiry.updateOne({
            _id: id
        }, {
            name,
            email,
            subject,
            message
        })

        if (!updateInquiry) {
            req.flash('error_msg', 'Failed to update inquiry.')
            return res.redirect(`/admin/inquiry/edit/${id}`)
        }
        res.redirect('/admin/inquiries')
    },

    //delete product detail
    deleteInquiry: async (req, res, next) => {
        const id = req.params.id

        const deleteInquiry = await Inquiry.deleteOne({
            _id: id
        })
        if (!deleteInquiry) {
            return res.status(400).json({ message: 'delete product detail failed' })
        }
        res.redirect('/admin/inquiries')
    },

    //product detail info
    getInquiry: async (req, res, next) => {
        const id = req.params.id

        const inquiryFound = await Inquiry.findOne({
            _id: id
        })
        if (!inquiryFound) {
            return res.status(400).json({ message: 'product Detail with the id not found' })
        }

        res.render('backEnd/inquiry/inquiryDetails', {
            inquiry: inquiryFound
        })
    }


}