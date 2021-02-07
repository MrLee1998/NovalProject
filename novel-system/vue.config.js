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

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api':{//此处并非一定和url一致。
//         target:'https://m.qidian.com/category/detail?catId=21&subCatId=8&gender=male',
//         changeOrigin:true,//允许跨域
//         pathRewrite:{
//           '^/api': ''
//         }
//       }
//     }
//   }
// }
