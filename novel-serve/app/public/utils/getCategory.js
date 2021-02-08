const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = require('superagent')
// const fs = require('fs')
charset(superagent);


function getCategory() {
  return new Promise((resolve, reject) => {
    let category = []
    superagent.get('https://m.zwdu.com/sort.html').charset('gbk').end((err, res) =>{
      if(err) {
        reject(err)
      }
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

function getCategoryList(url) {
  return new Promise((resolve, reject) => {
    let category = []
    superagent.get(`https://m.zwdu.com${url}`).charset('gbk').end((err, res) =>{
      if(err) {
        reject(err)
      }
      let data = res.text || ''
      const $ = cheerio.load(data)
      let categoryList = $('.bookbox')
      for(let i = 0; i < categoryList.length; i++) {
        let obj = {}
        obj['img'] = $(categoryList[i]).find('.bookimg').find('a').find('img').attr('src')
        obj['url'] = $(categoryList[i]).find('.bookimg').find('a').attr('href')
        obj['author'] = $(categoryList[i]).find('.bookinfo').find('.author').text()
        obj['title'] = $(categoryList[i]).find('.bookinfo').find('.bookname').find('.iTit').find('a').text()
        obj['lastChapter'] = $(categoryList[i]).find('.bookinfo').find('.update').find('a').attr('href')
        obj['lastChapterTitle'] = $(categoryList[i]).find('.bookinfo').find('.update').find('a').text()
        obj['introduce'] = $(categoryList[i]).find('.bookinfo').find('.intro_line').text()
        category.push(obj)
      }
      // category = JSON.stringify(category)
      // fs.writeFile('app/public/static/categoryList.json', category, err => {
      //   if(err) {
      //     console.log(err);
      //     return console.log('写入失败');
      //   }
      //   console.log('成功写入文件')
      // })
      resolve(category)
    })
  })
}
// getCategoryList().then(res => {
//   console.log(res);
// })
module.exports = {
  getCategory,
  getCategoryList
}