import apiLogin from './interface/login'
import apiRegister from './interface/register'
import apiCategory from './interface/category'
import apiBookinfo from './interface/bookinfo'
import apiReadbook from './interface/readbook'

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
          apiReadbook
          // ...
        )
      }
    }
  })
}

export default install