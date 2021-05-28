const express = require('express')
const router = express.Router()
const pagesController = require('../controllers/pages')
const statsController = require('../controllers/stats')
const cardsController = require('../controllers/cards')
const donorController = require('../controllers/donors')


router.post('/create', pagesController.createPage)
router.post('/get', pagesController.getPage)
router.post('/update', pagesController.updatePage)
router.post('/createStat', statsController.createStat)
router.post('/updateStat', statsController.updateStat)
router.post('/deleteStat', statsController.deleteStat)
router.post('/createCard', cardsController.createCard)
router.post('/updateCard', cardsController.updateCard)
router.post('/deleteCard', cardsController.deleteCard)
router.post('/createDonor', donorController.createDonor)
router.post('/updateDonor', donorController.updateDonor)
router.post('/deleteDonor', donorController.deleteDonor)

module.exports = router