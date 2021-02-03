<template>
  <div class="bookStack">
    <Nav></Nav>
    <div class="book-item" v-for="item in arr" :key="item">
        <div class="book-image">
          <img class="img" src="../assets/images/7.jpg" alt="">
        </div>
        <div class="book-item_detail">
            <div class="title">第九地区</div>
            <div class="tips">第一六七七张 谋划</div>
        </div>
    </div>
  </div>
</template>

<script>
import Nav from '../components/nav'

export default {
  components: {
    Nav
  },
  data() {
    return {
      // 7 ,8 , 9, 11, 12, 13, 14, 15
      arr: [1, 2, 3, 4, 5, 6 ],
    }
  },
  mounted() {
    console.log(this.$route.query.id);
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
  .bookStack {
    overflow: hidden;
    .book-item {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid black;
      .book-image .img {
        height: 60px; width: 50px
      }
      .book-item_detail {
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        // color: #fff;
        .title {

        }
        .tips {
          padding-top: 10px;
          font-size: 10px;
          font-weight: 100;
        }
      }
    }
  }
</style>