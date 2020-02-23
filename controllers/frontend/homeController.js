const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')


module.exports = {
    index: async(req, res, next) => {
        const findCategory = await Category.find();
        // const findHome = await Page.findOne({ pageType: 'Home'})      
 
        res.render('frontend/index', {layout: 'frontend_layout', category: findCategory})
    },

  

    getAbout: async(req, res, next) => {
        const findCategory = await Category.find();
        res.render('frontend/pages/about.front.ejs',{layout: 'frontend_layout', category: findCategory})
    }  
 
}