const blogCategory = require('../../models/blogCategory.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const Page = require('../../models/pages.model')
const Banner = require('../../models/banner.model')


module.exports = {
    index: async (req, res, next) => {
        const findCategory = await Category.find();
        const productCategory = await Category.find()
        const banners = await Banner.find()
        const findBlog = await blogCategory.find();
        const page = await Page.findOne({ pageType: 'Home' })
        res.render('frontend/index', {
            layout: 'frontend_layout',
            category: findCategory,
            blogs: findBlog,
            page: page,
            productCategorys: productCategory,
            banners: banners
        })
    },



    getAbout: async (req, res, next) => {
        const findCategory = await Category.find();
        const page = await Page.findOne({ pageType: 'About Us' })
        const productCategory = await Category.find()
        res.render('frontend/pages/about.front.ejs', {
            layout: 'frontend_layout',
            category: findCategory,
            page: page,
            productCategorys: productCategory
        })
    }

}