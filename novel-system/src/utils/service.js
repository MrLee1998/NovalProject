import axios from 'axios'
// import config from './config'
// import qs from 'qs' // 序列化请求数据 服务端要求
import { Toast } from 'vant';
// import router from 'vue-router'

const service = axios.create({
  // baseURL: 'http://api.zhuishushenqi.com',
  method: 'get',
  timeout: 10000
})
service.interceptors.request.use(config => {
  return config
},
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    let data;
    if (response.data == undefined) {
      data = response.request.responseText
    } else {
      data = response.data
    }
    // data = JSON.parse(data)  //后端返回的是JSON对象   // 将后端数据格式化为JSON格式
    const message = data.msg || 'Error'
    switch (data.code) {
      case 0:
        Toast.fail({
          message,
          duration: 1000
        });
        return Promise.reject(message)
      default:
    }
    if (response) {
      return response
    }
    return data
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    return Promise.reject(err) // 返回接口返回的错误信息
  }

)

export default service