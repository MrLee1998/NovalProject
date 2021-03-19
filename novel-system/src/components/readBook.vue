<template>
  <div id="bookContent">
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
    <div class="book-box" @click="showDetail">
      <div class="book-title">{{ this.$store.state.bookContent.title }}</div>
      <div class="book-content">
        {{ this.$store.state.bookContent.bookContent }}
      </div>
      <!-- <changeStyle  @close="closeDetail"></changeStyle> -->
      <transition name="fade">
        <div class="header-detail" v-show="show">
          <div class="setting">
            <van-slider class="fontSize" 
              v-model="value" 
              @change="onChange" 
              :min="16" :max="30"
              />
            <div class="fontStyle">
              <div
                class="typeFont"
                v-for="(item, index) in font"
                :key="item.fontvalue + index"
                @click="changetypeFont(item.fontvalue)"
              >
                {{ item.name }}
              </div>
            </div>
            <!-- <van-icon name="eye-o" /> -->
            <!-- <van-icon name="eye" /> -->
          </div>
          <div class="detail-close" @click.stop="close">
            <van-icon name="cross" />
          </div>
        </div>
      </transition>
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
import {setLocal, getLocal } from "../common/utils";
// import changeStyle from '../components/changeStyle'

export default {
  components: {
    // changeStyle
  },
  data() {
    return {
      show: false,
      sty: "#fff",
      addSty: true,
      font: [
        {
          name: "系统字体",
          fontvalue: "",
        },

        {
          name: "静蕾字体",
          fontvalue: "ygy",
        },
        {
          name: "仿宋字体",
          fontvalue: "fangsong",
        },
        {
          name: "楷书字体",
          fontvalue: "kaiti",
        },
      ],
      value: 16
    };
  },
  methods: {
    showDetail() {
      this.show = true;
      // console.log(this.show)
      // document.getElementById('bookContent').style.background = '#ffffff'
    },
    close() {
      this.show = false
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
        let readChapterUrl;
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
    changetypeFont(type) {
      console.log(type);
      // this.$store.commit('setFontStyle', type)
      setLocal("fontStyle", type)
      document.getElementById("bookContent").style.fontFamily = getLocal(
        "fontStyle"
      );
    },
    onChange(value) {
      // console.log(value);
      document.getElementById("bookContent").style.fontSize = value + 'px'
    }
  },
  created() {
  },
  // beforeRouteLeave (to, from, next) {

  // }
};
</script>

<style lang="less" scoped>
// #changeSty {
//   background-color: black;
//   color: #f2f2f2;
// }
#bookContent {
  overflow-y: scroll;
  height: 95vh;
  width: 100%;
  .clearfix {
    *zoom: 1;
  }
  .book-box {
    padding-top: 50px;
    margin: 10px;
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
      // background-color: black;
      width: 133px;
      color: black;
    }
  }
}
.header-detail {
  position: fixed;
  top: 600px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow: auto;
  // height: 100%;
  background: rgba(88, 89, 90, 0.8);
  color: #ffffff;
  opacity: 1;
  backdrop-filter: blur(10px);
  border-radius: 5px;
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 1);
  }
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  .setting {
    .fontStyle {
      display: flex;
      .typeFont {
        border: 1px solid #f4f4f4;
        padding: 2px;
        border-radius: 2px;
        margin: 10px 15px  0;
        font-size: 16px;
      }
    }
    .fontSize {
      margin: 20px;
      height: 5px;
      width: 80%;
    }
    // .van-icon {
    //   font-size: 40px;
    //   margin: 10px 45px;
    // }
  }
  .detail-close {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 10px auto 0 auto;
    font-size: 20px;
    clear: flex;
  }
}
</style>