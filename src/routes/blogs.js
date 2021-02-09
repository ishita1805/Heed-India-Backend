const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs')


router.post('/addblog', blogsController.add_blog)
router.get('/getblog', blogsController.get_blog)
router.get('/blog/:id', blogsController.get_blogid)
router.post('/checklikes', blogsController.check_likes)
router.post('/getlikes', blogsController.get_likes)




module.exports = router