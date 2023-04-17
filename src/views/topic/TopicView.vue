<template>
  <div class="topic">
    <van-sticky>
      <NavBarVue
        left-title=""
        :is-show-left-arrow="false"
        title="专题"
      ></NavBarVue>
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
          v-for="item in topicList"
          :to="{ name: 'TopicDetail', query: { id: item.id } }"
          custom
          v-slot="{ href, navigate }"
        >
          <li @click="navigate" :href="href" class="item" :key="item.id">
            <img :src="item.scene_pic_url" alt="" />
            <div class="info">
              <p class="title">{{ item.title }}</p>
              <p class="subtitle">{{ item.subtitle }}</p>
              <p class="price">{{ item.price_info }}元起</p>
            </div>
          </li>
        </RouterLink>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBarVue from "../../components/NavBar.vue";
import { listaction } from "@/api/topic";
const pageNum = ref(1); // 当前第几页数据
const topicList = ref([]); // 数据列表
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
// 获取数据列表
const getTopicList = async () => {
  const res = await listaction({ page: pageNum.value });
  topicList.value.push(...res.data);
  // 获取数据后 loading 重置为 false
  loading.value = false;
  // 获取下一页数据
  pageNum.value++;
  if (pageNum.value > res.total) {
    // 数据获取完后 finished 置为 true
    finished.value = true;
  }
};
const onLoad = () => {
  if (refreshing.value) {
    topicList.value = [];
    refreshing.value = false;
  }
  getTopicList();
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  topicList.value = [];
  pageNum.value = 1;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style lang="scss" scoped>
.topic {
  padding-bottom: 100px;
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
        font-family: PingFangSC-Regular;
        text-align: center;
        .title {
          margin-top: 32px;
          font-size: 30px;
          color: #333333;
          font-weight: 500;
        }
        .subtitle {
          margin-top: 4px;
          font-size: 26px;
          color: #999999;
          font-weight: 400;
        }
        .price {
          margin-top: 16px;
          padding-bottom: 29px;
          font-family: PingFangSC-Semibold;
          font-size: 26px;
          color: #9e4242;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
