// module.exports = {
//   devServer: {
//     port: 8080,
//     proxy: {
//       '/api': {
//         target: 'http://api.zhuishushenqi.com',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': '/api'
//         }
//       }
//     },
    
//   }
// }

module.exports = {
  devServer: {
    proxy: {
      '/api':{//此处并非一定和url一致。
        target:'http://api.zhuishushenqi.com',
        changeOrigin:true,//允许跨域
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  }
}
