const Router = require('koa-router')
const user_controller = require('../../app/controllers/user_controller')
const router = Router()

router.post('/login', user_controller.login)
  // 拿到前端传过来的数据， 去数据库匹配是否存在

router.post('/register', user_controller.register)

router.post('/category', user_controller.category)

router.post('/bookinfo', user_controller.bookinfo)

router.post('/readbook', user_controller.readbook)

router.post('/mybook', user_controller.mybook)

router.post('/getmybook', user_controller.getmybook)

router.post('/keepBookUrl', user_controller.keepBookUrl)

module.exports = router