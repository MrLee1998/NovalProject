<template>
  <div>
    <van-nav-bar
      class="search-box"
      title=""
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <input class="search-input" type="text" />
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    routerUrl: {
      type: String,
      require: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      console.log("1");
      this.$router.push(this.routerUrl);
    },
    onClickRight() {
      console.log("2");
    },
  },
};
</script>

<style>
.search-input {
  width: 280px;
  margin-right: 5px;
  border-radius: 5px;
}
</style>