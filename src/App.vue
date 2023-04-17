<script setup>
import { onMounted, watch, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
// 基于 vite 的静态资源引入方式为：
// 第一种：导入
// 适用于单个文件资源
// import homeIcon from './assets/icons/home.png'

// 第二种：new URL() + import.meta.url
// 适用于多个资源文件，动态传入文件路径
import { getAssetsImageUrl } from "@/utils/index.js";
const route = useRoute();
// 是否显示tabbar
const isShowTabbar = ref(true);
onMounted(() => {
  var userInfo = {
    openId: "66",
    nickName: "cats",
    avatarUrl:
      "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
  };

  var openId = userInfo.openId;

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  localStorage.setItem("openId", openId);
});
const tabbarItems = [
  {
    text: "首页",
    route: "/home",
    // active: './assets/icons/home-active.png',
    // inactive: './assets/icons/home.png'
    // inactive: homeIcon
    active: getAssetsImageUrl("icons/home-active.png"),
    inactive: getAssetsImageUrl("icons/home.png"),
  },
  {
    text: "分类",
    route: "/category",
    // active: './assets/icons/category-active.png',
    // inactive: './assets/icons/category.png'
    active: getAssetsImageUrl("icons/category-active.png"),
    inactive: getAssetsImageUrl("icons/category.png"),
  },
  {
    text: "购物车",
    route: "/cart",
    // active: './assets/icons/cart-active.png',
    // inactive: './assets/icons/cart.png'
    active: getAssetsImageUrl("icons/cart-active.png"),
    inactive: getAssetsImageUrl("icons/cart.png"),
  },
  {
    text: "我的",
    route: "/user",
    // active: './assets/icons/user-active.png',
    // inactive: './assets/icons/user.png'
    active: getAssetsImageUrl("icons/user-active.png"),
    inactive: getAssetsImageUrl("icons/user.png"),
  },
];
// 由于只有5个页面上有tabbar,所以监听路由来动态控制tabbar的显示与隐藏
watch(
  () => route.path,
  (to, from) => {
    const pathArr = ["/home", "/topic", "/category", "/cart", "/user"];
    if (pathArr.includes(to)) {
      isShowTabbar.value = true;
    } else {
      isShowTabbar.value = false;
    }
  }
);
</script>

<template>
  <!-- 
    在 3.2.34 或以上的版本中，
    使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，
    无需再手动声明。
    -->
  <router-view v-slot="{ Component, route }">
    <keep-alive include="CategoryView">
      <component :is="Component" :key="route.params.id" />
    </keep-alive>
  </router-view>

  <van-tabbar class="van-tabbar" v-if="isShowTabbar" route active-color="#e02d2d">
    <van-tabbar-item
      replace
      :to="item.route"
      v-for="item in tabbarItems"
      :key="item.text"
    >
      <span class="tabbar-text">{{ item.text }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

.tabbar-text {
  font-family: PingFangSC-Medium;
  font-size: 24px;
  letter-spacing: 0;
  font-weight: 500;
}
</style>
