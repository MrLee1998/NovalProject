<template>
  <div id="reader-page-view" class="reader-content-box">
    <h3 class="reader-title">{{ Title }}</h3>
    <p class="reader-content" v-for="text in Content" :key="text.id">{{text.trim()}}</p>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    bookContent: {
      type: Object,
      require: true,
    },
    Title: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    Content() {
      // if (!_.isEmpty(this.bookContent)) {
      //   let text = this.bookContent && this.bookContent.cpContent ? "cpContent" : "body";
      //   return text.split('\n')
      // }
      let content;
      if(!_.isEmpty(this.bookContent)) {
        content = this.bookContent && this.bookContent.cpContent ? this.bookContent.cpContent : this.bookContent.body;
      }
      return content.split('\n')
    },
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.reader-content-box {
  padding: 15px 0;
  max-width: 900px;
  margin: 0 auto;
  height: 100%;
  // overflow: hidden;
  .reader-title {
    font-size: 10px;
    margin: 0 15px;
    border-bottom: 1px solid #736357;
    margin-bottom: 10px;
    line-height: 31px;
  }
  .reader-content {
    color: #444;
    line-height: 20px;
    margin: 0 15px;
    text-indent: 2em;
    word-break: break-all;
    font-weight: 500;
    padding-bottom: 10px;
    // height: 30px;
  }
}
</style>