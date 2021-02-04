import  service from './service.js'
import qs from 'querystring'


export function getCategories() {
  return service({
    url: '/api/cats/lv2/statistics',
  })
}

//获取排名分类
export function getRankCategory() {
  return service({
    url: '/api/ranking/gender',
  })
}

//获取带子分类的分类
export function  getSubCategory(){
  return service({
    url: '/api/cats/lv2',
  })
}

// 获取排名详情
export function getRank(categoryid) {
  return service({
    url: '/api/ranking/' + categoryid,
  })
}

//获取分类详情
export function getCategoryInfo(category_type) {
  let query = qs.stringify(category_type);
  return service({
    url: '/api/book/by-categories?' + query,
  })
}

//获取书籍详情
export function getBookInfo(id){
  return service({
    url: '/api/book/'+id,
  })
}

//获取书籍相关推荐
export function  getRecommend(id){
  return service({
    url: '/api/book/'+id+'/recommend',
  })
}

//获取作者名下的书籍
export function getAuthorBook(author){
  let author_query = qs.stringify(author);
  return service({
    url:'/api/author-books?'+author_query,
  })
}

//获取书籍源
export function getBookSources(bookid){
  let book_source = qs.stringify(bookid);
  return service({
    url: '/api/atoc?'+book_source,
  })
}

//获取书籍章节
export function  getChapter(id){
  return service({
    url: '/api/atoc/'+id+'?view=chapters',
  })
}

//获取章节详细内容
export function getBookChapter(link){
  return service({
    url:'/content/chapter/' + link,
    // url:'http://chapterup.zhuishushenqi.com/chapter/'+link,
  })
}

//获取热搜词
export function getSearchHotwords(){
  return service({
    url: '/api/book/search-hotwords',
  })
}

//获取搜索结果
export function getSearchResult(word){
  let query = qs.stringify(word);
  return service({
    url:'/api/book/fuzzy-search?'+query,
  })
}