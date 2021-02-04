<template>
  <div>
    <div class="book-info-content">
      <div class="book-info-cover">
        <img :src="Imgurl" />
      </div>
      <div class="book-info-describle">
        <h3 class="book-info-title">{{ book.title }}</h3>
        <p>作者：{{ book.author }}</p>
        <p>字数：{{ WordCount }}</p>
        <p>收藏人数：{{ latelyFollower }}</p>
        <p>最后更新：{{ datareset }}</p>
      </div>
    </div>
    <ul class="btn-info-group">
      <router-link :to="'/reader/' + book._id" tag="li">开始阅读</router-link>
      <li
        class="btn-info-bookshelf"
        :class="{ 'btn-info-bookshelf-active': isfollowed }"
        @click="followAction"
      ></li>
    </ul>
    <div class="info-longintro">
      <p>{{ book.longIntro }}</p>
    </div>
    <div class="info-last-chapter">
      <p>
        最后更新:<span @click="quickread()" class="last-update">
          {{ book.lastChapter }}
        </span>
      </p>
    </div>
    <div class="info-tags">
      <span v-for="tag in book.tags" :key="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
import { getBookInfo, getBookSources } from "../../utils/apiConfig";
import util from "../../utils/util";
import moment from "moment"; // JavaScript 日期处理类库

export default {
  data() {
    return {
      book: [],
      isfollowed: false,
    };
  },
  computed: {
    Imgurl() {
      if (!this.book.cover && typeof this.book.cover === "undefined") return;
      return util.staticPath + this.book.cover;
    },
    WordCount() {
      if (this.book.wordCount - 10000 > 0) {
        return parseInt(this.book.wordCount / 10000) + "万";
      } else {
        return this.book.wordCount;
      }
    },
    latelyFollower() {
      if (this.book.latelyFollower - 10000 > 0) {
        return parseInt(this.book.latelyFollower / 10000) + "万";
      } else {
        return this.book.latelyFollower;
      }
    },
    datareset() {
      return moment(this.book.updated).fromNow();
    },
  },
  created() {
    this.getbookInfo();
  },
  methods: {
    quickread() { 
      console.log(this.book);
      this.$router.push({ name: "reader", params: { bookid: this.$store.state.SourceId} });
    },
    followAction() {},
    getbookInfo() {
      getBookInfo(this.$route.params.bookid)
        .then((res) => {
          console.log(res.data);
          this.book = res.data;
          this.getbookSource();
          this.$store.commit("SetBookInfo", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getbookSource() {
      if (this.$route.name === "bookinfo" || this.$route.name === "reader") {
        getBookSources({
          view: "summary",
          book: this.$route.params.bookid,
        }).then((res) => {
          console.log(res.data);
          this.$store.commit("SetSourceId", res.data[0]._id);
        });
      }
    },
  },
  watch: {
    "$route.params": "getbookInfo",
  },
};
</script>

<style type="text/css">
.book-info-content {
  padding: 60px 20px 20px 20px;
  display: table;
  width: 100%;
}
.book-info-cover {
  width: 93px;
  height: 124px;
  margin-right: 18px;
  float: left;
  border: 1px solid #f0f0f0;
  box-shadow: 0 5px 10px #555;
  border-radius: 4px;
}
.book-info-cover > img {
  width: 100%;
  height: 100%;
}
.book-info-describle {
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.book-info-title {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 5px;
}
.book-info-describle p {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-info-group {
  width: 100%;
  font-size: 0;
  padding: 0 10px 10px;
  margin-bottom: 10px;
}
.btn-info-group > li {
  text-align: center;
  display: inline-block;
  width: 45%;
  background-color: #fff;
  font-size: 14px;
  line-height: 2.8em;
  border-radius: 4px;
  border: solid 1px #ddd;
}
.btn-info-group > li:first-child {
  margin-right: 2%;
  background-color: #409eff;
  color: #efefef;
}
.btn-info-bookshelf-active::after {
  content: "\53D6\6D88\6536\85CF" !important;
  background-color: #409eff !important;
  color: #efefef;
  display: block;
}
.btn-info-bookshelf::after {
  content: "\52A0\5165\6536\85CF";
  display: block;
}
.info-longintro > p {
  padding: 10px 14px;
  line-height: 2em;
}
.info-longintro {
  border-bottom: 1px solid #ddd;
}
.info-last-chapter {
  padding: 10px 14px;
  margin-bottom: 10px;
  line-height: 28px;
}
.last-update {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: red;
}
.last-update:hover {
  color: #42b983;
}

.info-tags {
  padding: 10px 14px;
  overflow: hidden;
  text-emphasis: ellipsis;
  white-space: nowrap;
}
.info-tags > span {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #e6a23c;
  color: #f2f6fc;
}
.info-tags > span + span {
  margin-left: 10px;
}
.info-tags > span:last-child {
  background-color: #53ac7d;
}
</style>