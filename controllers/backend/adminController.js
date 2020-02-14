const Customer = require('../../models/customer.model')
module.exports = {

    admin: (req, res, next) => {
        res.render('backend/dashboard')
    },

    //customers list
    customerForm: async (req, res, next) => {
        const customers = await Customer.find({})
        res.render('backend/customers/customerList',{
            customers: customers
        })
    },

    //add customer
    addCustomerForm: (req, res, next) => {
        res.render('backend/customers/addCustomer')
    },
    addCustomer: async (req, res, next) => {
        let{
            fname,
            lname,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            country,
            password
        } = req.body

        const newCustomer = await new Customer({
            fname,
            lname,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            country,
            password
        })

        const saveCustomer = await newCustomer.save()

        if(saveCustomer){
            res.redirect('/admin/customers')
        }

    }

}