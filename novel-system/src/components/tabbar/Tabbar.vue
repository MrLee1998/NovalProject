<template>
  <div class="tabbar">
    <van-tabbar route>
      <van-tabbar-item replace to="/recommend">推荐</van-tabbar-item>
      <van-tabbar-item replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item replace to="/mybook">书库</van-tabbar-item>
      <van-tabbar-item replace to="/foot">足迹</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tabbar {
  height: 50px;
  .van-tabbar{
    display: fixed;
    top: 0;
  }
}
</style>