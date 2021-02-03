<template>
  <div class="book-about">
    <h3>相关推荐</h3>
    <ul class="book-about-box">
      <li v-for="book in recommend" :key="book._id">
        <router-link :to="'/bookinfo/' + book._id">
          <img :src="book.cover" />
          <p>{{ book.title }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRecommend } from "../../utils/apiConfig";
import util from "../../utils/util";

export default {
  data() {
    return {
      recommend: [],
    };
  },
  created() {
    this.getrecommend();
  },
  watch:{
		'$route.params': 'getrecommend'
	},
  methods: {
    getrecommend() {
      this.recommend = [];
      getRecommend(this.$route.params.bookid)
        .then((res) => {
          console.log(res);
          // let books = res.data.books
          res.data.books.forEach((book, index) => {
            if (index < 4 && index > 0) {
              book.cover = util.staticPath + book.cover;
              this.recommend.push(book);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.book-about {
  padding-bottom: 10px;
}
.book-about > h3 {
  padding: 5px 10px;
  font-weight: 400;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
}
.book-about-box {
  font-size: 0;
  padding: 10px 14px 0;
}
.book-about-box > li {
  display: inline-block;
  width: 33.3%;
}
.book-about-box > li a {
  display: inline-block;
  color: #555;
  font-size: 14px;
  height: 117px;
  width: 86px;
  border-radius: 4px;
  box-shadow: 0 5px 10px #555;
}
.book-about-box > li p {
  text-align: left;
  line-height: 2.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-about-box > li:nth-child(3n + 1) {
  text-align: left;
}
.book-about-box > li:nth-child(3n + 2) {
  text-align: center;
}
.book-about-box > li:nth-child(3n + 3) {
  text-align: right;
}
.book-about-box > li img {
  height: 100%;
  width: 100%;
}
</style>