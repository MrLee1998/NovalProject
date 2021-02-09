const Koa = require('koa')
const cors = require('koa2-cors'); // 解决跨域
const bodyParser = require('koa-bodyparser') // 帮助koa解析参数
const user_router = require('./routes/api/user_router')
const mongoose = require('mongoose')
const config = require('./config')

const app = new Koa()

// 建立mongdb的连接
mongoose.connect(config.db,{
  useNewUrlParser: true
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true
}, (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('connecting database successfully');
  }
})

app.use(cors())
app.use(bodyParser())
app.use(user_router.routes())


app.listen(3000)