const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/payments')


router.post('/make-payment', paymentsController.add_payment)


module.exports = router