const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Quote = require('../../models/quote.model')

module.exports = {

    quoteForm: async(req, res, next) => {
        const findCategory = await Category.find();
        res.render('frontend/pages/quote.front.ejs', { layout: 'frontend_layout', category: findCategory })
    },



    postQuote: async(req, res, next) => {
        let {
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        } = req.body;

        if (email == '' || phone == '' || product == '' || quantity == '') {
            req.flash('error_msg', 'Please fill in all required fields')
            return res.redirect('/quote')
        }

        const newQuote = new Quote({
            name,
            email,
            phone,
            product,
            productCode,
            quantity,
            requirements,
            packingDetails,
            callMe
        })
        const quoteSaved = await newQuote.save()
        if (!quoteSaved) {
            req.flash('error', "Something went wrong")
            return res.redirect('/quote')
        }
        req.flash('success_msg', "Your quote request has been submitted")
        res.redirect('/quote')
    }

}