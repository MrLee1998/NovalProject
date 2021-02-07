<template>
  <div class="tabbar">
    <van-tabbar route>
      <van-tabbar-item replace to="/home">推荐</van-tabbar-item>
      <van-tabbar-item replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="search">分类</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tabbar {
  .van-tabbar{
    display: fixed;
    top: 0;
  }
}
</style>