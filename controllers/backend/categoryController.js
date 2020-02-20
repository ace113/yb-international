const Category = require('../../models/category.model')

module.exports = {

    // add category form
    getCategoryForm: (req, res, next) => {
        // render add category form here
        res.render('backend/products/categorys/addCategory')
    },

    // post add category function
    addCategory: async (req, res, next) => {
        let { categoryName } = req.body
        const cata = genCata(categoryName)
        const newCategory = new Category({
            categoryName,
            cata
        })

        const category = await newCategory.save()
        if(!category){
            res.status(400).json({message: 'new category not added'})
        }
        res.redirect('/admin/product/categories')
    },


    // edit category form render
    editCategoryForm: async( req, res, next) => {
        const id = req.params.id

        const categoryFound = await Category.findOne({_id: id})
        if(!categoryFound){
            return res.status(400).json({message: 'category not found'})
        }
        // render the found category values to the edit form 
        res.render('backend/products/categorys/editCategory',{
            category: categoryFound
        })
    },

    // edit category function 
    editCategory: async(req, res, next) => {
        const id = req.params.id
        let { categoryName } = req.body

        const cata = genCata(categoryName)
        
        const updateCategory = await Category.updateOne({
            _id: id
        }, {
            categoryName,
            cata
        })

        if(!updateCategory) {
            return res.status(400).json({message: 'category edit failed'})
        }
        res.redirect('/admin/product/categories')
    },

    // delete category function
    deleteCategory: async(req, res, next) => {
        const id = req.params.id
        
        const deleteCategory = await Category.deleteOne({
            _id: id
        })
        if(!deleteCategory){
            return res.status(400).json({message: 'delete category failed'})            
        }
        res.redirect('/admin/product/categories')
    },

    // list category function
    getCategoryList: async(req, res, next) => {
        const categorylist = await Category.find()
        if(!categorylist){
            return res.status(400).json({message: 'category list not found'})
        }
        // render categorylist to the category list page
        res.render('backend/products/categorys/categoryList',{
            categorys: categorylist
        })
    },

    getCategory: async (req, res, next) => {
        const id = req.params.id

        const categoryFound = await Category.findOne({
            _id: id
        })
        if(!categoryFound) {
            return res.status(400).json({message: 'category with the id not found'})
        }

        // if found render it to the category info
    }
    
}


// cata function

function genCata(name) {
   var namesplit=  name.split(" ")
    var cata = namesplit.join("-")
    return cata;
}