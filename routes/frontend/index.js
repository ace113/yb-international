const express = require('express')
const router = require('express-promise-router')();

const homeController = require('../../controllers/frontend/homeController')
const contactController = require('../../controllers/frontend/contactController')
const productController = require('../../controllers/frontend/productController')
const quoteController = require('../../controllers/frontend/quoteController')

router.route('/')
.get(homeController.index)

router.route('/products')
.get(productController.getProducts)

router.route('/products/:cata')
.get(productController.getCategoryProducts)

router.route('/products/:cata/:code')
.get(productController.getProduct)

router.route('/quote')
.get(quoteController.quoteForm)
.post(quoteController.postQuote)

router.route('/contact')
.get(contactController.contactForm)
.post(contactController.postContactMessage)

router.route('/about')
.get(homeController.getAbout)

module.exports = router;