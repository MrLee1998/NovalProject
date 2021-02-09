const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = require('superagent')
// const fs = require('fs')
charset(superagent);
// let url = '/book/47876/21439214.html'
function getBookContent(url) {
  return new Promise((resolve, reject) => {
    superagent.get(`https://m.zwdu.com${url}`).charset('gbk').end((err, res) =>{
      if(err) {
        reject(err);
      }
      let data = res.text || ''
      const $ = cheerio.load(data)
      let title = $('.nr_title').text()
      let bookContent = $('.nr_nr').find('#nr1').text()
      let preChapter = $('.reader_page').find('table').find('tr').find('.prev').find('a').attr('href')
      let nextChapter = $('.reader_page').find('table').find('tr').find('.next').find('a').attr('href')
      resolve({
        title: title,
        bookContent: bookContent,
        preChapter: preChapter,
        nextChapter: nextChapter
      })
    })
  })
}
// getBookContent(url).then(res => {
//   console.log(res);
// })


module.exports = {
  getBookContent
}