<template>
  <transition name="bookinfo" mode="in-out">
    <div class="book-info-main">
      <headBack :title="'书籍详情'"></headBack>
      <div class="book-info-container" id="book-info-view">
        <bookinfoContent></bookinfoContent>
        <bookinfoRecommend></bookinfoRecommend>
      </div>
    </div>
  </transition>
</template>

<script>
import headBack from "../headBack/headBack";
import bookinfoContent from './bookinfoContent'
import bookinfoRecommend from './bookinfoRecommend'

export default {
  components: {
    headBack,
    bookinfoContent,
    bookinfoRecommend
  },
  data() {
    return {};
  },
  created() {
    this.$store.commit('setShowList',false);
  },
};
</script>

<style lang="less" scoped>
.bookinfo-enter-active,
.bookinfo-leave-active {
  transition-duration: 0.3s;
}
.bookinfo-leave-to,
.bookinfo-enter {
  transform: translate3d(100%, 0px, 0px);
}
.book-info-main {
  height: 91.6vh;
  width: 100%;
  overflow: hidden;
  padding-bottom: 25px;
  .book-info-container {
    height: 97.5%;
    overflow-y: scroll;
  }
}
</style>