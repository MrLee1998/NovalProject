import Vue from 'vue'
import Router from 'vue-router'
import BookStack from '../views/bookStack.vue'
import Recommend from '../views/recommend.vue'
import Rank from '../views/rank.vue'
import Classfy from '../views/classfy.vue'
import Login from '../views/login.vue'

Vue.use(Router)

export default new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/bookStack',
      name: 'BookStack',
      component: BookStack,
      meta:{
        showTab:true
      }
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta:{
        showTab:true
      }
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      meta:{
        showTab:true
      }
    },
    {
      path: '/classfy',
      name: 'classfy',
      component: Classfy,
      meta:{
        showTab:true
      }
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
      path: '/ranklist/:rankid',
      name: 'ranklist',
      component: () => import('../components/RankList/RankList.vue'),
      meta:{
        title: '排行列表',
        showTab:true
      }
    },
    {
      path: '/categorylist',
      name: 'categorylist',
      component: () => import('../components/category/CategoryList.vue'),
      meta:{
        title: '分类列表',
        showTab:true
      }
    },
    {
      path: '/bookinfo/:bookid',
      name: 'bookinfo',
      component: () => import('../components/pages/bookinfo.vue'),
      meta:{
        title: '分类列表',
        showTab:true
      }
    },
    {
      path:'/reader/:bookid',
      name:'reader',
      component: () => import('../components/readerPages/reader.vue'),
      meta:{
        title: '分类列表',
        showTab:true
      }
    }

  ]
})