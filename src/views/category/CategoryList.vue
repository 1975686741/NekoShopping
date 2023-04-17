<template>
  <div class="category-list">
    <VanSticky>
      <NavBarVue title="分类" @click-left-event="goBack"></NavBarVue>
      <van-tabs @click-tab="categoryChange" v-model:active="activeName">
        <van-tab
          v-for="item in navList"
          :key="item.id"
          :title="item.name"
          :name="item.name"
        ></van-tab>
      </van-tabs>
    </VanSticky>

    <!-- 标题 -->
    <div class="title-wrapper">
      <h2 class="title">{{ currentNav.name }}</h2>
      <p class="desc">{{ currentNav.front_desc }}</p>
    </div>
    <!-- 商品列表 -->
    <div v-if="productList.length > 0">
      <ProductListVue :list="productList"></ProductListVue>
    </div>
    <div v-else class="no-data">数据库暂无数据...</div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBarVue from "../../components/NavBar.vue";
import { categoryNav, goodsList } from "@/api/category";
import ProductListVue from "../../components/ProductList.vue";
const router = useRouter();
const route = useRoute();
const categoryId = ref("");
const currentNav = ref({});
const navList = ref([]);
const activeName = ref("");
const productList = ref([]);
// 返回
const goBack = () => {
  router.go(-1);
};
// 获取分类列表
const getCategoryNavList = async () => {
  const res = await categoryNav({ id: categoryId.value });
  currentNav.value = res.currentNav;
  navList.value = res.navData;
};
// 获取商品列表
const getProductList = async () => {
  const res = await goodsList({ categoryId: categoryId.value });
  currentNav.value = res.currentNav;
  productList.value = res.data;
};
// 分类点击事件
const categoryChange = ({ name, title }) => {
  categoryId.value = navList.value.find((nav) => nav.name === name).id;
  getProductList();
};
onMounted(() => {
  categoryId.value = route.query.id;
  activeName.value = route.query.name;
  getCategoryNavList();
  getProductList();
});
</script>
<style lang="scss" scoped>
.category-list {
  :deep(.van-tabs__line) {
    background-color: #cea62a;
  }
  .title-wrapper {
    margin: 26px auto 0;
    width: 710px;
    height: 150px;
    background: #f9f4e5;
    border: 1px solid rgba(235, 220, 173, 1);
    text-align: center;
    .title {
      margin-top: 29px;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #000000;
      letter-spacing: 0;
      font-weight: 500;
    }
    .desc {
      margin-top: 4px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #666666;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
  .no-data {
    margin-top: 122px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #999999;
    letter-spacing: 0;
    font-weight: 400;
    text-align: center;
  }
}
</style>
