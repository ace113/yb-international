const Product = require('../../models/product.model')
const ProductDetail = require('../../models/productDetail.model')

module.exports = {

    //product detail 
    productDetail: async (req, res, next) => {
        const productDetails = await ProductDetail.find({})
        res.render('backend/products/productDetail/productDetailList', {
            productDetails: productDetails
        })
    },

    //add product detail
    addProductDetailFrom: async(req, res, next) => {
        const products = await Product.find()
        res.render('backend/products/productDetail/addProductDetail', {
            products: products
        })
    },

    addProductDetail:async (req, res, next) => {
        let{
            productTitle,
            description,
            gallery,
            product
        } = req.body

        const newProductDetail = await new ProductDetail({
            productTitle,
            description,
            gallery,
            product
        })

        const productDetail = await newProductDetail.save()
        if(!productDetail){
            res.status(400).json({message: 'new product detail not added'})
        }
        res.redirect('/admin/product/productDetail')
    },

    //edit product detail
    editProductDetailForm: async(req,res,next) => {
        const id = req.params.id

        const productDetail = await ProductDetail.findOne({_id: id})
        if(!productDetail){
            return res.status(400).json({message: 'product detail not found'})
        }
        // render the found category values to the edit form 
        res.render('backend/products/productDetail/editProductDetail',{
            productDetail: productDetail
        })
    },

    editProductDetail: async(req, res, next) => {
        const id = req.params.id
        let {
            productTitle,
            description,
            gallery 
        } = req.body
        
        const updateProductDetail = await ProductDetail.updateOne({
            _id: id
        }, {
            productTitle,
            description,
            gallery 
        })

        if(!updateProductDetail) {
            return res.status(400).json({message: 'product detail edit failed'})
        }
        res.redirect('/admin/product/productDetail')
    },

    //delete product detail
    deleteProductDetail: async(req,res,next)=> {
        const id = req.params.id
        
        const deleteProductDetail = await ProductDetail.deleteOne({
            _id: id
        })
        if(!deleteProductDetail){
            return res.status(400).json({message: 'delete product detail failed'})            
        }
        res.redirect('/admin/product/productDetail')
    },

    //product detail info
    getProductDetail: async(req,res,next)=> {
        const id = req.params.id

        const productDetailFound = await ProductDetail.findOne({
            _id: id
        })
        if(!productDetailFound) {
            return res.status(400).json({message: 'product Detail with the id not found'})
        }

        res.render('backend/products/productDetail/productDetailInfo',{
            productDetail: productDetailFound
        })
    }


}