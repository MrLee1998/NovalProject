import axios from '../api.js' // axios是被封装的

const updateBookUrl = (data) => {
  // console.log(data);
  return axios({
    url: '/updateBookUrl',
    method: 'post',
    data: data
  })
}

export default {
  updateBookUrl
}