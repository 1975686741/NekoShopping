<template>
  <div class="detail">
    <van-sticky>
      <NavBarVue @click-left-event="goBack" title="专题详情"></NavBarVue>
    </van-sticky>
    <div v-if="topicDetail.content" v-html="topicDetail.content"></div>
    <!-- 专题推荐 -->
    <div class="title">专题推荐</div>
    <ul class="list-container">
      <li class="item" v-for="item in recomList" :key="item.id">
        <img :src="item.scene_pic_url" alt="" />
        <div class="info">
          <p class="name">{{ item.title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { detailaction } from "@/api/topic";
import { useRoute, useRouter } from "vue-router";
import NavBarVue from "../../components/NavBar.vue";
const route = useRoute();
const router = useRouter();
const topicDetail = ref({});
const recomList = ref([]);
const goBack = () => {
  router.go(-1);
};
onMounted(async () => {
  const res = await detailaction({ id: route.query.id });
  topicDetail.value = res.data;
  recomList.value = res.recommendList;
});
</script>
<style lang="scss" scoped>
.detail {
  :deep(img) {
    width: 100%;
  }
  .title {
    font-family: PingFangSC-Medium;
    font-size: 38px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
    padding: 60px 0 40px 0;
    text-align: center;
  }
  .list-container {
    padding: 0 20px;
    .item {
      margin-top: 20px;
      width: 710px;
      list-style: none;
      img {
        width: 100%;
        height: 343px;
      }
      .info {
        width: 100%;
        background-color: #fff;

        .name {
          padding: 31px 42px 53px;
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #333333;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
