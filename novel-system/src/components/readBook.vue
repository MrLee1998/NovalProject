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
    <div class="book-box" @click="showPopup">
      <div class="changeStyle" v-if="show">哈哈</div>
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
import { Toast, Dialog } from "vant";
import { getLocal } from "../common/utils";

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showPopup() {
      if(this.show == false) {
        this.show = true
      } else {
        this.show = false
      }
      console.log(this.show)
    },
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
      // console.log(this.$store.state.currentUrl);
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
      let userId = getLocal("userId");
      if (this.$store.state.pathUrl != "/mybook") {
        Dialog.confirm({
          title: "",
          message: "是否加入书架呢?",
        })
          .then(() => {
            console.log("加入成功");
            console.log(userId);
            this.$http
              .mybook({
                userId: userId,
                bookInfo: this.$store.state.bookInfo,
              })
              .then((res) => {
                console.log(res);
                if (res.data.code == 1) {
                  return Toast({
                    message: "已加入书架",
                    icon: "like-o",
                  });
                }
              });
            let readChapterUrl = "";
            if (this.$store.state.currentUrl) {
              readChapterUrl = this.$store.state.currentUrl;
            } else {
              readChapterUrl = this.$store.state.readBookUrl;
            }
            console.log(readChapterUrl);
            let bookUrl = {
              url: this.$store.state.bookInfo.url,
              readChapterUrl: readChapterUrl,
            };
            console.log(bookUrl);
            this.$http
              .keepBookUrl({
                userId,
                bookUrl,
              })
              .then((res) => {
                console.log(res);
                this.$router.push("/mybook");
              });
          })
          .catch(() => {
            this.$router.push("/bookinfo");
            this.$store.commit("setCurrentUrl", this.$route.query.url);
          });
      } else {
        console.log(this.$store.state.bookContent.nextChapter);
        // console.log(this.$store.state.bookInfo);
        let readChapterUrl
        if (this.$store.state.currentUrl) {
          readChapterUrl = this.$store.state.currentUrl;
        } else {
          readChapterUrl = this.$store.state.readBookUrl;
        }
        console.log(readChapterUrl);
        let bookUrl = {
          url: this.$store.state.bookInfo.url,
          readChapterUrl: readChapterUrl,
        };
        this.$http
          .updateBookUrl({
            userId: userId,
            bookUrl: bookUrl,
          })
          .then((res) => {
            console.log(res);
          });
        this.$router.push("/mybook");
      }
    },
    onClickRight() {
      this.$router.push("/");
      this.$store.commit("setMyBookRouter", "");
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
    .changeStyle {
      top: 0;
      right: 0;
      left: 0;
      bottom: 1000px;
      width: 100%;
      height: 100%;
      z-index: 99;
    }
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