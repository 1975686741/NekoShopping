<template>
  <div class="product-list">
    <van-sticky>
      <NavBarVue @click-left-event="goBack" :title="navBarTitle"></NavBarVue>
    </van-sticky>
    <div class="img-banner">
      <img v-if="fromFlag === 'new'" :src="getAssetsImageUrl('images/new-list-banner.png')" alt="">
      <img v-else :src="getAssetsImageUrl('images/hot-list-banner.png')" alt="">
    </div>
    <div ref="container" class="sticky-container">
      <van-sticky :container="container" :offset-top="44">
        <TheTabbarVue @item-change="tabbarItemChange"></TheTabbarVue>
      </van-sticky>
    </div>

    <ProductListVue :list="productList"></ProductListVue>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavBarVue from '../../../components/NavBar.vue';
import TheTabbarVue from '../../../components/TheTabbar.vue';
import ProductListVue from '../../../components/ProductList.vue';
import { goodsList } from "@/api/home/newhot/index.js"
import { getAssetsImageUrl } from '@/utils/index.js'
const container = ref(null)
const route = useRoute()
const router = useRouter()
const navBarTitle = ref('') // 标题头
const fromFlag = ref('')
const isHot = ref('')
const isNew = ref('')
const order = ref('') // 排序asc 价格从小到大展示, desc 价格从大到小展示
const productList = ref([])
onMounted(async () => {
  fromFlag.value = route.query.flag
  if (fromFlag.value === 'hot') {
    navBarTitle.value = '人气推荐'
    isHot.value = '1'
  } else {
    navBarTitle.value = '新品首发'
    isNew.value = '1'
  }

  getProductList()
})

const getProductList = async () => {
  const res = await goodsList({
    isHot: isHot.value,
    isNew: isNew.value,
    order: order.value
  })
  productList.value = res.data
}
// 子组件 tabbar 点击事件触发
const tabbarItemChange = ({ index, status }) => {
  if (index !== 1) {
    order.value = ''
  } else {
    if (status === 'up') {
      order.value = 'asc'
    } else {
      order.value = 'desc'
    }
  }
  getProductList()
}
const goBack = () => {
  router.go(-1)
}
</script>


<style lang='scss' scoped>
.product-list {
  .img-banner {
    font-size: 0;

    img {
      width: 100%;
      height: 326px;
    }
  }

  .sticky-container {
    height: 100px;
  }
}
</style>
