import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login.vue'
import category from '../views/category.vue'

Vue.use(Router)

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
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
    }
  ]
})