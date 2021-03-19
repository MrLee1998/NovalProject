<template>
  <div>
    <tabbar></tabbar>
    <div class="recommend-box">
      <ul class="recommend-list">
        <li class="fix" @click="goToBookInfo(index)" v-for="(book, index) in footprintList" :key="book.url">
          <div class="book-img-box">
            <img class="book-img" :src="book.img" alt="" />
            <div class="book-number">{{ index + 1 }}</div>
          </div>
          <div class="book-info">
            <p class="book-title">{{ book.title }}</p>
            <p class="book-content">{{ book.introduce }}</p>
            <ul class="book-tags fix">
              <li>{{ book.author }}</li>
              <!-- <li style="float: right"></li> -->
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tabbar from '../components/tabbar/Tabbar'
import { getLocal } from '../common/utils'

export default {
  components: {
    tabbar
  },
  data() {
    return {
      footprintList: []
    }
  },
  methods: {
     goToBookInfo(index) {
      console.log(index);
      let bookinfo = this.footprintList[index];
      this.$store.commit('setBookInfo', bookinfo)
      this.$store.commit('setPathUrl', '/foot')
      this.$router.push({
        path: "/bookinfo",
        query: {
          bookinfo
        },
      });
    }
  },
  created() {
    // console.log();
    let userId = getLocal('userId')
    this.$http.getFoot({
      userId: userId
    }).then(res => {
      console.log(res);
      this.footprintList = res.data[0].bookInfo
    })
  },
}
</script>

<style lang="less">
.recommend-box {
  overflow-y: scroll;
  height: 90vh;
  margin-top: 30px;
}
.recommend-list {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
  li {
    padding: 10px 14px;
    .book-img-box {
      background-color: #606266;
      border-radius: 4px;
      height: 113px;
      width: 86px;
      float: left;
      position: relative;
      overflow: hidden;
      box-shadow: 0 5px 10px #555;
      .book-img {
        width: inherit;
        height: inherit;
      }
      .book-number {
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #e6a23c;
        color: #f2f6fc;
        width: 18px;
        height: 18px;
        padding: 1px;
        font-size: 12px;
        line-height: 14px;
      }
    }
    .book-info {
      margin-left: 100px;
      .book-title {
        font-size: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 2px;
        color: #555;
      }
      .book-author {
        font-size: 14px;
        margin-bottom: 2px;
        color: rgba(0, 0, 0, 0.4);
      }
      .book-content {
        color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 5px;
        display: -webkit-box;
        height: 60px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .book-tags {
        overflow: hidden;
        li {
          float: left;
          padding: 2px 8px;
          background-color: #67c23a;
          border-radius: 4px;
          color: #f2f6fc;
          line-height: 1.3;
        }
        // li:nth-child(3n + 1) {
        //   background-color: #53ac7d;
        // }
        li:last-child {
          background-color: #e6a23c;
        }
      }
    }
  }
}
</style>