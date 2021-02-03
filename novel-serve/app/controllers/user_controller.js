const User_col = require('../models/user')
const Password_col = require('../models/password')
// const CollectBook_col = require('../models/collectBook')
const passport = require('../utils/passport')
const { v1: uuidv1 } = require('uuid')
const config = require('../../config')

// 登录
const login = async (ctx) => {
  let req = ctx.request.body
  console.log(req);
  // 连接数据库， 去数据库查找是否存在该条数据
  //查找语句
  // 获取用户的userId
  const user = await User_col.findOne({
    account: req.username
  })
  if(!user) {
    ctx.status = 200
    ctx.body = {
      code: 0,
      msg: '账号不存在'
    }
    return
  }

  // 找的到账号
  const userId = user.userId
  // 查找密码
  const pwd = await Password_col.findOne({
    userId
  }, {
    password: 1
  })
  // 如果在密码表里找到了账号相同的Id
  // 判断该id对应的密码和前端传过来的密码是否匹配
  // 解密
  const match = await passport.validate(req.password, pwd.password)

  ctx.status = 200
  if (match) {
    ctx.body = {
      code: 1,
      msg: '登陆成功',
      data: user
    }
    return;
  }
  ctx.body = {
    code: 0, 
    msg: '密码错误!'
  }
}

// 注册
const register = async (ctx) => {
  let req = ctx.request.body
  const user = await User_col.findOne({
    account: req.username
  })
  ctx.status = 200
  if (user) {
    ctx.body = {
      code: 0,
      msg: '帐号已存在!'
    }
    return;
  }
  // 插入新用户
  const userId = uuidv1()
  const newUser = await User_col.create({
    userId,
    account: req.username
  })
  if (newUser) {
    // 密码的插入
    const hash = await passport.encrypt(req.password, config.saltTimes)
    const result = await Password_col.create({
      userId: userId,
      password: hash
    })
    // console.log(result);
    if (result) {
      ctx.body = {
        code: 1,
        msg: '注册成功',
        data: {
          userId: newUser.userId,
          account: newUser.account
        }
      }
    }
  }

}
module.exports = {
  login,
  register
}