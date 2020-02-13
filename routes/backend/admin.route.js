const express = require('express')
const route = express.Router()

const Admin = require('../controller/adminController')

router.route('/')
.get(adminController.admin)

router.route('/addcustomer')
.get(adminController.addCustomerForm)
.post(adminController.addCustomer)