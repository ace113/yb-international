const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')

router.route('/')
    .get(adminController.admin)

router.route('/customers')
    .get(customerCntroller.getCustomerList)

router.route('/customer/add')
    .get(customerCntroller.addCustomerForm)
    .post(customerCntroller.addCustomer)

router.route('/customer/:id')
    .get(customerCntroller.getCustomer)

router.route('/customer/edit/:id')
    .get(customerCntroller.editCustomerForm)
    .put(customerCntroller.editCustomer)
    .delete(acustomerCtroller.deleteCustomer)

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