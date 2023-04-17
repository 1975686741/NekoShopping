<template>
  <div class="detail">
    <van-sticky>
      <NavBarVue @click-left-event="goBack" title="品牌制造商"></NavBarVue>
    </van-sticky>
    <div class="banner">
      <img :src="brandDetail.app_list_pic_url" alt="" />
      <div class="title">{{ brandDetail.name }}</div>
      <div class="desc">{{ brandDetail.simple_desc }}</div>
    </div>
    <!-- 商品列表 -->
    <div class="product-list-contianer" v-if="productList.length > 0">
      <ProductListVue :list="productList"></ProductListVue>
    </div>
    <div class="no-data" v-else>数据库暂无数据...</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { detailaction } from "@/api/home/brand";
import { useRoute, useRouter } from "vue-router";
import NavBarVue from "../../../components/NavBar.vue";
import ProductListVue from "../../../components/ProductList.vue";
const route = useRoute();
const router = useRouter();
const brandDetail = ref({});
const productList = ref([]);
const goBack = () => {
  router.go(-1);
};
onMounted(async () => {
  const res = await detailaction({ id: route.query.id });
  brandDetail.value = res.data;
  productList.value = res.goodsList;
});
</script>
<style lang="scss" scoped>
.detail {
  .banner {
    width: 100%;
    img {
      width: 100%;
      height: 325.6px;
    }
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 232px;
      height: 90px;
      border: 4px solid rgba(255, 255, 255, 1);
      box-sizing: border-box;
      color: #fff;
      font-size: 32px;
      font-weight: 700;
      text-align: center;
      line-height: 90px;
    }
    .desc {
      padding: 43px 61px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #666666;
      letter-spacing: 0;
      font-weight: 400;
      background-color: #fff;
    }
  }
  .no-data {
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #999999;
    letter-spacing: 0;
    font-weight: 400;
    padding-top: 122px;
  }
}
</style>
