<template>
  <div class="mine">
    <div class="userInfo">
      <img
        src="../../assets/images/user.jpg"
        alt=""
      />
      <span>尊贵的Vip</span>
    </div>
    <div class="listBox">
      <dl
        class="item"
        @click="goPage(item.path)"
        v-for="item in list"
        :key="item.name"
      >
        <dt><img :src="item.icon" alt="" /></dt>
        <dd>{{ item.name }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { getAssetsImageUrl } from "@/utils/index.js";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { usePageCommunication } from "@/stores/pageCommunication.js";
const pageCommunicationStore = usePageCommunication();
const router = useRouter();
const list = [
  {
    name: "我的订单",
    icon: getAssetsImageUrl("images/user/order.png"),
    path: "",
  },
  {
    name: "优惠券",
    icon: getAssetsImageUrl("images/user/coupon.png"),
    path: "",
  },
  {
    name: "我的足迹",
    icon: getAssetsImageUrl("images/user/history.png"),
    path: "",
  },
  {
    name: "我的收藏",
    icon: getAssetsImageUrl("images/user/collect.png"),
    path: "/user/collection",
  },
  {
    name: "地址管理",
    icon: getAssetsImageUrl("images/user/address.png"),
    path: "/address",
  },
  {
    name: "联系客服",
    icon: getAssetsImageUrl("images/user/service.png"),
    path: "",
  },
  {
    name: "帮助中心",
    icon: getAssetsImageUrl("images/user/help.png"),
    path: "",
  },
  {
    name: "意见反馈",
    icon: getAssetsImageUrl("images/user/feedback.png"),
    path: "/user/feedback",
  },
];
const goPage = (value) => {
  if (!value) {
    showToast("抓紧开发中...");
    return;
  }
  if (value === "/address") {
    pageCommunicationStore.updateFrom("/user");
  }
  router.push(value);
};
</script>

<style lang="scss" scoped>
.mine {
  .userInfo {
    padding: 83px 35px;
    background-image: linear-gradient(#191919, #595959);
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ffffff;
    letter-spacing: 0;
    display: flex;
    align-items: center;
    img {
      width: 145px;
      height: 145px;
      margin-right: 35px;
      border-radius: 100%;
      overflow: hidden;
    }
  }
  .listBox {
    width: 710px;
    margin: 34px auto 0;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    .item {
      width: 25%;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #333333;
      letter-spacing: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 43px 0;
      margin-bottom: 31px;
      img {
        width: 58px;
        height: 58px;
        margin-bottom: 9px;
      }
    }
  }
}
</style>
