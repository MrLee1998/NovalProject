<template>
  <div id="app">
    <!-- <tabbar></tabbar> -->
    <div class="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import tabbar from "./components/tabbar/Tabbar";
import { getLocal } from "./common/utils";

export default {
  name: "App",
  components: {
    // tabbar,
  },
  data() {
    return {};
  },
  computed: {
    fontSty() {
       let sty = getLocal('fontStyle')
       return sty
    }
  },
  created() {
    // let sty = getLocal('fontStyle')
    console.log(this.fontSty);
    document.getElementById("app").style.fontFamily = this.fontSty
  },
};
</script>

<style lang="less" scoped>
#app {
  background-color: rgb(180, 176, 157);
  // font-family: kaiti;
  // height: 100vh;
  height: 100%;
}
</style>
