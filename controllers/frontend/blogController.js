const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Blog = require('../../models/blog.model')
const BlogCategory = require('../../models/blogCategory.model')


module.exports = {
    getBlogs: async(req, res, next) => {
        const blogList = await Blog.find();
        const findCategory = await BlogCategory.find();
        const productCategory = await Category.find()

        res.render('frontend/pages/blog.front.ejs', { layout: 'frontend_layout', categorys: findCategory, blogs: blogList, productCategorys: productCategory })
    }
}