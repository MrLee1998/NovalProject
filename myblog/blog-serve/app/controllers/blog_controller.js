// const passport = require('../utils/passport')
const { v1: uuidv1 } = require('uuid')
// const config = require('../../config')
const Blog_col = require('../models/blog')

//  写博客
const writeBlog = async (ctx) => {
  let res = ctx.request.body
  console.log(res);
  let id = res.id
  if(id) {
    console.log(id);
    const blog = await Blog_col.findByIdAndUpdate( id,
    {
      title: res.title,
      content: res.content,
      time: res.time,
      tag: res.tag,
    }
    )
    ctx.body = {
      code: 1,
      message: 'success',
      data: blog
    }
  } else {
    const blog = await Blog_col.create(res)
    ctx.body = {
    code: 1,
    message: 'success',
    data: blog
    }
  }  
}

//  获取博客
const getBlog = async (ctx) => {
  let res = ctx.request.body
  // console.log(res);
  let id = res.id
  // console.log(id);
  if(id) {
    const blog = await Blog_col.findOne({
      _id: id
    }) 
    ctx.body = {
      code: 1,
      message: 'success',
      data: blog
    }
  } else {
    const blog = await Blog_col.find()
    ctx.body = {
      code: 1,
      message: 'success',
      data: blog
    }
  }
}

const deleteBlog = async (ctx) => {
  let res = ctx.request.body
  let id = res.id
  const allBlog = await Blog_col.find()
  const blog = await Blog_col.findOne({
    _id: id
  })
  let idx = 0
  allBlog.forEach((item, index) => {
    if(item._id == id) {
      idx = index
    }
  })
  
  const temp = await Blog_col.remove({
    _id: id
  }
  )
  console.log(temp);
  ctx.body = {
    code: 1,
    message: 'success',
    data: '1'
  }
}
module.exports = {
  writeBlog,
  getBlog,
  deleteBlog
}