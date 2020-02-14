const Category = require('../../models/category.model')

module.exports = {

    // add category form
    addCategoryForm: (req, res, next) => {
        // render add category form here
    },

    // post add category function
    addCategoryForm: async (req, res, next) => {
        let { categoryName } = req.body

        const newCategory = new Category({
            categoryName
        })

        const category = await newCategory.save()
        if(!category){
            res.status(400).json({message: 'new category not added'})
        }
        res.status(200).json({success: 'new category added'})
    },


    // edit category form render
    editCategoryForm: async( req, res, next) => {
        const id = req.params.id

        const categoryFound = await Category.findOne({_id: id})
        if(!categoryFound){
            return res.status(400).json({message: 'category not found'})
        }
        // render the found category values to the edit form 
    },

    // edit category function 
    editCategory: async(req, res, next) => {
        const id = req.params.id
        let { categoryName } = req.body
        
        const updateCategory = await Category.updateOne({
            _id: id
        }, {
            categoryName
        })

        if(!updateCategory) {
            return res.status(400).json({message: 'category edit failed'})
        }
        res.status(200).json({success: 'edit category success'})
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
        res.status(200).json({success: 'delete category success'})
    },

    // list category function
    getCategoryList: async(req, res, next) => {
        const categorylist = await Category.find()
        if(!categorylist){
            return res.status(400).json({message: 'category list not found'})
        }
        // render categorylist to the category list page
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