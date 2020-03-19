const Category = require('../../models/category.model')
module.exports = {
    getTerms: async (req, res, next) => {
        const category = await Category.find()
        const productCategory = await Category.find()
        res.render('frontend/pages/terms.front.ejs', {
            layout: 'frontend_layout',
             category: category,
             productCategorys: productCategory
            })
    }
}