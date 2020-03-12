const Category = require('../../models/category.model')

module.exports = {
    getPaymentModes: async(req, res, next) => {
        const category = await Category.find()
        res.render('frontend/pages/payment.front.ejs', { layout: 'frontend_layout', category: category})
    }
    
}