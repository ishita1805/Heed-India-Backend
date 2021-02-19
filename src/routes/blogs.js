const express = require('express')
const router = express.Router()
const blogsController = require('../controllers/blogs')


router.post('/addblog', blogsController.add_blog)
router.post('/likeStatus',blogsController.set_like_status)
router.get('/getblog', blogsController.get_blog)
router.get('/blog/:id', blogsController.get_blogid)

module.exports = router