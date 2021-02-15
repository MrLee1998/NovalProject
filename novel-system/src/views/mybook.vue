<template>
  <div class="mybook">
    <tabbar></tabbar>
    <div
      @click="goToRead(index)"
      class="mybook-box"
      v-for="(book, index) in mybooks"
      :key="book.url"
    >
      <div class="img-box">
        <img class="img" :src="book.img" alt="" />
      </div>
      <div class="content-box">
        <div class="title">{{ book.title }}</div>
        <div class="lastChapter">
          {{ book.lastChapterTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabbar from "../components/tabbar/Tabbar";
import { getLocal } from "../common/utils";
// import { Toast } from "vant";

export default {
  components: {
    tabbar,
  },
  data() {
    return {
      mybooks: [],
    };
  },
  computed: {},
  methods: {
    getMybooks() {
      // Toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      // });
      let userId = getLocal("userId");
      this.$http
        .getmybook({
          userId: userId,
        })
        .then((res) => {
          console.log(res);
          this.mybooks = res.data[0].bookInfo;
          console.log(this.mybooks);
          // this.$store.commit('setMybooks', res.data.bookInfo);
        });
    },
    goToRead(index) {
      console.log(index);
      let url = this.mybooks[index].url
      this.$http
        .bookinfo({
          url: url,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit('setBookInfo', this.mybooks[index])
          this.$store.commit("setReadBookUrl", res.data.readBookUrl);
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
        });
    },
  },
  created() {
    this.getMybooks();
  },
};
</script>

<style lang="less">
.mybook {
  overflow-y: scroll;
  height: 90vh;
}
.mybook-box {
  display: flex;
  margin: 10px;
  .content-box {
    margin: 10px;
    .title {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .lastChapter {
      font-weight: 100;
      font-size: 10px;
    }
  }
}
.img-box {
  height: 84px;
  width: 63px;
  .img {
    width: inherit;
    height: inherit;
    border-radius: 5px;
  }
}
</style>