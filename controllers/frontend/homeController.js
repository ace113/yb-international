const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')

module.exports = {
    index: async(req, res, next) => {
        const findCategory = await Category.find();
        const findHome = await Page.findOne({ pageType: 'Home'})
        
        console.log(findHome)
        
        res.render('frontend/index', {layout: 'frontend_layout', page: findHome, category: findCategory})
    },

    quoteForm: async(req,res, next)=> {
        const findCategory = await Category.find();
        res.render('frontend/pages/quote.front.ejs',{layout: 'frontend_layout', category: findCategory})
    },

    contactForm: async(req,res, next)=> {
        const findCategory = await Category.find();
        res.render('frontend/pages/contact.front.ejs',{layout: 'frontend_layout', category: findCategory})
    }
 
}