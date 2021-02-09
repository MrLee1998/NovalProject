<template>
  <div class="categoryList">
    <headBack></headBack>
    <div
      class="bookinfo"
      v-for="(book, index) in categoryListData"
      :key="book.url"
      @click="goBookInfo(index)"
    >
      <div class="img">
        <img :src="book.img" alt="" />
      </div>
      <div class="bookinfo-box">
        <div class="title">{{ book.title }}</div>
        <div class="author">{{ book.author }}</div>
        <div class="update">{{ book.lastChapterTitle }}</div>
        <div class="introduce">{{ book.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import headBack from '../components/head/headBack'
export default {
  components: {
    headBack
  },
  data() {
    return {
      categoryListData: [],
    };
  },
  methods: {
    goBookInfo(index) {
      console.log(index);
      let bookinfo = this.categoryListData[index];
      this.$router.push({
        name: "bookinfo",
        params: {
          bookinfo,
        },
      });
    },
  },
  created() {
    console.log(this.$route.params.categoryListData);
    console.log(this.$store.state.categoryList);
    this.categoryListData = this.$route.params.categoryListData || this.$store.state.categoryList;
  },
};
</script>

<style lang="less" scoped>
.categoryList {
  overflow-y: scroll;
  height: 99vh;
  .bookinfo {
    display: flex;
    margin: 10px;
    box-shadow: 10px;
    .img {
      img {
        width: 78px;
        height: 98px;
        border-radius: 5px;
        margin-right: 5px;
      }
    }
    .bookinfo-box {
      font-size: 15px;
      font-weight: 200;
      .title {
        line-height: 17px;
        font-size: 17px;
        font-weight: bold;
      }
      .author {
        font-size: 10px;
        line-height: 17px;
      }
      .update {
        font-size: 10px;
        line-height: 17px;
      }
      .introduce {
        font-size: 10px;
        line-height: 17px;
        flex-wrap: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>