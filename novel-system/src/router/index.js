import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import category from '../views/category.vue'
import mybook from '../views/mybook.vue'
import recommend from '../views/recommend.vue'
import foot from '../views/foot.vue'

Vue.use(Router)

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/login',
      name: 'login',
      // component: () => import('../views/login.vue'),
      component: Login,
      meta:{
        title: '登录',
        showTab:true
      }
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/mybook',
      name: 'mybook',
      component: mybook
    },
    {
      path: '/foot',
      name: 'foot',
      component: foot
    },
    {
      path: '/categoryList',
      name: 'categoryList',
      component: () => import('../components/categoryList.vue'),
      // component: Login,
    },
    {
      path: '/bookinfo',
      name: 'bookinfo',
      component: () => import('../components/bookinfo.vue'),
      // component: Login,
    },
    {
      path: '/readbook',
      name: 'readbook',
      component: () => import('../components/readBook.vue'),
      // component: Login,
    }
  ]
})