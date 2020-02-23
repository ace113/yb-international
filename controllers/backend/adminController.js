const Admin = require('../../models/admin.model')
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
        res.render('backEnd/dashboard')
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
        let { username } = req.body;

        const updateAdmin = await Admin.updateOne({
            _id: id
        }, {
            username
        })

        if (!updateAdmin) {
            return res.status(400).json({ message: 'Edit admin failed' })
        }

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

    admin: (req, res, next) => {
        res.render('backEnd/dashboard')
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