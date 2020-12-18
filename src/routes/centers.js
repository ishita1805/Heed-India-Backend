const express = require('express')
const router = express.Router()
const centerController = require('../controllers/centers')


router.post('/create', centerController.create_center);
router.get('/getcenter', centerController.get_center);   
router.get('/find/:name', centerController.find_center);
    
    


module.exports = router