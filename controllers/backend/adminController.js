const Admin = require('../../models/admin.model')
const bcrypt = require('bcryptjs')

module.exports = {

    // serve admin login form 
    adminLoginForm: async (req, res, next) => {
        res.render('backend/login', { layout: 'authlayout' })
    },

    adminLogin: async (req, res, next) => {        
        res.render('backend/dashboard')
    },

    adminSignOut: async(req, res, next) => {
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/admin')
        })
    },

    adminRegister: async (req, res, next) => {
        let { username, password, password2 } = req.body;

        // check if passwords match
        const isMatch = (password == password2)
        if (!isMatch) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const adminExists = await Admin.findOne({ username })
        if (adminExists) {
            return res.status(400).json({ message: 'admin already exists' })
        }

        const newAdmin = new Admin({
            username,
            password,
        })
        const admin = await newAdmin.save()
        res.json(admin)
    },

    editAdmin: async (req, res, next) => {
        const id = req.params.id
        let { username } = req.body;

        const updateAdmin = await Admin.updateOne({
            _id: id
        }, {
            username
        })

        if(!updateAdmin) {
            return res.status(400).json({message: 'Edit admin failed'})
        }

    },

    resetPassword: async(req, res, next) => {
        const id = req.params.id
        let { password, password2 } = req.body;

        // password reset function goes here
    },

    admin: (req, res, next) => {        
        res.render('backend/dashboard')
    }
}