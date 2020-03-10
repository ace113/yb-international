const router = require('express-promise-router')()
const upload = require('../../helpers/multer')

const adminController = require('../../controllers/backend/adminController')
const customerController = require('../../controllers/backend/customerController')
const productController = require('../../controllers/backend/productController')
const orderController = require('../../controllers/backend/orderController')
const categoryController = require('../../controllers/backend/categoryController')
const productDetailController = require('../../controllers/backend/productDetailController')
const pageController = require('../../controllers/backend/pageController')
const inquiryController = require('../../controllers/backend/inquiryController')
const quoteController = require('../../controllers/backend/quoteController')
    // const testimonialController = require('../../controllers/backend/testimonialController')

const passport = require('passport')

// admin auth routes start
router.route('/')
    .get(adminController.adminLoginForm)
    .post(passport.authenticate('local', { session: true, failureFlash: true, failureRedirect: '/admin' }), adminController.adminLogin)

router.route('/register')
    .get(checkAuthenticated, adminController.adminRegisterForm)
    .post(checkAuthenticated, adminController.adminRegister)

router.route('/adminlist')
    .get(checkAuthenticated, adminController.adminList)

router.route('/edit/:id')
    .get(checkAuthenticated, adminController.adminEditForm)
    .put(checkAuthenticated, adminController.editAdmin)
    .delete(checkAuthenticated, adminController.deleteAdmin)

router.route('/reset-password/:id')
    .put(checkAuthenticated, adminController.resetPassword)
    // #### note: add nodemailer function to recover the password if lost

router.route('/signout')
    .get(checkAuthenticated, adminController.adminSignOut)


// admin auth routes end


// inquiry routes start 
router.route('/inquiries')
    .get(checkAuthenticated, inquiryController.getInquiryList)

router.route('/inquiry/add')
    .get(checkAuthenticated, inquiryController.addInquiryFrom)
    .post(checkAuthenticated, inquiryController.addInquiry)

router.route('/inquiry/:id')
    .get(checkAuthenticated, inquiryController.getInquiry)

router.route('/inquiry/edit/:id')
    .get(checkAuthenticated, inquiryController.editInquiryForm)
    .put(checkAuthenticated, inquiryController.editInquiry)
    .delete(checkAuthenticated, inquiryController.deleteInquiry)
    // inquiry routes end

// quote routes start 
router.route('/quotes')
    .get(checkAuthenticated, quoteController.getQuoteList)

router.route('/quote/add')
    .get(checkAuthenticated, quoteController.addQuoteFrom)
    .post(checkAuthenticated, quoteController.addQuote)

router.route('/quote/:id')
    .get(checkAuthenticated, quoteController.getQuote)

router.route('/quote/edit/:id')
    .get(checkAuthenticated, quoteController.editQuoteForm)
    .put(checkAuthenticated, quoteController.editQuote)
    .delete(checkAuthenticated, quoteController.deleteQuote)
    // quote routes end


// // pages routes start 
router.route('/pages')
    .get(checkAuthenticated, pageController.getPageList)

router.route('/page/add')
    .get(checkAuthenticated, pageController.addPageForm)
    .post(checkAuthenticated, pageController.addPage)

router.route('/page/:id')
    .get(checkAuthenticated, pageController.getPage)

router.route('/page/edit/:id')
    .get(checkAuthenticated, pageController.editPageForm)
    .put(checkAuthenticated, pageController.editPage)
    .delete(checkAuthenticated, pageController.deletePage)
    // pages routes end

router.route('/dashboard')
    .get(checkAuthenticated, adminController.admin)


// Customer Routes starts 
router.route('/customers')
    .get(checkAuthenticated, customerController.getCustomerList)

router.route('/customer/add')
    .get(checkAuthenticated, customerController.addCustomerForm)
    .post(checkAuthenticated, customerController.addCustomer)

router.route('/customer/:id')
    .get(customerController.getCustomer)

router.route('/customer/edit/:id')
    .get(checkAuthenticated, customerController.editCustomerForm)
    .put(checkAuthenticated, customerController.editCustomer)
    .delete(checkAuthenticated, customerController.deleteCustomer)

// customer route ends


// product category route starts

router.route('/product/categories')
    .get(checkAuthenticated, categoryController.getCategoryList)

router.route('/product/category/add')
    .get(checkAuthenticated, categoryController.getCategoryForm)
    .post(checkAuthenticated, categoryController.addCategory)

router.route('/product/category/:id')
    .get(checkAuthenticated, categoryController.getCategory)

router.route('/product/category/edit/:id')
    .get(checkAuthenticated, categoryController.editCategoryForm)
    .put(checkAuthenticated, categoryController.editCategory)
    .delete(checkAuthenticated, categoryController.deleteCategory)

// product category route ends

//product detail route starts

router.route('/product/productDetail')
    .get(checkAuthenticated, productDetailController.productDetail)

router.route('/product/productDetail/add')
    .get(checkAuthenticated, productDetailController.addProductDetailFrom)
    .post(checkAuthenticated, productDetailController.addProductDetail)

router.route('/product/productDetail/:id')
    .get(checkAuthenticated, productDetailController.getProductDetail)

router.route('/product/productDetail/edit/:id')
    .get(checkAuthenticated, productDetailController.editProductDetailForm)
    .put(checkAuthenticated, productDetailController.editProductDetail)
    .delete(checkAuthenticated, productDetailController.deleteProductDetail)

//product detail route ends

// product route starts

router.route('/products')
    .get(checkAuthenticated, productController.getProducts)

router.route('/products/add')
    .get(checkAuthenticated, productController.addProductForm)
    .post(checkAuthenticated, upload.single('avatar'), productController.addProduct)
router.route('/product/gallery')
    .get(productController.getAddGalleryForm)
    .post(upload.array('image'), productController.addGallery)

router.route('/product/:id')
    .get(checkAuthenticated, productController.getProduct)

router.route('/product/edit/:id')
    .get(checkAuthenticated, productController.editProductForm)
    .put(checkAuthenticated, upload.single('avatar'), productController.editProduct)
    .delete(checkAuthenticated, productController.deleteProduct)



router.route('/product/gallery/delete/:id/:gid')
    .delete(productController.deleteImageGallery)

router.route('/product/gallery/:id')
    .get(productController.viewGallery)
    .put(upload.array('image'), productController.uploadGallery)

//product route ends

//order route starts

router.route('/orders')
    .get(checkAuthenticated, orderController.orderList)

router.route('/order/add')
    .get(checkAuthenticated, orderController.addOrderForm)
    .post(checkAuthenticated, orderController.addOrder)

router.route('/order/:id')

router.route('/order/edit/:id')
    .get(checkAuthenticated, orderController.editOrderForm)
    .put(checkAuthenticated, orderController.editOrder)
    .delete(checkAuthenticated, orderController.deleteOrder)

//order route ends

// pages routes start 
// router.route('/testimonials')
//     .get(checkAuthenticated,testimonialController.getTestimonialList)

// router.route('/testimonial/add')
//     .get(checkAuthenticated,testimonialController.addTestimonialForm)
//     .post(checkAuthenticated,testimonialController.addTestimonial)

// router.route('/testimonial/:id')
//     .get(checkAuthenticated,testimonialController.getTestimonial)

// router.route('/testimonial/edit/:id')
//     .get(checkAuthenticated,testimonialController.editTestimonialForm)
//     .put(checkAuthenticated,testimonialController.editTestimonial)
//     .delete(checkAuthenticated,testimonialController.deleteTestimonial)
// pages routes end







module.exports = router;

function checkAuthenticated(req, res, next) {
    // console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'Need to log in to access resources')
    res.redirect('/admin')
}