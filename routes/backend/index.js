const router = require('express-promise-router')();
const productController = require('../../controllers/backend/productController')

router.route('/')
    .get((req, res) => res.send('admin home'))

router.route('/product/')
    .get(productController.getProducts)

router.route('/product/:id')
    .get(productController.getProduct)
    .put(productController.editProduct)
    .delete(productController.deleteProduct)

router.route('/product/add')
    .post(productController.addProduct)


module.exports = router;