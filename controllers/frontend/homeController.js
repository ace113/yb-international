const blogCategory = require('../../models/blogCategory.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')


module.exports = {
    index: async(req, res, next) => {
        const findCategory = await Category.find();

        const findBlog = await blogCategory.find();

        res.render('frontend/index', { layout: 'frontend_layout', category: findCategory, blogs: findBlog })
    },



    getAbout: async(req, res, next) => {
        const findCategory = await Category.find();
        res.render('frontend/pages/about.front.ejs', { layout: 'frontend_layout', category: findCategory })
    }

}