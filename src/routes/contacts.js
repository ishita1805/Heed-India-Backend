const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contacts')


router.post('/connect', contactsController.create_query)


module.exports = router