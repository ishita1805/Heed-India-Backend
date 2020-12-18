const express = require('express')
const router = express.Router()
const letterController = require('../controllers/newsletter')


router.post('/email', letterController.newsLetter)


module.exports = router