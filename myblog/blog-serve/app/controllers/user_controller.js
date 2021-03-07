// const passport = require('../utils/passport')
const { v1: uuidv1 } = require('uuid')
// const config = require('../../config')
const User_col = require('../models/user')


//  登录
const login = async (ctx) => {
  let res = ctx.request.body
  let email = res.email
  let password = res.password
  console.log(email);
  console.log(password);
  const user = await User_col.findOne({
    email: email
  }) 
  console.log(user);
  if(user == null) {
    ctx.body = {
      code: 1,
      message: 'success',
      data: user
    }
  } else {
    ctx.body = {
      code: 1,
      message: 'success',
      data: user
    }
  }
}

// 注册
const register = async (ctx) => {
  let res = ctx.request.body
  let email = res.email
  let nickName = res.nickName
  let password = res.password
  const user = await User_col.findOne({
    email: email
  })
  if(user == null) {
    const userId = uuidv1()
    const newUser = await User_col.create({
      userId: userId,
      email: email,
      nickName: nickName,
      password: password
    })
    ctx.body = {
      code: 1,
      message: 'success',
      data: newUser
    }
  } else {
    ctx.body = {
      code: 1,
      message: '用户名已注册',
      data: user
    }
  }
}
module.exports = {
  login,
  register
}