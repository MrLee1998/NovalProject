const cheerio = require('cheerio')
const charset = require('superagent-charset')
const superagent = require('superagent')
// const fs = require('fs')
charset(superagent);
// let url = '/book/29013/'
function getBookInfo(url) {
  return new Promise((resolve, reject) => {
    let newChapter = []
    let allChapter = []
    superagent.get(`https://m.zwdu.com${url}`).charset('gbk').end((err, res) =>{
      if(err) {
        reject(err)
      }
      let data = res.text || ''
      const $ = cheerio.load(data)
      let book = $('.cover')
      let temp = $(book).find('.block').find('.block_txt2').find('p')
      let update = $(temp[5]).text()
      let readBookUrl = $(book).find('.ablum_read').find('.margin_right').find('a').attr('href')
      let newChapterLen = $(book).find('.chapter-list-new').find('.chapter-list').find('li')
      for(let i = 0; i < newChapterLen.length; i++){
        let newChapterData = {}
        newChapterData['title'] = $(newChapterLen[i]).find('a').attr('title')
        newChapterData['chapterUrl'] = $(newChapterLen[i]).find('a').attr('href')
        newChapter.push(newChapterData)
      }
      let allChapterLen = $(book).find('.chapter-list-all').find('.chapter-list').find('li')
      for(let j = 0; j < allChapterLen.length; j++){
        let allChapterData = {}
        allChapterData['title'] = $(allChapterLen[j]).find('a').text()
        allChapterData['chapterUrl'] = $(allChapterLen[j]).find('a').attr('href')
        allChapter.push(allChapterData)
      }
      let pre = $(book).find('.listpage').find('.left').find('a').attr('href') || ''
      let next = $(book).find('.listpage').find('.right').find('a').attr('href')

      let pageArrayLen = $(book).find('.listpage').find('.middle').find('select').find('option')
      let pageArray = []
      for(let k = 0; k < pageArrayLen.length; k++) {
        let pageArrayData = {}
        pageArrayData['chapterUrl'] = $(pageArrayLen[k]).attr('value')
        pageArrayData['chapterNum'] = $(pageArrayLen[k]).text()
        pageArray.push(pageArrayData)
      }
      resolve({
        newChapterData: newChapter,
        allChapterData: allChapter,
        pre: pre,
        next: next,
        pageArray: pageArray,
        update: update,
        readBookUrl: readBookUrl
      })
    })
  })
}
// getBookInfo(url).then(res => {
//   console.log(res);
// })

module.exports = {
  getBookInfo
}