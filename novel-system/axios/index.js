import apiLogin from './interface/login'
import apiRegister from './interface/register'
import apiCategory from './interface/category'
import apiBookinfo from './interface/bookinfo'
import apiReadbook from './interface/readbook'
import apiMybook from './interface/mybook'
import apiGetbookinfo from './interface/getmybook'
import apiKeepBookUrl from './interface/bookChapterUrl'
import apiGetBookUrl from './interface/getBookChapterUrl'
import apiUpdateBookUrl from './interface/updateBookUrl'

const install = Vue => {   // vue 中 use 方法 只能识别installl 
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return Object.assign(
          {},
          apiLogin,
          apiRegister,
          apiCategory,
          apiBookinfo,
          apiReadbook,
          apiMybook,
          apiGetbookinfo,
          apiKeepBookUrl,
          apiGetBookUrl,
          apiUpdateBookUrl
          // ...
        )
      }
    }
  })
}

export default install