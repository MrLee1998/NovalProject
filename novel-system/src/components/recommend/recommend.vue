<template>
  <div class="index">
    <div class="index-title">
      <h3>{{title}}</h3>
    </div>
    <ul class="index-rank">
      <li class="fix" v-for="(book, index) in list" :key="book._id">
        <router-link :to="'/bookinfo/' + book._id">
          <div class="book-cover-box">
            <img :src="book.cover" alt="" :title="book.title"  class="book-cover"/>
            <div class="book-number">{{index + 1}}</div>
          </div>
          <div class="book-info">
            <p class="book-title">{{book.title}}</p>
            <ul class="book-author">
              <li>{{book.author}}</li>
              <!-- <li style="float: right">{{book.majorCate}}</li> -->
            </ul>
            <p class="book-content">
              {{book.shortIntro}}
            </p>
            <ul class="book-tags fix">
              <li>{{ book.majorCate}}</li>
            </ul>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      require: true
    },
    title: {
      type: String,
      require: true
    }
  }
};
</script>

<style>
.index {
  padding-bottom: 20px;
}
.index-title {
  padding: 10px 14px;
  border-bottom: 1px solid #dcdfe6;
}
.index-title > h3 {
  font-size: 14px;
}
.index-rank {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
}
.index-rank > li {
  padding: 10px 14px;
}
.title {
  font-size: 14px;
  border-left: 6px solid #f56c6c;
  padding: 10px 14px;
  border-bottom: 1px solid #dcdfe6;
}
.title > h3 {
  font-size: 14px;
  font-weight: normal;
}
.book-cover-box {
  background-color: #606266;
  border-radius: 4px;
  height: 113px;
  width: 86px;
  float: left;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 10px #555;
}
.book-cover {
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
.book-info {
  margin-left: 100px;
}
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
  /* color: rgba(0, 0, 0, 0.4); */
}
.book-content {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 5px;
  display: -webkit-box;
  height: 55px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.book-tags {
  overflow: hidden;
}
.book-tags > li {
  float: left;
  padding: 2px 8px;
  background-color: #67c23a;
  border-radius: 4px;
  color: #f2f6fc;
  line-height: 1.3;
}
.book-tags > li + li {
  margin-left: 10px;
}
.book-tags > li:nth-child(3n + 1) {
  background-color: #53ac7d;
}
.book-tags > li:last-child {
  background-color: #e6a23c;
}
</style>