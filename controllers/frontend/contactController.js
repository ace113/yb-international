const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Inquiry = require('../../models/inquiry.model')

module.exports = {   
    contactForm: async(req,res, next)=> {
        const findCategory = await Category.find();
        res.render('frontend/pages/contact.front.ejs',{layout: 'frontend_layout', category: findCategory})
    },
 
    postContactMessage: async(req, res, next) => {
        let {
            name,
            email,
            subject,
            message
        } = req.body;

        const newMessage = new Inquiry({
            name,
            email,
            subject,
            message
        })
        const messageSaved = await newMessage.save()
        if(!messageSaved) {
            req.flash('message', "Your message has been submitted")
            return res.redirect('/contact')
        }
        req.flash('message', "Your message has been submitted")
        res.redirect('/contact')
    }
 
}