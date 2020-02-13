const Product = require('../../models/product.model')

module.exports = {

    //add product form
    addProductForm: (req, res, next) => {
        res.render('backend/products/addProduct')
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
            catagory
        } = req.body

        const newProduct = new Product({
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            catagory
        })
        const productAdded = await newProduct.save()
        if (!productAdded) {
            return res.status(400).json({ message: 'Add new product failed!' })
        }
        res.status(200).json({ 'product': productAdded })

    },


    // get specific product
    getProduct: async (req, res, next) => {
        const id = req.params.id
        const productsFound = await Product.findOne({_id: id})

        if (!productsFound) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.status(200).json(productsFound)
    },



    // get product list
    getProducts: async (req, res, next) => {
        const productsFound = await Product.find({})

        if (!productsFound) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.status(200).json(productsFound)
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
            catagory
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
            catagory
        })

        if (!editProduct) {
            return res.status(400).json({ message: 'product edit failed' })
        }
        res.status(200).json({success: 'edit successful'})
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
        res.status(200).json({success: 'delete successful'})
    }

}