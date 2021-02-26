const express = require('express')
const router = express.Router()
const supportController = require('../controllers/supports')

router.post('/supportdata',supportController.post_support)
router.get('/supportdata',supportController.get_support)

module.exports = router

