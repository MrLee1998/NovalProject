<template>
  <div class="category">
    <div class="category-box">
      <div v-for="item in category" :key="item.url">
        <span @click="goTo(item.url)" class="title">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
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
    };
  },
  methods: {
    goTo(url) {
      console.log(url);
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
  created() {},
};
</script>

<style lang="less" scoped>
.category {
  margin: 20px 40%;
  .category-box {
    .title {
      font-size: 20px;
    }
  }
}
</style>