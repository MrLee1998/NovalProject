<template>
  <transition name="fade">
    <div class="header-detail">
      <div class="setting">
        <div class="fontStyle">
          <div class="typeFont" 
          v-for="(item, index) in font" 
          :key="item.fontvalue + index"
          @click="changetypeFont(item.fontvalue)"
          >
            {{item.name}}
          </div>
        </div>
        <!-- <van-icon name="eye-o" /> -->
        <!-- <van-icon name="eye" /> -->
      </div>
      <div class="detail-close" @click.stop="close">
        <van-icon name="cross" />
      </div>
    </div>
  </transition>
</template>

<script>
import { setLocal } from '../common/utils'

export default {
  data() {
    return {
      fontsize: 14,
      isnight: false,
      isnighticon: "wb_sunny",
      beforecolor: "",
      isFontMenuShow: false,
      isactive: [true, false, false, false, false, false],
      isactivefont: [true, false, false, false],
      font: [
        {
          name: "系统字体",
          fontvalue: "",
        },

        {
          name: "静蕾字体",
          fontvalue: "ygy",
        },
        {
          name: "仿宋字体",
          fontvalue: "fangsong",
        },
        {
          name: "楷书字体",
          fontvalue: "kaiti",
        },
      ],
    };
  },
  methods: {
    close() {
      return this.$emit("close", false);
    },
    changetypeFont(type) {
      console.log(type);
      // this.$store.commit('setFontStyle', type)
      setLocal("fontStyle", type)
    },
  },
};
</script>

<style lang="less" scoped>
.header-detail {
  position: fixed;
  top: 600px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow: auto;
  // height: 100%;
  background: rgba(88, 89, 90, 0.8);
  color: #ffffff;
  opacity: 1;
  backdrop-filter: blur(10px);
  border-radius: 5px;
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 1);
  }
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  .setting {
    .fontStyle {
      display: flex;
      .typeFont {
        border: 1px solid #f4f4f4;
        padding: 2px;
        border-radius: 2px;
        margin: 10px 15px  0;
      }
    }
    // .van-icon {
    //   font-size: 40px;
    //   margin: 10px 45px;
    // }
  }
  .detail-close {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 10px auto 0 auto;
    font-size: 20px;
    clear: flex;
  }
}
</style>