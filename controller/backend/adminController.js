const Customer = require('../../models/customer.model')
module.exports = {

    admin: (req, res, next) => {
        res.render('backend/dashboard')
    },

    //add customer
    addCustomerForm: (req, res, next) => {
        res.render('backend/customers/customer')
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

        const customer = await Customer.find({})
        if(customer){
            res.json({message: "Customer is already made."})
        }

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

    }

}