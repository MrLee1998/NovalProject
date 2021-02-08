import axios from '../api.js' // axios是被封装的

const bookinfo = (data) => {
  // console.log(data);
  return axios({
    url: '/bookinfo',
    method: 'post',
    data: data
  })
}

export default {
  bookinfo
}