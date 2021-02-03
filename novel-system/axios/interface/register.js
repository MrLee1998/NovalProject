import axios from '../api.js'

const register = (data) => {
  return axios({
    url: '/register',
    method: 'post',
    data
  })
}

export default {
  register
}