const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contacts')


router.post('/connect', contactsController.create_query)
router.get('/getContacts', contactsController.get_contacts)

module.exports = router