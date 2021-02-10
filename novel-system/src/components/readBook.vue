<template>
  <div class="bookContent">
    <div @click="goToChapter()">目录</div>
    <div>{{this.$store.state.bookContent.title}}</div>
    <div>{{this.$store.state.bookContent.bookContent}}</div>
    <div>
      <button>上一章</button>
      <button>下一张</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    goToChapter() {
      this.$router.push('/bookinfo')
      this.$store.commit('setCurrentUrl', this.$route.query.url)
    }
  },
  created() {
    console.log(this.$store.state.footprint);
    console.log(this.$route.query.url);
  },
}
</script>

<style lang="less" scoped>

</style>