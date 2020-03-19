const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Inquiry = require('../../models/inquiry.model')

module.exports = {
    contactForm: async(req, res, next) => {
        const findCategory = await Category.find();
        const productCategory = await Category.find()

        res.render('frontend/pages/contact.front.ejs', { layout: 'frontend_layout', category: findCategory, productCategorys: productCategory })
    },

    postContactMessage: async(req, res, next) => {
        let {
            name,
            email,
            subject,
            message
        } = req.body;

        if (name == '' || email == '' || subject == '' || message == '') {
            req.flash('error_msg', 'All fields are Required')
            return res.redirect('/contact')
        }

        const newMessage = new Inquiry({
            name,
            email,
            subject,
            message
        })
        const messageSaved = await newMessage.save()
        if (!messageSaved) {
            req.flash('error_msg', "Your message has not been submitted")
            return res.redirect('/contact')
        }
        req.flash('success_msg', "Your message has been submitted")
        res.redirect('/contact')
    }

}