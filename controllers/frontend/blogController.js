const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Blog = require('../../models/blog.model')


module.exports = {
    getBlogs: async(req, res, next) => {
        const blogList = await Blog.find();
        const findCategory = await Category.find();

        res.render('frontend/pages/blog.front.ejs', { layout: 'frontend_layout', category: findCategory, blogList: blogList })
    }
}