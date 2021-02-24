const User_col = require('../models/user')
const Password_col = require('../models/password')
const CollectBook_col = require('../models/collectBook')
const ReadBookUrl_col = require('../models/readBookUrl')
const passport = require('../utils/passport')
const { v1: uuidv1 } = require('uuid')
const config = require('../../config')
const getCategory = require('../public/utils/getCategory')
const getBookInfo = require('../public/utils/getBookInfo')
const getBookContent = require('../public/utils/getBookContent')
const { url } = require('koa-router')

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
  if (!user) {
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

const mybook = async (ctx) => {
  // let url = ctx.request.body.bookInfo.url
  // console.log(ctx.request.body);
  let userId = ctx.request.body.userId
  let bookInfo = ctx.request.body.bookInfo
  const findUserId = await CollectBook_col.find({
    userId
  })
  // console.log(findUserId.length);
  let len = findUserId.length
  if (len == 0) {
    const addBook = await CollectBook_col.create({
      userId,
      bookInfo
    })
    if (addBook) {
      ctx.body = {
        code: 1,
        msg: '加入成功',
        data: addBook
      }
    }
  } else {
    const findBookInfo = await CollectBook_col.findOne({
      bookInfo: bookInfo
    })
    // console.log(newBook);
    if (findBookInfo) {
      return ctx.body = {
        code: 1,
        msg: '已经在书架了',
        data: findBookInfo
      }
    } else {
      let data = await CollectBook_col.update({
        userId: userId
      }, {
        $push: {
          bookInfo
        }
      }
      )
      return ctx.body = {
        code: 1,
        msg: '加入成功',
        data: data
      }
    }
  }
}

const getmybook = async (ctx) => {
  let userId = ctx.request.body.userId
  const mybook = await CollectBook_col.find({
    userId
  })
  // console.log(mybook);
  if (!mybook) {
    ctx.body = {
      code: 1,
      msg: '书架为空',
      data: mybook
    }
  }
  if (mybook) {
    ctx.body = {
      code: 1,
      msg: 'success',
      data: mybook
    }
  }
}

const category = async (ctx) => {
  // let req = this.$route.query
  console.log(1);
  let url = ctx.request.body.url
  // let data = []
  await getCategory.getCategoryList(url).then(res => {
    // console.log(res);
    ctx.body = {
      code: 1,
      msg: 'success',
      data: res
    }
  })
}

const bookinfo = async (ctx) => {
  let url = ctx.request.body.url
  console.log(url);
  await getBookInfo.getBookInfo(url).then(res => {
    ctx.body = {
      code: 1,
      msg: 'success',
      data: res
    }
  })
}

const readbook = async (ctx) => {
  let url = ctx.request.body.url
  console.log(url);
  await getBookContent.getBookContent(url).then(res => {
    ctx.body = {
      code: 1,
      msg: 'success',
      data: res
    }
  })
}

//  保存小说章节记录
const keepBookUrl = async (ctx) => {
  let userId = ctx.request.body.userId
  // let readChapterUrl = ctx.request.body.bookUrl.readChapterUrl
  let bookUrl = ctx.request.body.bookUrl
  // console.log(readChapterUrl);
  const findUserId = await ReadBookUrl_col.find({
    userId: userId
  })
  // console.log(findUserId);
  let len1 = findUserId.length
  if (len1 != 0) {
    const findBookUrl = await ReadBookUrl_col.find({
      bookUrl: bookUrl
    })
    // console.log(findUserId);
    let len2 = findBookUrl.length
    if (len2 != 0) {
      return ctx.body = {
        code: 1,
        msg: '书本url已经存在了',
        data: findBookUrl
      }
    } else {
      const addBookUrl = await ReadBookUrl_col.update({
        userId: userId
      }, {
        $push: {
          bookUrl
        }
      })
      console.log(addBookUrl);
      return ctx.body = {
        code: 1,
        msg: '书本url添加成功了',
        data: addBookUrl
      }
    }
  } else {
    const addNewBookUrl = await ReadBookUrl_col.create({
      userId,
      bookUrl
    })
    if (addNewBookUrl) {
      return ctx.body = {
        code: 1,
        msg: '添加成功',
        data: addNewBookUrl
      }
    }
  }
}

//查找相应书架中书本的读书进度
const getBookUrl = async (ctx) => {
  console.log(ctx.request.body);
  let userId = ctx.request.body.userId
  let bookUrl = ctx.request.body.url
  const findUserId = await ReadBookUrl_col.findOne({
    userId: userId
  })
  if (findUserId) {
    // console.log(findUserId.bookUrl);
    let data;
    findUserId.bookUrl.forEach((item) => {
      if (bookUrl == item.url) {
        data = item
      }
    })
    ctx.body = {
      code: 1,
      message: '获取成功',
      data: data
    }
  }

}

//  更新读书进度
const updateBookUrl = async (ctx) => {
  console.log(ctx.request.body.bookUrl);
  let userId = ctx.request.body.userId
  let bookUrl = ctx.request.body.bookUrl
  let url = ctx.request.body.bookUrl.url
  const findUserId = await ReadBookUrl_col.findOne({
      userId: userId
  })
  let findIndex;
  findUserId.bookUrl.forEach((item, index) => {
    if(item.url == url) {
      findIndex =  index
    }
  })
  const data = await ReadBookUrl_col.update({
    userId: userId,   
  },{
    $pull: {
      bookUrl: findUserId.bookUrl[findIndex]
    }
  })
  if(data) {
    const updateRes = await ReadBookUrl_col.update({
      userId: userId,   
    },{
      $push: {
        bookUrl: bookUrl
      }
    })
    console.log(updateRes);
    ctx.body = {
    code: 1,
    message: '1',
    data: updateRes
  }
  }
  
}
module.exports = {
  login,
  register,
  category,
  bookinfo,
  readbook,
  mybook,
  getmybook,
  keepBookUrl,
  getBookUrl,
  updateBookUrl
}