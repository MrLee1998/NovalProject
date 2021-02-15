import axios from '../api.js' // axios是被封装的

const getmybook = (data) => {
  // console.log(data);
  return axios({
    url: '/getmybook',
    method: 'post',
    data: data
  })
}

export default {
  getmybook
}