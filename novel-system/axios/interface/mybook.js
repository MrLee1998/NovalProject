import axios from '../api.js' // axios是被封装的

const mybook = (data) => {
  // console.log(data);
  return axios({
    url: '/mybook',
    method: 'post',
    data: data
  })
}

export default {
  mybook
}