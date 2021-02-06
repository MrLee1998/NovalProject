const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = require('superagent')
const fs = require('fs')
charset(superagent);


function getList() {
  return new Promise((resolve, reject) => {
    let category = []
    // let baseUrl =  `/api${url}`
    superagent.get('https://m.zwdu.com/sort.html').charset('gbk').end((err, res) =>{
      if(err) {
        reject(err)
      }
      // console.log(res.text);
      let data = res.text || ''
      const $ = cheerio.load(data)
      let categoryList = $('.content').find('ul').find('li')
      for(let i = 0; i < categoryList.length; i++) {
        let obj = {}
        obj['title'] = $(categoryList[i]).find('a').text()
        obj['url'] = $(categoryList[i]).find('a').attr('href')
        category.push(obj)
      }
      category = JSON.stringify(category)
      fs.writeFile('app/public/static/category.json', category, err => {
        if(err) {
          console.log(err);
          return console.log('写入失败');
        }
        console.log('成功写入文件')
      })
      resolve(category)
    })
  })
}

// getList().then(res => {
//   console.log(res);
// })
module.exports = {
  getList
}