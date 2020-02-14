const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')
const categoryController = require('../../controllers/backend/categoryController')
const productDetailController = require('../../controllers/backend/productDetailController')

// admin auth routes start
router.route('/')
    .get(adminController.adminLoginForm)
    .post(adminController.adminLogin)

router.route('/register')
    .post(adminController.adminRegister)

router.route('/edit/:id')
    .put(adminController.editAdmin)

router.route('/reset-password/:id')
    .put(adminController.resetPassword)
    // #### note: add nodemailer function to recover the password if lost

router.route('/dashboard')
    .get(adminController.admin)

// Customer Routes starts 
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
    .get(categoryController.getCategory)

router.route('/product/category/edit/:id')
    .get(categoryController.editCategoryForm)
    .put(categoryController.editCategory)
    .delete(categoryController.deleteCategory)

// product category route ends

//product detail route starts

router.route('/product/productDetail')
.get(productDetailController.productDetail)

router.route('/product/productDetail/add')
.get(productDetailController.addProductDetailFrom)
.post(productDetailController.addProductDetail)

router.route('/product/productDetail/:id')
.get(productDetailController.getProductDetail)

router.route('/product/productDetail/edit/:id')
.get(productDetailController.editProductDetailForm)
.put(productDetailController.editProductDetail)
.delete(productDetailController.deleteProductDetail)

//product detail route ends

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

//product route ends

//order route starts

//order route ends


module.exports = router