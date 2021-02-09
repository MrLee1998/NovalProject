import axios from '../api.js' // axios是被封装的

const readbook = (data) => {
  // console.log(data);
  return axios({
    url: '/readbook',
    method: 'post',
    data: data
  })
}

export default {
  readbook
}