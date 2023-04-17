<template>
  <div>
    <van-sticky>
      <NavBarVue @click-left-event="goBack" title="我的收藏"></NavBarVue>
    </van-sticky>
    <ProductList :list="list"></ProductList>
  </div>
</template>

<script setup>
import { listAction } from "@/api/user/collection";
import { useRouter } from "vue-router";

import ProductList from "@/components/ProductList.vue";
import NavBarVue from "@/components/NavBar.vue";

import { onMounted, ref } from "@vue/runtime-core";
const router = useRouter();

const list = ref([]);
onMounted(async () => {
  var res = await listAction({
    openId: localStorage.getItem("openId"),
  });
  list.value = res.collectGoodsList;
});

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss"></style>
