const Router = require('koa-router')
const blog_controller = require('../app/controllers/blog_controller')
const router = Router()

router.post('/writeBlog', blog_controller.writeBlog)

router.post('/getBlog', blog_controller.getBlog)

router.post('/deleteBlog', blog_controller.deleteBlog)

module.exports = router
