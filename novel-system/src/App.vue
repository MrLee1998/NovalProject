<template>
  <div id="app">
     <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  
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
}
</style>
