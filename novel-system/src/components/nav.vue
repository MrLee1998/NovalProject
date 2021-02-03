<template>
  <div class="nav">
    <div class="tab">
      <div class="tab-header">
        <img class="more" src="../assets/images/more.png" alt="" />
        <div class="title">免费小说阅读器</div>    
      </div>
      <div class="tab-box">
          <div class="tab-wrapper">
            <router-link to="/bookStack">书架</router-link>
          </div>
          <div class="tab-wrapper">
            <router-link to="/recommend">推荐</router-link>
          </div>
          <div class="tab-wrapper">
            <router-link to="/rank">排行</router-link>
          </div>
          <div class="tab-wrapper">
            <router-link to="/classfy">分类</router-link>
          </div>
        </div>
    </div>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.tab {
  background-color: red;
  .tab-header {
    display: flex;
    align-items: center;
    .more {
      width: 25px;
      height: 25px;
      padding: 15px 10px;
    }
    .title {
      color: #fff;
      font-size: 22px;
      font-weight: bold;
    }
  }
  .tab-box {
    display: flex;
    width: 100%;
    height: 48px;
    text-align: center;
    line-height: 56px;
    background-color: red;
    .tab-wrapper {
      flex: 1;
      a {
        display: inline-block;
        width: 100%;
        text-decoration: none;
        color: #fff;
        font-size: 14px;
        transition: 0.5s;
      }
      .router-link-exact-active {
        color: red;
        font-size: 15px;
        width: 80px;
        height: 26px;
        line-height: 26px;
        border-radius: 15px;
        background-color: #fff;
      }
    }
  }
  .page {
  }
}
</style>