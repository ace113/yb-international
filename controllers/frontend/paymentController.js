const Category = require('../../models/category.model')
module.exports = {
    getEsewa: async(req, res, next) => {
        const findCategory = await Category.find();
        res.render('frontend/pages/esewa', { layout: 'frontend_layout', category: findCategory })
    }
}