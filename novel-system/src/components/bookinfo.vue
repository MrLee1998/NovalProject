<template>
  <div class="bookInfo">
    <headBack :routerUrl="this.$store.state.pathUrl"></headBack>
    <div class="bookinfo-header">
      <div class="left">
        <img :src="bookInfo.img" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ bookInfo.title }}</div>
        <div class="bookType">类型: {{ this.$store.state.bookType }}</div>
        <div class="author">{{ bookInfo.author }}</div>
        <div class="update">{{ update }}</div>
        <div class="lastChapter">最新：{{ bookInfo.lastChapterTitle }}</div>
      </div>
    </div>
    <div class="introduce">
      <span>{{ bookInfo.introduce }}</span>
    </div>
    <div class="btn-item">
      <button @click="goToRead">开始阅读</button>
      <button @click="addBook">加入书架</button>
    </div>
    <div class="newChapter">
      <div class="title">最新章节预览</div>
      <div
        class="newChapter-content"
        v-for="chapter1 in newChapterData"
        :key="chapter1.url"
        @click="chapterRead(chapter1.chapterUrl)"
      >
        <div class="newChapter-content__title">{{ chapter1.title }}</div>
      </div>
    </div>
    <div class="allChapter">
      <div class="title">目录</div>
      <div
        class="allChapter-content"
        v-for="chapter2 in allChapterData"
        :key="chapter2.url"
        @click="chapterRead(chapter2.chapterUrl)"
      >
        <div class="allChapter-content__title">{{ chapter2.title }}</div>
      </div>
    </div>
    <div class="btn-box">
      <button class="pre" @click="prePage()">上一章</button>
      <!-- <div class="pageNum">
        <select name="" id="" class="selectPageNum">
          <option v-for="num in pageArray" 
          :key="num.chapterUrl" 
          :value="num.chapterNum"
          >{{num.chapterNum}}</option>
        </select>
      </div> -->
      <van-dropdown-menu direction="up" active-color="#1989fa">
        <van-dropdown-item
          v-model="chapterUrl"
          :options="chapterNumData"
          :title="title"
          @change="choosePageNum(pageArray.chapterUrl)"
        >
        </van-dropdown-item>
      </van-dropdown-menu>
      <button class="next" @click="nextPage()">下一张</button>
    </div>
  </div>
</template>

<script>
import headBack from "../components/head/headBack";
import { getLocal } from "../common/utils";
import { Toast } from "vant";

export default {
  components: {
    headBack,
  },
  data() {
    return {
      bookInfo: {},
      newChapterData: [],
      allChapterData: [],
      currentUrl: "",
      pageArray: [],
      title: "",
      chapterUrl: "",
      chapterNumData: [],
      update: "",
      pathUrl: "",
    };
  },
  // beforeRouteLeave (to, from, next) {
  //   if(to.path) {
  //     this.pathUrl = to.path
  //     console.log(to.pathUrl);
  //     next();
  //   }

  // },
  methods: {
    nextPage() {
      console.log(this.$store.state.next);
      this.getBookInfo(this.$store.state.next);
      console.log(this.chapterNumData);
    },
    prePage() {
      console.log(this.$store.state.pre);
      this.getBookInfo(this.$store.state.pre);
    },
    choosePageNum() {
      console.log("url");
    },
    goToRead() {
      this.$http
        .readbook({
          url: this.$store.state.readBookUrl || "",
        })
        .then((res) => {
          console.log(res);
          if (res) {
            this.$store.commit("setBookContent", res.data);
            this.$store.commit("setFootprint", this.$store.state.bookInfo);
            this.$router.push({
              path: "/readbook",
              query: {
                url: this.currentUrl,
              },
            });
          }
        });
    },
    addBook() {
      let userId = getLocal("userId");
      if (!userId) {
        Toast({
          message: "请先登录哦!",
          icon: "like-o",
        });
        this.$router.push("/login");
      }
      Toast.success("添加成功!");
      this.$http
        .mybook({
          userId: userId,
          bookInfo: this.$store.state.bookInfo,
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 1) {
            return Toast({
              message: "自定义图标",
              icon: "like-o",
            });
          }
        });
      console.log(this.$store.state.readBookUrl);
      let bookUrl = {
        url: this.$store.state.bookInfo.url,
        readChapterUrl: this.$store.state.readBookUrl,
      };
      // console.log(bookUrl);
      this.$http
        .keepBookUrl({
          userId,
          bookUrl,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/mybook");
        });
    },
    chapterRead(url) {
      console.log(url);
      this.$http
        .readbook({
          url: url,
        })
        .then((res) => {
          console.log(res);
          if (res) {
            this.$store.commit("setBookContent", res.data);
            this.$store.commit("setFootprint", this.$store.state.bookInfo);
            this.$router.push({
              path: "/readbook",
              query: {
                url: this.currentUrl,
              },
            });
          }
        });
    },
    getBookInfo(url) {
      this.$http
        .bookinfo({
          url: url,
        })
        .then((res) => {
          // console.log(res);
          this.newChapterData = res.data.newChapterData;
          this.allChapterData = res.data.allChapterData;
          this.pageArray = res.data.pageArray;
          this.update = res.data.update;
          res.data.pageArray.forEach((item) => {
            if (item) {
              this.chapterNumData.push(item);
            }
          });
          this.$store.commit("setNext", res.data.next);
          this.$store.commit("setPre", res.data.pre || "");
          this.$store.commit("setReadBookUrl", res.data.readBookUrl);
          res.data.pageArray.forEach((item) => {
            if (item.chapterUrl == url) {
              this.title = item.chapterNum;
              this.chapterUrl = item.chapterUrl;
            }
          });
        });
    },
  },
  created() {
    this.bookInfo = this.$store.state.bookInfo;
    this.currentUrl = this.bookInfo.url;
    this.getBookInfo(this.currentUrl);
    console.log(this.$store.state.pathUrl);
  },
};
</script>

<style lang="less" scoped>
.bookInfo {
  overflow-y: scroll;
  height: 92vh;
  margin: 10px;
  .btn-item {
    button {
      width: 100px;
      margin: 10px 0 0 50px;
      border-radius: 5px;
    }
  }
  .bookinfo-header {
    display: flex;
    // margin: 10px;
    // box-shadow: 10px;
    padding: 2px;
    border: 1px solid #dedede;
    border-radius: 5px;
    .left {
      img {
        width: 78px;
        height: 98px;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
    .right {
      .title {
        line-height: 25px;
        font-size: 17px;
        font-weight: bold;
      }
      .bookType {
        font-size: 12px;
        line-height: 20px;
      }
      .author {
        font-size: 12px;
        line-height: 20px;
      }
      .lastChapter {
        font-size: 12px;
        line-height: 20px;
      }
      .update {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
  .introduce {
    // margin: 10px;
    margin-top: 10px;
    border: 1px solid #dedede;
    padding: 2px 2px 10px;
    border-radius: 5px;
  }
  .newChapter {
    border: 1px solid #dedede;
    border-radius: 5px;
    margin-top: 10px;
    .title {
      margin: 5px;
      font-size: 19px;
      color: #fff;
    }
    .newChapter-content {
      margin: 2px;
      .newChapter-content__title {
        padding-bottom: 10px;
        width: 100%;
        background-color: rgb(158, 158, 150);
        box-shadow: 10px 10px 5px #888888;
        border-radius: 5px;
      }
    }
  }
  .allChapter {
    border: 1px solid #dedede;
    border-radius: 5px;
    margin-top: 10px;
    .title {
      margin: 5px;
      font-size: 19px;
      color: #fff;
    }
    .allChapter-content {
      margin: 2px;
      .allChapter-content__title {
        width: 100%;
        padding-bottom: 10px;
        background-color: rgb(158, 158, 150);
        box-shadow: 10px 10px 5px #888888;
        border-radius: 5px;
      }
    }
  }
  .btn-box {
    position: fixed;
    bottom: 0;
    display: flex;
    .pre {
      width: 100px;
      height: 30px;
      margin: 10px;
    }
    .next {
      width: 100px;
      height: 30px;
      margin: 10px;
    }
    // .pageNum {
    //   width: 140px;
    //   .selectPageNum {
    //     width: 120px;
    //     height: 30px;
    //     margin: 10px;
    //     padding-right: 10px;
    //   }
    // }
    van-dropdown-menu {
      height: 20px;
      background-color: red;
    }
  }
}
</style>