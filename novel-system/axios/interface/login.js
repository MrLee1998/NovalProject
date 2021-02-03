import axios from '../api.js' // axios是被封装的

const login = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export default {
  login
}