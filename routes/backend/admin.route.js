const router = require('express-promise-router')()

const adminController = require('../../controller/backend/adminController')

router.route('/')
.get(adminController.admin)

router.route('/addCustomer')
.get(adminController.addCustomerForm)
.post(adminController.addCustomer)

module.exports = router