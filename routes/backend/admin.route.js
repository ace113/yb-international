const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')

router.route('/')
    .get(adminController.admin)

router.route('/customers')
    .get(customerController.getCustomerList)

router.route('/customer/add')
    .get(customerController.addCustomerForm)
    .post(customerController.addCustomer)

router.route('/customer/:id')
    .get(customerController.getCustomer)

router.route('/customer/edit/:id')
    .get(customerController.editCustomerForm)
    .put(customerController.editCustomer)
    .delete(customerController.deleteCustomer)

router.route('/products')
    .get(productController.getProducts)

router.route('/products/add')
    .get(productController.addProductForm)
    .post(productController.addProduct)

router.route('/product/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

module.exports = router