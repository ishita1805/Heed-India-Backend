const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs')


router.post('/addblog', blogsController.add_blog)
router.get('/getblog', blogsController.get_blog)
router.post('/checklikes', blogsController.check_likes)



module.exports = router