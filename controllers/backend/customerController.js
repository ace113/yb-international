const Customer = require('../../models/customer.model')

module.exports = {
    //add customer form 
    addCustomerForm: (req, res, next) => {
        res.render('backEnd/customers/addCustomer')
    },

    // edit customer form 
    editCustomerForm: async (req, res, next) => {
        const id = req.params.id

        const customerFound = await Customer.findOne({_id: id})

        res.render('backEnd/customers/editCustomer',{
            customer: customerFound
        })
        
    /* use this to render the values to the edit customer form */

  
    },

    // function to add customer
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

        const customer = await Customer.findOne({ email })
        if(customer){
           return res.json({message: "Customer is already made."})
        }

        const newCustomer = new Customer({
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

        if(!saveCustomer){
            return res.status(400).json({message: "new cusomer not saved!"})
        }
        res.redirect('/admin/customers')
    },

    // function to delete customer
    editCustomer: async (req, res, next) => {
        const id = req.params.id

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

        const editedCustomer = await Customer.updateOne({
            _id: id
        }, {
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

        if(!editedCustomer) {
            return res.status(400).json({message: 'edit customer failed'})
        }
        res.redirect('/admin/customers')
    },

    // function to delete customer
    deleteCustomer: async (req, res, next) => {
        const id = req.params.id

        const deletedCustomer = await Customer.deleteOne({
            _id: id
        })
        if(!deletedCustomer){
            return res.status(400).json({message: 'delete customer failed'})
        }
        res.redirect('/admin/customers')
    },

    // function to get the list of customer
    getCustomerList: async (req, res, next) => {

        const customerlist = await Customer.find()
        
        if(!customerlist){
            return res.status(400).json({message: 'getting customer list failed'})
        }

        res.render('backEnd/customers/customerList',{
            customers : customerlist
        })

    },

    // function to get the specific customer
    getCustomer: async (req, res, next ) => {
        const id = req.params.id
         
        const customerFound = await Customer.findOne({_id: id})

        res.render('backEnd/customers/customerInfo',{
            customer: customerFound
        })

        // render found customer to the customer info page
    }



}