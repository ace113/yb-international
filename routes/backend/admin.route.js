const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const productController = require('../../controllers/backend/productController')

router.route('/')
    .get(adminController.admin)

router.route('/customers')
    .get(adminController.customerForm)

router.route('/customers/add')
    .get(adminController.addCustomerForm)
    .post(adminController.addCustomer)

router.route('/products')
    .get(productController.getProducts)

router.route('/product/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

router.route('/products/add')
    .get(productController.addProductForm)
    .post(productController.addProduct)

module.exports = router