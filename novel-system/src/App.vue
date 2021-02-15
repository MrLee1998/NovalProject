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
// import { getLocal } from "./common/utils";

export default {
  name: "App",
  components: {
    // tabbar,
  },
  data() {
    return {};
  },
  created() {
    // let userId = getLocal("userId");
    // this.$http
    //   .getmybook({
    //     userId: userId,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     this.$store.commit('setMybooks', res.data.bookInfo);
    //   });
  },
};
</script>

<style lang="less" scoped>
#app {
  background-color: rgb(180, 176, 157);
  // height: 100vh;
  height: 100%;
}
</style>
