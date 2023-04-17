<template>
  <div class="product-list">
    <RouterLink
      v-for="item in list"
      :key="item.id"
      custom
      :to="{
        name: 'ProductDetail',
        params: { id: item.id },
        replace: isProductDetialPage,
      }"
      v-slot="{ href, navigate }"
    >
      <div :href="href" @click="navigate" class="item">
        <img :src="item.list_pic_url" alt="" />
        <div class="name">{{ item.name }}</div>
        <div class="price">￥{{ item.retail_price }}</div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
defineProps({
  list: {
    type: Array,
    required: true,
    default: () => {
      return [];
    },
  },
});
const isProductDetialPage = ref(false);
const route = useRoute();
onMounted(() => {
  // 当从 商品详情页面 跳转到  商品详情页面 时，用 replace 跳转
  if (route.name === "ProductDetail") {
    isProductDetialPage.value = true;
  } else {
    isProductDetialPage.value = false;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/common.scss";

.product-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 47px 10px;
  margin-top: 20px;
  padding: 0 20px;

  .item {
    img {
      width: 350px;
      height: 350px;
      background-color: #fff;
    }

    .name {
      margin-top: 17px;
      @include textOverFlow;
      font-family: PingFangSC-Medium;
      font-size: 26px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      width: 350px;
    }

    .price {
      margin-top: 5px;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #9e4242;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
}
</style>
