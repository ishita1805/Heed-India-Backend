const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/payments')


router.post('/make-payment', paymentsController.make_payment)
router.post('/verification', paymentsController.verification)
router.get('/get-payments', paymentsController.payments)

module.exports = router