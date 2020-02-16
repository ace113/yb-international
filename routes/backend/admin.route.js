const router = require('express-promise-router')()

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')
const orderController = require('../../controllers/backend/orderController')
const categoryController = require('../../controllers/backend/categoryController')
const productDetailController = require('../../controllers/backend/productDetailController')
const pageController = require('../../controllers/backend/pageController')
const testimonialController = require('../../controllers/backend/testimonialController')

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

    
// admin auth routes end

// pages routes start 
router.route('/pages')
    .get(pageController.getPageList)

router.route('/page/add')
    .get(pageController.addPageForm)
    .post(pageController.addPage)

router.route('/page/:id')
    .get(pageController.getPage)

router.route('/page/edit/:id')
    .get(pageController.editPageForm)
    .put(pageController.editPage)
    .delete(pageController.deletePage)
// pages routes end

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

router.route('/orders')
.get(orderController.orderList)

router.route('/order/add')
.get(orderController.addOrderForm)
.post(orderController.addOrder)

router.route('/order/:id')

router.route('/order/edit/:id')
.get(orderController.editOrderForm)
.put(orderController.editOrder)
.delete(orderController.deleteOrder)

//order route ends

// pages routes start 
router.route('/testimonials')
    .get(testimonialController.getTestimonialList)

router.route('/testimonial/add')
    .get(testimonialController.addTestimonialForm)
    .post(testimonialController.addTestimonial)

router.route('/testimonial/:id')
    .get(testimonialController.getTestimonial)

router.route('/testimonial/edit/:id')
    .get(testimonialController.editTestimonialForm)
    .put(testimonialController.editTestimonial)
    .delete(testimonialController.deleteTestimonial)
// pages routes endTestimonialmodule.exports = router