<template>
  <div id="app">
    <tabbar></tabbar>
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import tabbar from "./components/tabbar/Tabbar";
export default {
  name: "App",
  components: {
    tabbar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#app {
  background-color: rgb(180, 176, 157);
  // height: 100vh;
  height: 100%;
   .page {
    padding-top: 50px;
  }
}
</style>
