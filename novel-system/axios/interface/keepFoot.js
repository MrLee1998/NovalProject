import axios from '../api.js' // axios是被封装的

const keepFoot = (data) => {
  // console.log(data);
  return axios({
    url: '/keepFoot',
    method: 'post',
    data: data
  })
}

export default {
  keepFoot
}