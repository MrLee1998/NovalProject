<template>
  <div class="rankList category-book-view">
    <HeadBack :title="title"></HeadBack>
    <div id="rankList-item">
      <ul class="category-book" v-for="book in rankList" :key="book._id">
        <router-link :to="{ name: 'bookinfo', params: { bookid: book._id }}">
          <div class="category-book-cover">
            <img :src="book.cover" alt="" />
          </div>
          <div class="category-book-msg">
            <h3 class="category-book-title">{{ book.title }}</h3>
            <p class="category-list-author">
              {{ book.author }}<span class="category-col-line">|</span
              >{{ book.majorCate }}
            </p>
            <p>{{ book.shortIntro }}</p>
            <p class="category-book-star">
              {{ book.latelyFollower }}人在追<span class="category-col-line"
                >|</span
              >{{ book.retentionRatio }}%留存
            </p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import HeadBack from "../headBack/headBack";
import { getRank } from "../../utils/apiConfig";
import util from "../../utils/util";

export default {
  components: {
    HeadBack,
  },
  data() {
    return {
      rankList: [],
      title: "",
    };
  },
  beforeRouteLeave(to, from, next) {
    let myScroll = document.getElementById("rankList-item").scrollTop;
    if (to.name == "bookinfo") {
      this.$store.commit("SetListScroll", myScroll);
    } else {
      let a = 0;
      this.$store.commit("SetListScroll", a);
    }
    next();
  },

  activated() {
    if (this.$store.state.isShowList) {
      this.getRanklists();
    }
    let scrollH = this.$store.state.listScroll;
    document.getElementById("rankList-item").scrollTop = scrollH;
  },
  created() {
    this.getRanklists();
  },
  methods: {
    getRanklists() {
      let rankid = this.$route.params.rankid;
      getRank(rankid)
        .then((res) => {
          console.log(res);
          
          res.data.ranking.books.forEach((list) => {
            list.cover = util.staticPath + list.cover;
          });
          this.rankList = res.data.ranking.books;
          this.title = this.$store.state.RankList.title;
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoepd>
.category-book-view {
  overflow-y: scroll;
  height: 100%;
}
#rankList-item {
  padding-top: 50px;
}
.category-book-item > a {
  width: 100%;
  padding: 10px 14px 0;
  color: #555;
  margin-bottom: 10px;
}
.category-book-cover {
  width: 86px;
  height: 113px;
  background-color: #555;
  float: left;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 10px #555;
}
.category-book-cover > img {
  width: inherit;
  height: inherit;
}
.category-book-msg {
  margin-left: 100px;
  height: 118px;
  line-height: 28px;
  border-bottom: 1px solid #ddd;
}
.category-book-msg > p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
}
.category-book-title {
  font-size: 16px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.category-list-author {
  font-size: 12px;
}
.category-col-line {
  margin: 0 5px;
  font-size: 14px;
}
.category-book-star {
  color: rgba(0, 0, 0, 0.6);
}
</style>