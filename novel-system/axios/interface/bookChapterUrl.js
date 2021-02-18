import axios from '../api.js' // axios是被封装的

const keepBookUrl = (data) => {
  // console.log(data);
  return axios({
    url: '/keepBookUrl',
    method: 'post',
    data: data
  })
}

export default {
  keepBookUrl
}