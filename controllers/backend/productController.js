const Product = require('../../models/product.model')
const Category = require('../../models/category.model')
const Gallery = require('../../models/gallery.model')
const fs = require('fs')
const path = require('path')

module.exports = {

    //add product form
    addProductForm: async(req, res, next) => {
        const categorys = await Category.find()
        res.render('backEnd/products/addProduct', {
            categorys: categorys
        })
    },

    // insert new products to the database
    addProduct: async(req, res, next) => {
        let {
            // avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            // productCode,
            category,
            pricing,
            offers,
            details
        } = req.body
        const avatar = req.file != null ? req.file.path : null
            // console.log('avatar:',avatar)

        const productCode = generateProductCode()

        const newProduct = new Product({
            avatar,
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category,
            pricing,
            offers,
            details
        });
        try {
            const product = await newProduct.save()
            if (!product) {
                return res.status(400).json({ message: 'Add new product failed!' })
            }
            res.redirect('/admin/products')
        } catch (error) {
            if (newProduct.avatar != null) {
                await removeAvatar(newProduct.avatar)
                console.log(newProduct.avatar)
            }
            // res.redirect('/admin/product/add')
        }


    },


    // get specific product
    getProduct: async(req, res, next) => {
        const id = req.params.id
        const productsFound = await Product.findOne({ _id: id }).populate('category')

        const gallery = await Gallery.find({ product: id })

        if (!productsFound) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.render('backEnd/products/productInfo', {
            product: productsFound,
            gallery: gallery
        })
    },



    // get product list
    getProducts: async(req, res, next) => {
        const products = await Product.find({}).populate('category')

        if (!products) {
            return res.status(400).json({ message: 'product get request failed' })
        }
        res.render('backEnd/products/productsList', {
            products: products
        })
    },

    // edit product form render
    editProductForm: async(req, res, next) => {
        const id = req.params.id

        const productFound = await Product.findOne({ _id: id })
        if (!productFound) {
            return res.status(400).json({ message: 'product not found' })
        }
        res.render('backEnd/products/editProduct', {
                product: productFound
            })
            // render the found product values to the edit form 
    },

    // edit product information
    editProduct: async(req, res, next) => {
        const id = req.params.id
        let {
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category,
            pricing,
            offers,
            details
        } = req.body
        const avatar = req.file != null ? req.file.path : null
        console.log(id)


        const editProduct = await Product.updateOne({
            _id: id
        }, {
            localName,
            scientificName,
            nepaliName,
            available,
            productCode,
            category,
            pricing,
            offers,
            details
        })

        if (!editProduct) {
            return res.status(400).json({ message: 'product edit failed' })
        }
        res.redirect('/admin/products')
    },


    // deleteProduct
    deleteProduct: async(req, res, next) => {
        const id = req.params.id
        const product = await Product.findOne({ _id: id })
        const delProduct = await Product.deleteOne({
            _id: id
        })
        if (!delProduct) {
            return res.status(400).json({ message: 'product delete failed' })
        }
        removeAvatar(product.avatar)
        res.redirect('/admin/products')
    },

    // add images to gallery form
    getAddGalleryForm: async(req, res, next) => {
        res.render('backend/products/addGallery')
    },

    addGallery: async(req, res, next) => {
        let { product } = req.body;
        // const image = req.file.path
        const imag = req.files.map((img, index = _id) => {
            return img.path
        })
        const i = imag.length;

        for (j = 0; j < i; j++) {
            const add = {
                image: imag[j],
                product
            }
            const gallery = await Gallery.insertMany(add)

        }
    },

    // uploading images to the gallery 
    uploadGallery: async(req, res, next) => {
        const id = req.params.id;


        // const imag = req.files.map((img, index = _id) => {
        //     return img.path
        // })
        // const i = imag.length;

        // for (j = 0; j < i; j++) {
        //     const add = 
        //         {             
        //             image: imag[j]  
        //         }

        //         const addImages = await Product.updateOne({
        //             _id: id
        //         }, {
        //             $push: { gallery: add }
        //         })
        // }

        const imag = req.files.map(async(img, index = _id) => {
            const image = { image: img.path }

            const addImages = await Product.updateOne({
                _id: id
            }, {
                $push: { gallery: image }
            })
        })

    },
    deleteImageGallery: async(req, res, next) => {
        const gallery_id = req.params.gid
        const id = req.params.id
            // console.log('gallery id:', gallery_id)
        console.log('id', id)

        const product = await Product.findOne({ _id: id });
        console.log(product)
        const image_path = await product.gallery.id(gallery_id).image
        console.log(image_path)
        const remov = await product.gallery.id(gallery_id).remove();
        removeImage(image_path)
        product.save((err) => {
            if (err) throw err;
            console.log('removed')
        })
        res.redirect(`/admin/product/${id}`)
    },

    viewGallery: async(req, res, next) => {
        const id = req.params.id;

        const product = await Product.findOne({
            _id: id
        })

        const gallery = product.gallery.image
        console.log(gallery)
        res.render('backEnd/products/gallery', {
            gallery: gallery
        })
    }


}

// function to delete the selected avatar from the uploads folder
function removeAvatar(avatar) {
    fs.unlink(`${avatar}`, (err, stats) => {
        if (err) console.log(err);
        console.log(`stats: ${JSON.stringify(stats)}`);
    })
}

// function to delete the selected image from the uploads folder
function removeImage(image) {
    fs.unlink(`${image}`, (err, stats) => {
        if (err) console.log(err);
        console.log(`stats: ${JSON.stringify(stats)}`)
    })
}

// generate random product code
function generateProductCode() {
    return 'YNB' + Math.floor(1000 + Math.random() * 9000)
}