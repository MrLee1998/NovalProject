import axios from '../api.js' // axios是被封装的

const getBookUrl = (data) => {
  // console.log(data);
  return axios({
    url: '/getBookUrl',
    method: 'post',
    data: data
  })
}

export default {
  getBookUrl
}