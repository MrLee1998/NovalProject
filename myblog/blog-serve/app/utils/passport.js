// // 密码的加密解密函数
// const bcrypt = require('bcrypt')
// const password = require('../models/password')

// // 加密
// const encrypt = async (password, saltTimes) => {
//   const hashPwd = await bcrypt.hash(password, saltTimes)
//   return hashPwd
// }

// // 解密比较
// const validate = async (password, hashPwd) => {
//   const math = await bcrypt.compare(password, hashPwd)
//   return math
// }

// module.exports = {
//   encrypt,
//   validate
// }