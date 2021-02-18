<template>
  <div class="category">
    <tabbar></tabbar>
    <div class="category-box">
      <div v-for="(item, idx1) in category" :key="item.url">
        <div class="head-box">
          <span class="title">{{ item.title }}</span>
          <div class="more" @click="goTo(item.url, item.title)">更多....</div>
        </div>
        <div class="recommend">
          <h5>相关推荐</h5>
          <ul class="book-about-box">
            <li @click="goBookInfo(idx1, idx2)" v-for="(book, idx2) in item.books" :key="book.url">
              <img :src="book.img" />
              <p>{{ book.title }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import tabbar from "../components/tabbar/Tabbar";

export default {
  components: {
    tabbar,
  },
  data() {
    return {
      category: [
        {
          title: "玄幻小说",
          url: "/xuanhuan/",
          books: [],
        },
        {
          title: "修真小说",
          url: "/xianxia/",
          books: [],
        },
        {
          title: "都市小说",
          url: "/dushi/",
          books: [],
        },
        {
          title: "历史小说",
          url: "/lishi/",
          books: [],
        },
        {
          title: "网游小说",
          url: "/wangyou/",
          books: [],
        },
        {
          title: "科幻小说",
          url: "/kehuan/",
          books: [],
        },
        {
          title: "竞技小说",
          url: "/jingji/",
          books: [],
        },
        {
          title: "言情小说",
          url: "/yanqing/",
          books: [],
        },
        {
          title: "其他小说",
          url: "/qita/",
          books: [],
        },
      ],
      utl: "",
      categoryList: [],
      recommend: [],
    };
  },
  methods: {
    goTo(url, title) {
      console.log(url, title);
      this.$store.commit("setBookType", title);
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      this.$http
        .category({
          url: url,
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("setCategoryList", res.data);
          this.$router.push({
            // path: `/categoryList${url}`,
            name: "categoryList",
            params: {
              categoryListData: res.data,
            },
          });
        });
    },
    goBookInfo(idx1, idx2) {
      let bookinfo = this.category[idx1].books[idx2];
      console.log(bookinfo);
      this.$store.commit('setBookInfo', bookinfo)
      this.$store.commit('setPathUrl', '/category')
      this.$router.push({
        path: "/bookinfo",
        query: {
          bookinfo
        },
      });
    },
  },
  created() {
     Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
    for(let i = 0; i < this.category.length; i++) {
      this.$http
      .category({
        url: this.category[i].url,
      })
      .then((res) => {
        res.data.forEach((item, index) => {
          if (index < 3) {
            this.category[i].books.push(item);
          }
        });
      });
    }
  },
};
</script>

<style lang="less" scoped>
.category {
  .category-box {
    overflow-y: scroll;
    height: 90vh;
    margin: 10px;
    margin-top: 30px;
    .head-box {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      .title {
        font-weight: bold;
        font-size: 20px;
      }
      .more {
        font-weight: 200;
      }
    }
  }
}
.book-about-box {
  display: flex;
  li {
    width: 33%;
    margin: 10px;
    img {
      width: 100%;
      height: 160px;
      border-radius: 5px;   
    }
  }
}
</style>