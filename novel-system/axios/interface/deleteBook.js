import axios from '../api.js' // axios是被封装的

const deleteBook = (data) => {
  // console.log(data);
  return axios({
    url: '/deleteBook',
    method: 'post',
    data: data
  })
}

export default {
  deleteBook
}