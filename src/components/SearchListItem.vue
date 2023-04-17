<template>
  <div>
    <li @click="itemClickEvent" class="list-item">
      <span class="name"> {{ itemContent }} </span>
      <img :src="getAssetsImageUrl('images/forward-search-icon.png')" alt="" />
    </li>
  </div>
</template>
<script setup>
import { getAssetsImageUrl } from "@/utils/index.js";
const emit = defineEmits(["itemClick"]);
const props = defineProps({
  itemContent: {
    type: String,
    required: true,
  },
});
const itemClickEvent = () => {
  emit("itemClick");
};
</script>
<style lang="scss" scoped>
// 输入框搜索结果列表

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  height: 93px;
  padding: 0 32.79px 0 52px;
  list-style: none;
  background-color: #fff;
  .name {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
  }

  img {
    width: 25.21px;
    height: 26px;
  }
}
</style>
