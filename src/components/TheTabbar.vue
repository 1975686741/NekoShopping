<template>
  <div class="tabbar">
    <div
      @click="onTabbarChange(index)"
      class="item"
      v-for="(item, index) in list"
      :key="item.text"
    >
      <p class="text" :class="index === current ? 'active' : ''">
        {{ item.text }}
      </p>
      <div class="arrow-container" v-if="index === 1">
        <van-icon
          name="arrow-up"
          size="12"
          class="icon-up"
          :color="status === 'up' ? '#CEA62A' : ''"
        />
        <van-icon
          name="arrow-down"
          size="12"
          class="icon-down"
          :color="status === 'down' ? '#CEA62A' : ''"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["itemChange"]);
const list = [
  {
    text: "综合",
  },

  {
    text: "价格",
  },
  {
    text: "分类",
  },
];
const status = ref("default"); // 箭头状态：default up down

const current = ref(0);
// tabbar点击事件
const onTabbarChange = (index) => {
  current.value = index;
  if (status.value === "default" || status.value === "down") {
    status.value = "up";
  } else if (status.value === "up") {
    status.value = "down";
  }
  // 如果点击的不是 价格 箭头状态重置为 default
  if (current.value !== 1) {
    status.value = "default";
  }
  emit("itemChange", { index: current.value, status: status.value });
};
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  background-color: #fff;

  .item {
    display: flex;
    align-items: center;
    height: 100%;

    .text {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #212121;
      font-weight: 400;
    }

    .active {
      font-family: PingFangSC-Medium;
      color: #cea62a;
      font-weight: 500;
    }

    .arrow-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      :deep(.van-icon-arrow-up) {
        top: 8px;
      }

      :deep(.van-icon-arrow-down) {
        top: -3px;
      }
    }
  }
}
</style>
