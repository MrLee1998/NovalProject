import axios from '../api.js' // axios是被封装的

const category = (data) => {
  return axios({
    url: '/cats/lv2/statistics',
    method: 'get',
    data
  })
}

export default {
  category
}