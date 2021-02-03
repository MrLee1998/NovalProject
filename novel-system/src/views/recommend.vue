<template>
  <div class="recommend-container">
    <Nav></Nav>
    <keep-alive>
      <div class="index-main-box">
        <div class="index-scroll-view"  ref="indexview">
          <recommend :list = 'malelist' :title="'男生推荐'"></recommend>
          <recommend :list = 'femalelist' :title="'女生推荐'"></recommend>
          <weekRecommend :newslist = 'newslist'></weekRecommend>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import Nav from "../components/nav";
import recommend from "../components/recommend/recommend";
import weekRecommend from '../components/recommend/weekRecommend'
import { getRankCategory, getRank } from "../utils/apiConfig";
import util from "../utils/util";

export default {
  components: {
    Nav,
    recommend,
    weekRecommend
  },
  data() {
    return {
      malelist: [],
      femalelist: [],
      newslist: [],
    };
  },
  created() {
    getRankCategory().then((res) => {
      console.log(res);
      let maleid = res.data.male[this.randomnum(res.data.male)]._id;
      let femaleid = res.data.female[this.randomnum(res.data.female)]._id;
      let newsid = res.data.epub[this.randomnum(res.data.epub)]._id;
      this.getbooklist(maleid, this.malelist);
      this.getbooklist(femaleid, this.femalelist);
      this.getbooklist(newsid, this.newslist);
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    randomnum(arr) {
      return parseInt(Math.random() * (arr.length - 1));
    },
    getbooklist(id, list) {
      getRank(id)
        .then((res) => {
          let books = res.data.ranking.books.slice(0, 10);
          books.forEach((book) => {
            book.cover = util.staticPath + book.cover;
            list.push(book);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
 body a{
    margin:0;
    color: #555;
  }
  ul{
    display: block;
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0;
  }
  .index-main-box{
    height: 91.6vh;
    overflow: hidden;
    padding-bottom: 25px;
  }
  .index-scroll-view{
    overflow-y: scroll;
    height:97.5%;

  }
</style>