const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Blog = require('../../models/blog.model')
const BlogCategory = require('../../models/blogCategory.model')


module.exports = {
    getBlogs: async (req, res, next) => {
        const blogList = await Blog.find()
        const findCategory = await BlogCategory.find()
        const productCategory = await Category.find()

        res.render('frontend/pages/blog.front.ejs', {
            layout: 'frontend_layout',
            categorys: findCategory,
            blogs: blogList,
            productCategorys: productCategory
        })
    },

    getGroups: async (req, res, next) => {
        const id = req.params.id
        const blogList = await Blog.find({category: id})
        const allBlogs = await Blog.find()
        const findCategory = await BlogCategory.find()
        const productCategory = await Category.find()
        res.render('frontend/pages/blogs/groupBlogs.front.ejs', {
            layout: 'frontend_layout',
            categorys: findCategory,
            blogs: blogList,
            allBlogs : allBlogs,
            productCategorys: productCategory

        })
    },

    getSingleBlog: async(req, res, next) => {
        const id = req.params.id
        const findBlog = await Blog.findOne({_id: id})
        const blogList = await Blog.find()
        const findCategory = await BlogCategory.find()
        const productCategory = await Category.find()
        res.render('frontend/pages/blogs/singleBlog.front.ejs', {
            layout: 'frontend_layout',
            categorys: findCategory,
            blog: findBlog,
            blogs: blogList,
            productCategorys: productCategory

        })
    }
}