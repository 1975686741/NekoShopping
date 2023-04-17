<template>
  <div class="order">
    <VanSticky>
      <NavBarVue @click-left-event="goBack" title="确认订单"></NavBarVue>
    </VanSticky>
    <!-- 地址 -->
    <div v-if="address.id">
      <AddressListItemVue
        :address="address"
        :icon-path="ArrowRightPath"
        @item-click="goAddressManagePage"
      ></AddressListItemVue>
    </div>
    <div v-else class="choose-address">
      <van-cell
        title="选择收货地址"
        is-link
        :to="{ name: 'AddressManage', replace }"
      />
    </div>

    <!-- 商品列表 -->
    <ul class="cart-list">
      <li class="item" v-for="item in goodsList" :key="item.id">
        <img :src="item.list_pic_url" alt="" />
        <div class="info">
          <p class="name">{{ item.goods_name }}</p>
          <div class="extra-info">
            <p class="price">￥{{ item.retail_price }}</p>
            <p class="number">x {{ item.number }}</p>
          </div>
        </div>
      </li>
    </ul>
    <!-- 其他信息 -->
    <ul class="product-info">
      <li class="item">
        <span>商品合计</span>
        <span>￥{{ allPrise }}</span>
      </li>
      <li class="item">
        <span>运费</span>
        <span>免运费</span>
      </li>
      <li class="item">
        <span>优惠券</span>
        <span>暂无</span>
      </li>
    </ul>
    <!-- 支付 -->
    <div class="pay">
      <div class="info">
        <span class="text">实付：</span>
        <span class="money">￥{{ allPrise }}</span>
      </div>
      <button class="btn" @click="pay">支付</button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavBarVue from "../../components/NavBar.vue";
import { detailAction } from "@/api/pay";
import ArrowRightPath from "@/assets/images/forward-search-icon.png";
import AddressListItemVue from "../../components/AddressListItem.vue";
import { showToast } from "vant";
import { usePageCommunication } from "@/stores/pageCommunication.js";
const pageCommunicationStore = usePageCommunication();
const router = useRouter();
const route = useRoute();
const address = ref({});
const goodsList = ref([]);
const allPrise = ref(0);

// 返回
const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  // 判断是否从 地址管理页面 选中地址后返回的
  const flag = route.query.flag;
  if (flag) {
    // 从本地缓存中取数据
    address.value = JSON.parse(localStorage.getItem("address"));
  }
  const res = await detailAction({
    openId: localStorage.getItem("openId"),
    addressId: "",
  });
  if (!flag) {
    address.value = res.address;
  }
  goodsList.value = res.goodsList;
  allPrise.value = res.allPrise;
});
// 跳转到地址管理页面
const goAddressManagePage = () => {
  pageCommunicationStore.updateFrom("/order");
  router.replace({ name: "AddressManage" });
};
const pay = () => {
  if (address.value.id) {
    showToast("该功能暂未开放！");
  } else {
    showToast("请选择收货地址！！！");
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/common.scss";
.order {
  .choose-address {
    margin-top: 20px;
  }
  // 商品列表
  .cart-list {
    padding: 0 20px;
    list-style: none;
    overflow: auto;
    .item {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 20px;
      background-color: #fff;
      width: 710px;
      height: 253px;

      img {
        width: 174px;
        height: 169px;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 35px;
        padding-right: 33px;
        box-sizing: border-box;
        height: 169px;
        .name {
          @include textOverFlow;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #333333;
          letter-spacing: 0;
          font-weight: 400;
        }
        .extra-info {
          display: flex;
          justify-content: space-between;
          .price {
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #9e4242;
            letter-spacing: 0;
            font-weight: 500;
          }
          .number {
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #333333;
            letter-spacing: 0;
            font-weight: 400;
          }
        }
      }
    }
  }
  // 其他信息
  .product-info {
    margin-top: 26px;
    padding: 0 20px 0 28px;
    background-color: #fff;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 82px;
      border-bottom: 1px solid rgba(214, 214, 214, 1);
      box-sizing: border-box;
      color: #333333;
      span:first-child {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        font-weight: 400;
      }
      span:last-child {
        font-family: PingFangSC-Medium;
        font-size: 26px;
        font-weight: 500;
      }
    }
  }
  .pay {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    height: 132px;
    background-color: #fff;
    .info {
      height: 100%;
      display: flex;
      align-items: center;
      .text {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
      }
      .money {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #9e4242;
        letter-spacing: 0;
        font-weight: 500;
      }
    }
    .btn {
      display: block;
      margin-left: 41px;
      width: 193px;
      height: 72px;
      background: #cea62a;
      border-radius: 44.5px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 400;
      border: none;
    }
  }
}
</style>
