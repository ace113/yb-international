const Product = require('../../models/product.model')
const Category = require('../../models/category.model')
module.exports = {
    getQueryForm: async(req, res, next) => {
        res.render('frontend/pages/query')
    },
    getQuery: async(req, res, next) => {
        let searchOptions = {}
        const findCategory = await Category.find();
        const options = await Product.find()
        if (req.query.search != null && req.query.name != '') {
            searchOptions.localName = new RegExp(req.query.search, 'i')

        }
        const products = await Product.find(searchOptions)

        console.log(options)
        res.render('frontend/pages/query', {
            layout: 'frontend_layout',
            options: options,
            products: products,
            searchOptions: req.query,
            category: findCategory
        })
    }
}