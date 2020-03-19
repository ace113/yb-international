const Blog = require('../../models/blog.model')
const BlogCategory = require('../../models/blogCategory.model')

const fs = require('fs')

module.exports = {

    //category list
    categoryForm: async (req, res, next) => {
        const categorys = await BlogCategory.find()
        res.render('backEnd/blog/categoryList', {
            categorys: categorys
        })
    },

    //add category
    addCategoryForm: async (req, res, next) => {
        res.render('backEnd/blog/addCategory')
    },

    addCategory: async (req, res, next) => {
        let {
            category
        } = req.body
        if (category == "") {
            req.flash('error_msg', "Please fill the fields.")
            return res.redirect('/admin/blogs/category/add')
        }
        const categorys = await BlogCategory.findOne({ category: category })
        if (categorys) {
            req.flash('error_msg', "Category already exists.")
            return res.redirect('/admin/blogs/category/add')
        }
        const newCategory = new BlogCategory({
            category
        })
        const saveCategory = newCategory.save()
        console.log(saveCategory)
        res.redirect('/admin/blogs/categorys')
    },

    //edit status of category
    editCategory: async (req, res, next) => {
        const id = req.params.id
        const categorys = await BlogCategory.findOne({ _id: id })
        if (categorys.status === true) {
            const hideCategory = await BlogCategory.updateOne({
                _id: id
            }, {
                $set: { status: false }
            })
            console.log(hideCategory)
        }
        if (categorys.status === false) {
            const showCategory = await BlogCategory.updateOne({
                _id: id
            }, {
                $set: { status: true }
            })
            console.log(showCategory)
        }
        res.redirect('/admin/blogs/categorys')
    },

    //delete category
    deleteCategory: async (req, res, next) => {
        const id = req.params.id
        const categorys = await BlogCategory.findOne({ _id: id })
        const deleteCategory = await BlogCategory.deleteOne({
            _id: id
        })
        if (deleteCategory) {
            const deleteBlogs = await Blog.deleteMany({ category: id })
        }
        console.log(deleteCategory)
        res.redirect('/admin/blogs/categorys')
    },

    //blog list
    blogList: async (req, res, next) => {
        const blogs = await Blog.find({}).populate('category')
        res.render('backEnd/blog/blogList', {
            blogs: blogs
        })
    },

    blogInfo: async (req, res, next) => {
        const id = req.params.id
        const blog = await Blog.findOne({ _id: id })
        res.render('backEnd/blog/blogInfo', {
            blog: blog
        })
    },

    //add blog
    addBlogForm: async (req, res, next) => {
        const categorys = await BlogCategory.find()
        res.render('backEnd/blog/addBlog', {
            categorys: categorys
        })
    },

    addBlog: async (req, res, next) => {
        let {
            title,
            category,
            author,
            description
        } = req.body
        const hero = req.file != null ? req.file.path : null
        console.log(hero)
        if (title == '') {
            req.flash('error_msg', "Please provide the title.")
            return res.redirect('/admin/blog/add')
        }
        if (author == "") {
            author = "admin"
        }
        const blogs = await Blog.findOne({ title: title })
        if (blogs) {
            req.flash('error_msg', "Blog already exists.")
            return res.redirect('/admin/blog/add')
        }
        const newBlog = new Blog({
            title,
            category,
            author,
            hero,
            description
        })
        const saveBlog = await newBlog.save()
        res.redirect('/admin/blogs')
    },

    //edit blog
    editBlogForm: async (req, res, next) => {
        const id = req.params.id
        const blog = await Blog.findOne({ _id: id })
        res.render('backEnd/blog/editBlog', {
            blog: blog
        })
    },

    editBlog: async (req, res, next) => {
        const id = req.params.id
        let {
            title,
            author,
            description
        } = req.body
        if (title == '') {
            req.flash('error_msg', 'Title is required.')
            return res.redirect(`/admin/blog/edit/${id}`)
        }
        if (author == "") {
            author = "admin"
        }
        const blog = await Blog.findOne({ _id: id })
        const hero = req.file != null ? req.file.path : blog.hero
        console.log(hero)
        const updateBlog = await Blog.updateOne({
            _id: id
        }, {
            title,
            author,
            hero,
            description
        })
        console.log(updateBlog)
        res.redirect('/admin/blogs')
    },

    //delete blog
    deleteBlog: async (req, res, next) => {
        const id = req.params.id
        const blog = await Blog.findOne({ _id: id })
        const deleteBlog = await Blog.deleteOne({
            _id: id
        })
        removeImage(blog.hero)
        console.log(deleteBlog)
        res.redirect('/admin/blogs')
    },

    //edit status
    editStatus: async (req, res, next) => {
        const id = req.params.id
        const blog = await Blog.findOne({ _id: id })
        if (blog.status === true) {
            const hideBlog = await Blog.updateOne({
                _id: id
            }, {
                $set: { status: false }
            })
            console.log(hideBlog)
        }
        if (blog.status === false) {
            const showBlog = await Blog.updateOne({
                _id: id
            }, {
                $set: { status: true }
            })
            console.log(showBlog)
        }
        res.redirect('/admin/blogs')
    },

    deleteHero: async (req, res, next) => {
        const id = req.params.id
        console.log(id)
        const blog = await Blog.findOne({ _id: id })
        console.log(blog.hero)
        const removeImage1 = await Blog.updateOne({
            _id: id
        }, {
            hero: ''
        })
        console.log(removeImage1)
        removeImage(blog.hero)
        console.log('image removed')
        return res.status(200).json({ message: 'success' })
    }


}
//module ends

function removeImage(hero) {
    fs.unlink(`${hero}`, (err, stats) => {
        if (err) console.log(err);
        console.log(`stats: ${JSON.stringify(stats)}`);
    })
}