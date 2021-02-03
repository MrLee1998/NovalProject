<template>
  <div class="week">
    <div class="week-title">
      <h3>本周推荐</h3>
    </div>
    <ul class="week-rank">
      <li
        class="fix"
        v-for="(books, index) in headList"
        :key="books._id"
      >
        <router-link :to="'/bookinfo/' + books._id">
          <div class="book-cover-box">
            <div class="book-number">{{ index + 1 }}</div>
            <img class="book-cover" :src="books.cover" />
          </div>
          <div class="book-info">
            <p class="book-title">
              {{ books.title }}
            </p>
            <p class="book-author">{{ books.author }}</p>
            <p class="book-content">
              {{ books.shortIntro }}
            </p>
            <ul class="book-tags fix">
              <li>{{ books.majorCate }}</li>
              <li v-show="books.minorCate != ''">{{ books.minorCate }}</li>
            </ul>
          </div>
        </router-link>
      </li>
      <router-link
        :to="'/bookinfo/' + books._id"
        tag="li"
        class="week-next"
        v-for="(books, index) in bodyList"
        :key="books._id"
      >
        <span>{{ index + 2 }}</span>
        <span>{{ books.title }}</span>
        <span>{{ books.author }}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    newslist: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    headList() {
      let headList = []
      let temp = this.newslist
      temp.forEach((book, index) => {
        if(index === 0) {
          headList.push(book)
        }
      })
      return headList
    },
    bodyList() {
      let bodyList = []
      let temp = this.newslist
      temp.forEach((book, index) => {
        if(index > 0) {
          bodyList.push(book)
        }
      })
      return bodyList
    }
  },
  created() {
    console.log(this.bodyList);
    console.log(this.headList);
  }
};
</script>

<style lang="less" scoped>
.week {
  margin-bottom: 10px;
  padding-bottom: 20px;
  .week-rank {
    width: 100%;
    li {
      padding: 10px 14px;
      border-bottom: 1px solid #dcdfe6;
    }
    .week-next {
      span {
        margin-left: 10px;
      }
    }
    .week-next span:nth-child(1) {
      color: #e6a23c;
      font-size: 14px;
    }
    .week-next span:nth-child(2) {
      font-size: 16px;
      color: #555;
    }
    .week-next span:nth-child(3) {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
    }
    // .week-next span:last-child {
    //   margin-bottom: 20px;
    //   padding-bottom: 20px;
    // }
  }
}
</style>