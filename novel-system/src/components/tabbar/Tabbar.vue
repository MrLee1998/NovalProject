<template>
  <div class="tabbar">
    <div class="header">
      <span class="text">欢迎使用!</span>
      <div class="btn">
        <button class="btn" @click="login">登录</button>
        <button class="btn" @click="exit">退出</button> 
      </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/recommend">推荐</van-tabbar-item>
      <van-tabbar-item replace to="/category">分类</van-tabbar-item>
      <van-tabbar-item replace to="/mybook">书库</van-tabbar-item>
      <van-tabbar-item replace to="/foot">足迹</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {getLocal, deleteLocal} from '../../common/utils'

export default {
  methods: {
    login() {
      let userId = getLocal('userId')
      if(userId) {
        return
      }
      this.$router.push('/login')
    },
    exit() {
      deleteLocal('userId')
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
.tabbar {
  height: 50px;
  .header {
    display: flex;
    justify-content: space-between;
    .text {
      padding: 2px;
      margin-left: 20px;
    }
    .btn {
      button{
      background-color: rgb(51, 50, 47);
      color: #fff;
      padding: 4px;
    }
    }
  }
  .van-tabbar{
    display: fixed;
    top: 30px;
  }
}
</style>