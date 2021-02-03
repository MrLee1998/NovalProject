<template>
  <div class="headBack">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  },
};
</script>

<style lang="less" scoped>
.headBack {
  position: fixed;
  top: 0;
  width: 100%;
  .van-nav-bar {
    background-color: red;
  }
}

</style>