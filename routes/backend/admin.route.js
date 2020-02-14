const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')
const categoryController = require('../../controllers/backend/categoryController')

router.route('/')
    .get(adminController.admin)

// Customer Routes start 
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

// customer route ends


// product category route starts

router.route('/product/categorys')
    .get(categoryController.getCategoryList)

router.route('/product/category/add')
    .get(categoryController.getCategoryForm)
    .post(categoryController.addCategory)

router.route('/product/category/:id')
    .get(customerController.getCategory)

router.route('/customer/edit/:id')
    .get(customerController.editCategoryForm)
    .put(customerController.editCategory)
    .delete(customerController.deleteCategory)

// product category route ends

// product route starts

router.route('/products')
    .get(productController.getProducts)

router.route('/products/add')
    .get(productController.addProductForm)
    .post(productController.addProduct)

router.route('/product/:id')
    .get(productController.getProduct)

router.route('/product/edit/:id')
    .get(productController.editProductForm)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

// product route ends

module.exports = router