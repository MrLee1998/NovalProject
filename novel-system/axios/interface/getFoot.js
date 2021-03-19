import axios from '../api.js' // axios是被封装的

const getFoot = (data) => {
  // console.log(data);
  return axios({
    url: '/getFoot',
    method: 'post',
    data: data
  })
}

export default {
  getFoot
}