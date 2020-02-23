const Admin = require('../../models/admin.model')
const Product = require('../../models/product.model')
const Quote = require('../../models/quote.model')
const Inquiry = require('../../models/inquiry.model')
const bcrypt = require('bcryptjs')

module.exports = {
    adminList: async (req, res, next) => {
        const admin = await Admin.find()
        if (!admin) {
            return res.status(400)
        }
        res.render('backEnd/admin/adminList', {
            admin: admin
        })
    },

    // serve admin login form 
    adminLoginForm: async (req, res, next) => {
        // check if admin exists 
        const adminexists = await Admin.find().countDocuments()

        if (adminexists == 0) {

            const username = "admin";
            const password = "admin";

            const newAdmin = new Admin({
                username: username,
                password: password,
                password2: password
            })
            const admin = await newAdmin.save()
            console.log(admin)
        }
        res.render('backEnd/login', { layout: 'authlayout' })
    },

    adminLogin: async (req, res, next) => {
        res.redirect('/admin/dashboard')
    },

    adminSignOut: async (req, res, next) => {
        req.session.destroy(function (err) {
            if (err) throw err;
            res.redirect('/admin')
        })
    },

    adminRegisterForm: async (req, res, next) => {
        res.render('backEnd/admin/admin')
    },

    adminRegister: async (req, res, next) => {
        let { username, password, password2 } = req.body;

        // check if passwords match
        const isMatch = (password == password2)
        if (!isMatch) {
            // return res.status(400).json({ message: 'Passwords do not match' })
            res.redirect('/admin/register')
        }

        const adminExists = await Admin.findOne({ username })
        if (adminExists) {
            // return res.status(400).json({ message: 'admin already exists' })
            res.redirect('/admin/register')
        }

        const newAdmin = new Admin({
            username,
            password,
        })
        const admin = await newAdmin.save()
        // res.json(admin)
        res.redirect('/admin/adminlist')
    },

    editAdmin: async (req, res, next) => {
        const id = req.params.id
        let { username, password, password2 } = req.body;
        if(password != password2){
            return res.redirect(`/admin/edit/${id}`)
        }
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password , salt)


        const updateAdmin = await Admin.updateOne({
            _id: id
        }, {
            username,
            password: hashpassword
        })

        if (!updateAdmin) {
            return res.status(400).json({ message: 'Edit admin failed' })
        }
        res.redirect('/admin')

    },
    adminEditForm: async (req, res, next) => {
        const id = req.params.id
        const findAdmin = await Admin.findOne({
            _id: id
        })
        res.render('backEnd/admin/editAdmin', {
            admin: findAdmin
        })
    },

    resetPassword: async (req, res, next) => {
        const id = req.params.id
        let { password, password2 } = req.body;

        // password reset function goes here
    },

    admin: async (req, res, next) => {
        const countProducts = await Product.find().countDocuments()
        const countQuotes = await Quote.find().countDocuments()
        const countInquiries = await Inquiry.find().countDocuments()
        
        res.render('backEnd/dashboard',{ 
            products: countProducts,
            quotes: countQuotes,
            inquiries: countInquiries
        })
    },

    deleteAdmin: async (req, res, next) => {
        const id = req.params.id

        const adminDeleted = await Admin.deleteOne({
            _id: id
        })
        if (!adminDeleted) {
            return res.redirect('/admin/adminlist')
        }
        res.redirect('/admin/adminlist')
    }
}