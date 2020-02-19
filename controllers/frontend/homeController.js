const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')

module.exports = {
    index: async(req, res, next) => {
        const findCategory = await Category.find();
        
        
        res.render('frontend/index', {layout: 'frontend_layout', category: findCategory})
    },

    quoteForm: async(req,res, next)=> {
        const findCategory = await Category.find();
        res.render('frontend/pages/quote.front.ejs',{layout: 'frontend_layout', category: findCategory})
    }
 
}