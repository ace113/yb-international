const Page = require('../../models/pages.model')
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')


module.exports = {
    index: async(req, res, next) => {
        const findCategory = await Category.find();       
        
        res.render('frontend/index', {layout: 'frontend_layout', category: findCategory})
    },

    getProducts: async(req, res, next) => {
        const findProducts = await Product.find({}).populate('category')
        const findCategory = await Category.find();
        res.render('frontend/pages/products.front.ejs',  {layout: 'frontend_layout', products: findProducts,  category: findCategory})
    },

    getCategoryProducts: async(req, res, next) => {

        const cata = req.params.cata
        const findCategory = await Category.find();

        const productCatagoryList = await Product.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            {
                $unwind: '$category'
            },
            {
                $match: {
                    'category.cata': cata
                }
            }

        ])
        res.render('frontend/pages/products.front.ejs',  {layout: 'frontend_layout', products: productCatagoryList,  category: findCategory})
    },

    getProduct: async(req, res, next) => {
        const code = req.params.code
        const findCategory = await Category.find();
        const productinfo = await Product.findOne({productCode: code}).populate('category')
        // console.log(productinfo)
        res.render('frontend/pages/product.front.ejs',  {layout: 'frontend_layout', product: productinfo,  category: findCategory})
    }

}