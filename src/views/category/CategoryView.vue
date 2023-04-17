<template>
  <div class="category">
    <van-sticky>
      <div class="search">
        <SearchInputVue placeholder="搜索商品，共239款好物"></SearchInputVue>
      </div>
    </van-sticky>
    <!-- 分类 -->
    <div class="category-container">
      <div class="category-left">
        <ul>
          <li
            class="item"
            :class="current === index ? 'active' : ''"
            v-for="(item, index) in categoryList"
            :key="item.id"
            @click="changeCategory(index, item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="category-right">
        <div class="banner">
          <img :src="currentCategoryObj.banner_url" alt="" />
        </div>
        <h2 class="title">{{ currentCategoryObj.name }}分类</h2>
        <div class="sub-list">
          <div
            class="item"
            v-for="item in currentCategoryObj.subList"
            :key="item.id"
            @click="goCategoryList(item.id, item.name)"
          >
            <img :src="item.wap_banner_url" alt="" />
            <h4 class="name">{{ item.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { indexaction, currentaction } from "@/api/category";
import SearchInputVue from "../../components/SearchInput.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const categoryList = ref([]);
const current = ref(0); // 当前选中的分类下标
const categoryId = ref("");
const currentCategoryObj = ref({});
onMounted(async () => {
  const res = await indexaction();
  categoryList.value = res.categoryList;
  categoryId.value = categoryList.value[0].id;
  getSubCategory();
});
// 获取二级分类数据
const getSubCategory = async () => {
  const result = await currentaction({ id: categoryId.value });
  currentCategoryObj.value = result.data.currentOne;
};
// 一级分类点击事件
const changeCategory = (index, id) => {
  current.value = index;
  categoryId.value = id;
  getSubCategory();
};
// 二级分类点击事件，跳转到分类列表页面
const goCategoryList = (id, name) => {
  router.push({ name: "CategoryList", query: { id, name } });
};
</script>

<style lang="scss" scoped>
.category {
  padding-bottom: 100px;
  .search {
    padding: 8px 18px 41px 22px;
    background-color: #fff;
  }
  .category-container {
    display: flex;
    height: calc(100vh - 120px);
    overflow: auto;
    margin-top: 1px;
    .category-left {
      width: 164px;
      height: 100%;
      background-color: #fff;
      .item {
        list-style: none;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
        font-weight: 400;
        text-align: center;
        padding-top: 64px;
      }
      .active {
        font-family: PingFangSC-Semibold;
        color: #cea62a;
        font-weight: 600;
      }
    }
    .category-right {
      flex: 1;
      height: 100%;
      .banner {
        padding: 20px 20px 0 20px;
        img {
          width: 546px;
          height: 217.85px;
        }
      }
      .title {
        position: relative;
        margin: 73.15px auto 0;
        width: 120px;
        height: 42px;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 500;
        text-align: center;
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: -1;
          content: "";
          width: 100%;
          height: 16px;
          background-color: #b7a673;
        }
      }
      .sub-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28.5px 40.01px;
        margin-top: 28.5px;
        padding: 0 48px;
        .item {
          width: 140px;
          img {
            width: 100%;
            height: 140px;
          }
          .name {
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #333333;
            letter-spacing: 0;
            font-weight: 500;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
