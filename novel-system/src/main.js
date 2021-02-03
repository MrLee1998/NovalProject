import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index'
import './assets/common.css'
import  Vant from 'vant';
import 'vant/lib/index.css';
import api from '../axios/index.js'
// import axios from 'axios'


Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(api)
// Vue.use(axios);
// Vue.prototype.$axios = axios;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
