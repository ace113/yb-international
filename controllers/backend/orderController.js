const Order = require('../../models/order.model')
const Product = require('../../models/product.model')
const Customer = require('../../models/customer.model')

module.exports = {

    //order list
    orderList: async(req, res, next) => {
        const orders = await Order.find({})
        res.render('backEnd/orders/orderList', {
            orders: orders
        })
    },

    //add order
    addOrderForm: async(req, res, next) => {
        const products = await Product.find()
        const customers = await Customer.find()
        res.render('backEnd/orders/addOrder', {
            products, customers
        })
    },

    addOrder: async(req, res, next) => {
        let{
            quantity,
            productId,
            customerId
        } = req.body
        if(quantity == ""){
            req.flash('error_msg', "Please provide the quantity.")
            return res.redirect('/admin/order/add')
        }

        const newOrder = await new Order({
            quantity,
            productId,
            customerId
        })

        const order = await newOrder.save()
        if(!order){
            res.json('message: "Failed to order"')
        }
        res.redirect('/admin/orders')
    },

    //edit order
    editOrderForm: async(req, res, next) => {
        const id = req.params.id

        const order = await Order.findOne({_id: id})
        if(!order){
            return res.status(400).json({message: 'order not found'})
        }
        // render the found category values to the edit form 
        res.render('backEnd/orders/editOrder',{
            order: order
        })
    },

    editOrder:async (req, res, next) => {
        const id = req.params.id
        let { quantity } = req.body
        if(quantity == ""){
            req.flash('error_msg', "Please provide the quantity.")
            return res.redirect(`/admin/order/edit/${id}`)
        }
        const updateOrder = await Order.updateOne({
            _id: id
        }, {
            quantity
        })

        if(!updateOrder) {
            return res.status(400).json({message: 'order edit failed'})
        }
        res.redirect('/admin/orders')
    },

    //delete order
    deleteOrder: async(req, res, next) => {
        const id = req.params.id
        
        const deleteOrder = await Order.deleteOne({
            _id: id
        })
        if(!deleteOrder){
            return res.status(400).json({message: 'delete order failed'})            
        }
        res.redirect('/admin/orders')
    }



}