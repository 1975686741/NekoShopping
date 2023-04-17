<template>
  <div class="brand">
    <van-sticky>
      <NavBarVue @click-left-event="goBack" title="品牌制造商"></NavBarVue>
    </van-sticky>

    <!-- 数据列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="list-container"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <RouterLink
          v-for="item in brandList"
          :to="{ name: 'BrandDetail', query: { id: item.id } }"
          custom
          v-slot="{ href, navigate }"
        >
          <li @click="navigate" :href="href" class="item" :key="item.id">
            <img :src="item.app_list_pic_url" alt="" />
            <div class="info">
              <span>{{ item.name }}</span> <span>|</span>
              <span>{{ item.floor_price }}元起</span>
            </div>
          </li>
        </RouterLink>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBarVue from "../../../components/NavBar.vue";
import { listaction } from "@/api/home/brand";
const router = useRouter();
const pageNum = ref(1); // 当前第几页数据
const brandList = ref([]); // 数据列表
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const goBack = () => {
  router.go(-1);
};
// 获取数据列表
const getBrandList = async () => {
  const res = await listaction({ page: pageNum.value });
  brandList.value.push(...res.data);
  // 获取数据后 loading 重置为 false
  loading.value = false;
  // 获取下一页数据
  pageNum.value++;
  if (pageNum.value > res.total) {
    // 数据获取完后 finished 置为 true
    finished.value = true;
  }
};
onMounted(() => {
  // getBrandList();
});
const onLoad = () => {
  if (refreshing.value) {
    brandList.value = [];
    refreshing.value = false;
  }
  getBrandList();
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  brandList.value = [];
  pageNum.value = 1;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>
<style lang="scss" scoped>
.brand {
  .list-container {
    padding: 0 20px;
    .item {
      margin-top: 20px;
      width: 710px;
      height: 400px;
      list-style: none;
      img {
        width: 100%;
        height: 100%;
      }
      .info {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.1);
        span {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          letter-spacing: 0;
          font-weight: 500;
          &:nth-child(2) {
            margin: 0 10px;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>
