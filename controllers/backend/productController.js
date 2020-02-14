const Product = require('../../models/product.model')
const Category = require('../../models/category.model')

module.exports = {

    //add product form
    addProductForm: async (req, res, next) => {
        const categorys = await Category.find()
        res.render('backend/products/addProduct',{
            categorys: categorys
        })
    },

    // insert new products to the database
    addProduct: async (req, res, next) => {
        let {
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category
        } = req.body

        const newProduct = new Product({
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category
        })
        const productAdded = await newProduct.save()
        if (!productAdded) {
            return res.status(400).json({ message: 'Add new product failed!' })
        }
        res.redirect('/admin/products')

    },


    // get specific product
    getProduct: async (req, res, next) => {
        const id = req.params.id
        const productsFound = await Product.findOne({_id: id})

        if (!productsFound) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.render('backend/products/productInfo', {
            product: productsFound
        })
    },



    // get product list
    getProducts: async (req, res, next) => {
        const products = await Product.find({})

        if (!products) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.render('backend/products/productsList',{
            products: products
        })
    },

    // edit product form render
    editProductForm: async( req, res, next) => {
        const id = req.params.id

        const productFound = await Product.findOne({_id: id})
        if(!productFound){
            return res.status(400).json({message: 'product not found'})
        }
        res.render('backend/products/editProduct',{
            product: productFound
        })
        // render the found product values to the edit form 
    },

    // edit product information
    editProduct: async (req, res, next) => {
        const id = req.params.id
        let {
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category
        } = req.body
        console.log(id)

        
        const editProduct = await Product.updateOne({
            _id: id
        }, {
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category
        })

        if (!editProduct) {
            return res.status(400).json({ message: 'product edit failed' })
        }
        res.redirect('/admin/products')
    },

    // deleteProduct
    deleteProduct: async(req, res, next) => {
        const id = req.params.id

        const delProduct = await Product.deleteOne({
            _id: id
        })
        if (!delProduct) {
            return res.status(400).json({ message: 'product delete failed' })
        }
        res.redirect('/admin/products')
    }

}