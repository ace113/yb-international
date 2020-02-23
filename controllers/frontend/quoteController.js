const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Quote = require('../../models/quote.model')

module.exports = { 

    quoteForm: async(req,res, next)=> {
        const findCategory = await Category.find();
        res.render('frontend/pages/quote.front.ejs',{layout: 'frontend_layout', category: findCategory})
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
        if(!quoteSaved) {
            req.flash('message', "Your quote request has been submitted")
            return res.redirect('/quote')
        }
        req.flash('message', "Your quote request has been submitted")
        res.redirect('/quote')
    }
 
}