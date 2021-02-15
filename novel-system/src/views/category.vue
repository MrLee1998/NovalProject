<template>
  <div class="category">
    <tabbar></tabbar>
    <div class="category-box">
      <div v-for="item in category" :key="item.url">
        <div class="head-box">
          <span class="title">{{ item.title }}</span>
          <div class="more" @click="goTo(item.url, item.title)">更多....</div>
        </div>
        <div class="recommend">
          <h5>相关推荐</h5>
          <ul class="book-about-box">
            <li v-for="(book) in recommend" :key="book.url">
              <router-link :to="'/bookinfo/'">
                <img :src="book.img" />
                <p>{{ book.title }}</p>
              </router-link>
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
        },
        {
          title: "修真小说",
          url: "/xianxia/",
        },
        {
          title: "都市小说",
          url: "/dushi/",
        },
        {
          title: "历史小说",
          url: "/lishi/",
        },
        {
          title: "网游小说",
          url: "/wangyou/",
        },
        {
          title: "科幻小说",
          url: "/kehuan/",
        },
        {
          title: "竞技小说",
          url: "/jingji/",
        },
        {
          title: "言情小说",
          url: "/yanqing/",
        },
        {
          title: "其他小说",
          url: "/qita/",
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
  },
  created() {
    this.$http.category({
      url: this.category[0].url
    }).then(res => {
      console.log(res);
    })
  },
};
</script>

<style lang="less" scoped>
.category {
  .category-box {
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
</style>