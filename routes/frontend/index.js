const express = require('express')
const router = require('express-promise-router')();

const homeController = require('../../controllers/frontend/homeController')
const contactController = require('../../controllers/frontend/contactController')
const productController = require('../../controllers/frontend/productController')
const quoteController = require('../../controllers/frontend/quoteController')
const termsController = require('../../controllers/frontend/termsController')
const paymentController = require('../../controllers/frontend/paymentController')
const queryController = require('../../controllers/frontend/query')
const blogController = require('../../controllers/frontend/blogController')

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


router.route('/terms')
    .get(termsController.getTerms)

router.route('/esewa')
    .get(paymentController.getEsewa)

// query product
// router.route('/query/form')
//     .get(queryController.getQueryForm)
router.route('/query')
    .get(queryController.getQueryForm)

router.route('/blog')
    .get(blogController.getBlogs)


module.exports = router;