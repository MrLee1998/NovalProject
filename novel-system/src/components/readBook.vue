<template>
  <div class="bookContent">
    <div class="btn-box-top">
      <van-nav-bar
        :title="this.$store.state.bookInfo.title"
        left-text="返回"
        right-text="首页"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="book-box">
      <div class="book-title">{{ this.$store.state.bookContent.title }}</div>
      <div class="book-content">
        {{ this.$store.state.bookContent.bookContent }}
      </div>
    </div>
    <div class="btn-box-bottom">
      <button @click="preChapter()">上一章</button>
      <button @click="goToChapter()">目录</button>
      <button @click="nextChapter()">下一张</button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  methods: {
    goToChapter() {
      this.$router.push("/bookinfo");
      this.$store.commit("setCurrentUrl", this.$route.query.url);
    },
    nextChapter() {
      if (
        this.$store.state.bookContent.preChapter ==
        this.$store.state.bookInfo.lastChapter
      ) {
        Toast({
          message: "已经是最后一章了!",
          icon: "like-o",
        });
        return;
      }
      console.log(this.$store.state.bookInfo);
      this.$store.commit(
        "setCurrentUrl",
        this.$store.state.bookContent.nextChapter
      );
      this.$http
        .readbook({
          url: this.$store.state.bookContent.nextChapter,
        })
        .then((res) => {
          // console.log(res);
          this.$store.commit("setBookContent", res.data);
        });
    },
    preChapter() {
      if (
        this.$store.state.bookContent.preChapter ==
        this.$store.state.bookInfo.url
      ) {
        Toast({
          message: "已经是第一章了!",
          icon: "like-o",
        });
        return;
      }
      this.$store.commit(
        "setCurrentUrl",
        this.$store.state.bookContent.preChapter
      );
      this.$http
        .readbook({
          url: this.$store.state.bookContent.preChapter,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("setBookContent", res.data);
          // document.getElementsByClassName('.bookContent').scrollTop = 0
        });
    },
    onClickLeft() {
      if (this.$store.state.myBookRouter == '/mybook') {

        this.$router.push('/mybook')
      } else {
        this.$router.push("/bookinfo");
        this.$store.commit("setCurrentUrl", this.$route.query.url);
      }
    },
    onClickRight() {
      this.$router.push("/");
      this.$store.commit('setMyBookRouter', '')
    },
  },
  created() {
    // console.log(this.$store.state.footprint);
    // console.log(this.$route.query.url);
  },
  // beforeRouteLeave (to, from, next) {
    
  // }
};
</script>

<style lang="less" scoped>
.bookContent {
  overflow-y: scroll;
  height: 90vh;
  margin: 0 10px 40px 10px;
  .clearfix {
    *zoom: 1;
  }
  .book-box {
    padding-top: 50px;
  }
  .btn-box-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
  }
  .btn-box-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    // right: 40%;
    button {
      border-radius: 5px;
      background-color: yellow;
      width: 133px;
    }
  }
}
</style>