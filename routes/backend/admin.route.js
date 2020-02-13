const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const productController = require('../../controllers/backend/productController')

router.route('/')
    .get(adminController.admin)

router.route('/addCustomer')
    .get(adminController.addCustomerForm)
    .post(adminController.addCustomer)

router.route('/product')
    .get(productController.getProducts)

router.route('/product/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

router.route('/products/add')
    .get(productController.addProductForm)
    .post(productController.addProduct)

module.exports = router