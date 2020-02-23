const express = require('express')
const router = require('express-promise-router')();

const homeController = require('../../controllers/frontend/homeController')
const productController = require('../../controllers/frontend/productController')

router.route('/')
.get(homeController.index)

router.route('/products')
.get(productController.getProducts)

router.route('/products/:cata')
.get(productController.getCategoryProducts)

router.route('/products/:cata/:code')
.get(productController.getProduct)

router.route('/quote')
.get(homeController.quoteForm)

router.route('/contact')
.get(homeController.contactForm)

router.route('/about')
.get(homeController.getAbout)

module.exports = router;