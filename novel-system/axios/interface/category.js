import axios from '../api.js' // axios是被封装的

const category = (data) => {
  // console.log(data);
  return axios({
    url: '/category',
    method: 'post',
    data: data
  })
}

export default {
  category
}