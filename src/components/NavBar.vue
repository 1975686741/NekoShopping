<template>
  <div class="nav-bar">
    <van-nav-bar
      @click-left="clickLeft"
      :title="title"
      :left-text="leftTitle"
      :left-arrow="isShowLeftArrow"
    >
    </van-nav-bar>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  leftTitle: {
    type: String,
    default: "返回",
  },
  isShowLeftArrow: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["clickLeftEvent"]);
const clickLeft = () => {
  emit("clickLeftEvent");
};
</script>

<style lang="scss" scoped>
.nav-bar {
  :deep(.van-nav-bar) {
    height: 88px;
    
    .van-icon {
      color: #000;
    }
  }

  :deep(.van-nav-bar__text) {
    font-family: PingFangSC-Regular;
    font-size: 31.2px;
    color: #666666;
    letter-spacing: 0;
    font-weight: 400;
  }

  :deep(.van-nav-bar__title) {
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
  }
}
</style>
