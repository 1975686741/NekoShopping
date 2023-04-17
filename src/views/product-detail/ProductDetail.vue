<template>
  <div class="detail">
    <VanSticky>
      <NavBarVue @click-left-event="goBack" title="产品详情"></NavBarVue>
    </VanSticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in galleryList" :key="item.id">
        <img :src="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 商家承诺 -->
    <div class="seller-commit">
      <p>30天无忧退货</p>
      <p>48小时快速退款</p>
      <p>满88元免邮费</p>
    </div>
    <!-- 商品信息 -->
    <div class="info">
      <h1 class="name">{{ productInfo.name }}</h1>
      <p class="desc">{{ productInfo.goods_brief }}</p>
      <div class="price">￥{{ productInfo.retail_price }}</div>
      <div @click="chooseQuantityEvent" class="choose-quantity">
        <span>请选择规格数量</span>
        <img :src="getAssetsImageUrl('images/choose-detail-icon.png')" alt="" />
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="goods-params">
      <h1 class="title">商品参数</h1>
      <ul>
        <li class="item" v-for="item in attributeList" :key="item.name">
          <div class="name">{{ item.name }}</div>
          <div class="val">{{ item.value }}</div>
        </li>
      </ul>
    </div>
    <!-- 商品富文本 -->
    <img class="primary_pic" :src="productInfo.primary_pic_url" alt="" />
    <div class="goods-desc" v-html="productInfo.goods_desc"></div>
    <!-- 常见问题 -->
    <ul class="question-wrapper">
      <h1 class="title">常见问题</h1>
      <li class="item" v-for="item in issueList" :key="item.id">
        <h2 class="question">{{ item.question }}</h2>
        <div class="answer">{{ item.answer }}</div>
      </li>
    </ul>
    <!-- 大家都在看 -->
    <h1 class="title">大家都在看</h1>
    <div class="product-list">
      <ProductListVue :list="productList"></ProductListVue>
    </div>
    <!-- 商品导航 -->
    <div class="footer">
      <div class="icon-wrapper">
        <van-icon
          @click="doCollected"
          class="icon"
          :color="isCollected ? '#a04c19' : ''"
          name="star-o"
        />
        <van-icon
          class="icon"
          @click="goCartPage"
          :badge="allNumber"
          :name="getAssetsImageUrl('images/cart-detail-icon.png')"
        />
      </div>
      <div class="btn-container">
        <div class="item join-cart" @click="btnClickEvent('cart')">
          加入购物车
        </div>
        <div class="item buy-now" @click="btnClickEvent('bue')">立即购买</div>
      </div>
    </div>
    <!-- 弹出层 -->
    <div>
      <van-popup
        v-model:show="isShowMask"
        closeable
        position="bottom"
        :style="{ height: '30%' }"
      >
        <div class="choose-quantity-wrapper">
          <img :src="productInfo.primary_pic_url" alt="" />
          <div class="quantity-info">
            <p class="item">
              价格：<span class="price">￥{{ productInfo.retail_price }}</span>
            </p>
            <p class="item">数量：</p>
            <van-stepper v-model="buyNum" />
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import NavBarVue from "../../components/NavBar.vue";
import ProductListVue from "../../components/ProductList.vue";
import { detailaction, addcollect, addCart } from "@/api/product-detail";
import { submitAction } from "@/api/cart";
import { getAssetsImageUrl } from "@/utils/index.js";
import { showToast } from "vant";
const route = useRoute();
const router = useRouter();
const productId = ref("");
const galleryList = ref([]); // 轮播图列表
const productInfo = ref({});
const attributeList = ref([]); // 商品属性参数
const issueList = ref([]); // 常见问题列表
const productList = ref([]); // 商品列表
const isCollected = ref(false);
const allNumber = ref(0); // 购物车数量
const isShowMask = ref(false);
const buyNum = ref(1);
// 返回
const goBack = () => {
  router.go(-1);
};
// 获取商品详情
const getProductDetail = async () => {
  const res = await detailaction({
    id: productId.value,
    openId: localStorage.getItem("openId"),
  });
  galleryList.value = res.gallery;
  productInfo.value = res.info;
  attributeList.value = res.attribute;
  issueList.value = res.issue;
  productList.value = res.productList;
  isCollected.value = res.collected;
  allNumber.value = res.allnumber;
};
onMounted(() => {
  productId.value = route.params.id;
  getProductDetail();
});
// 由于在商品详情页面下面有推荐的商品
// 点击推荐的商品也要跳转到商品详情页面
// 路由配置是params
// 响应路由参数的变化 三种方式：
// 参考 route 官网 ：https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化
// 第一种：
/* watch(
  () => route.params,
  (newParams, oldParams) => {
    // console.log("newParams=>", newParams);
    // console.log("oldParams=>", oldParams);
    productId.value = newParams.id;
    getProductDetail();
  }
); */
// 第二种：
/* onBeforeRouteUpdate((to, from) => {
  // console.log("to=>", to);
  // console.log("from=>", from);
  productId.value = to.params.id;
  getProductDetail();
}); */
// 第三种：参看 App.vue 文件中 router-view 组件的 v-slot用法
// 请选择规格
const chooseQuantityEvent = () => {
  isShowMask.value = true;
};
// 收藏事件
const doCollected = async () => {
  const res = await addcollect({
    goodsId: productId.value,
    openId: localStorage.getItem("openId"),
  });
  // 重新获取收藏状态
  getProductDetail();
};
// 跳转到购物车页面
const goCartPage = () => {
  router.push({ name: "cart" });
};
// 添加购物车
const doAddCart = async () => {
  const res = await addCart({
    goodsId: productId.value,
    number: buyNum.value,
    openId: localStorage.getItem("openId"),
  });
  if (res.data === "success") {
    showToast("加入购物车成功");
    allNumber.value += buyNum.value;
  }
};
// 立即购买
const buyNow = async () => {
  const res = await submitAction({
    allPrise: buyNum.value * productInfo.value.retail_price,
    goodsId: productId.value,
    openId: localStorage.getItem("openId"),
  });
  if (res.data) {
    // 下单成功，跳转到订单确认页面
    router.push({ name: "OrderPay" });
  }
};
// 按钮点击事件
const btnClickEvent = (flag) => {
  if (isShowMask.value) {
    if (flag === "cart") {
      // 加入购物车
      doAddCart();
    } else {
      // 立即购买
      buyNow();
    }
  }

  isShowMask.value = true;
};
</script>
<style lang="scss" scoped>
@import "@/assets/common.scss";
.detail {
  padding-bottom: 132px;
  .my-swipe {
    img {
      width: 100%;
      height: 691px;
    }
  }
  // 商家承诺
  .seller-commit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    background: #434343;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
    font-weight: 400;
    p {
      position: relative;
      &::before {
        position: absolute;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 11px;
        height: 11px;
        box-sizing: border-box;
        border: 3px solid rgba(183, 166, 115, 1);
        border-radius: 50%;
      }
    }
  }
  // 商品信息
  .info {
    margin: 20px auto 0;
    padding: 0 35px;
    box-sizing: border-box;
    width: 710px;
    background-color: #ffffff;
    .name {
      @include textOverFlow;
      font-family: PingFangSC-Medium;
      font-size: 38px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      padding-top: 34px;
    }
    .desc {
      margin-top: 7px;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #999999;
      letter-spacing: 0;
      font-weight: 400;
    }
    .price {
      margin-top: 12px;
      font-family: PingFangSC-Medium;
      font-size: 34px;
      color: #9e4242;
      letter-spacing: 0;
      font-weight: 500;
    }
    .choose-quantity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 46px;
      width: 640px;
      height: 86px;
      border-top: 1px solid rgba(234, 234, 234, 1);
      span {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        letter-spacing: 0.82px;
        font-weight: 400;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  // 商品参数
  .goods-params {
    margin: 20px auto 0;
    width: 710px;
    background-color: #ffffff;
    padding: 0 34px 47px;

    box-sizing: border-box;
    overflow: hidden;
    .title {
      margin-top: 40px;
      font-family: PingFangSC-Medium;
      font-size: 38px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 34px;
      margin-bottom: 10px;
      height: 68px;
      .name {
        @include textOverFlow;
        width: 104px;
        height: 37px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
      }
      .val {
        @include textOverFlow;
        width: 509px;
        height: 100%;
        background: #f8f8f8;
        border: 1px solid rgba(223, 223, 223, 1);
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
        text-indent: 77px;
        line-height: 68px;
      }
    }
  }
  // 富文本渲染
  .primary_pic {
    width: 100%;
    height: 338px;
  }
  .goods-desc {
    margin-top: 30px;
    padding: 0 20px;
    :deep(img) {
      width: 100%;
    }
  }
  // 常见问题
  .question-wrapper {
    overflow: hidden;
    padding: 0 38px 60px;
    box-sizing: border-box;
    background-color: #ffffff;
    .title {
      margin-top: 40px;
      font-family: PingFangSC-Medium;
      font-size: 38px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      text-align: center;
    }
    .item {
      list-style: disc;
      color: #9e4242;
      margin-top: 40px;
      margin-left: 38px;
      .question {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 500;
      }
      .answer {
        margin-top: 15px;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
  }
  // 大家都在看
  .title {
    margin: 46px 0 36px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 38px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
  }
  // 商品导航
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 132px;
    background: #ffffff;
    border-top: 1px solid rgba(233, 233, 233, 1);
    .icon-wrapper {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 61px;
      margin-right: 95px;
      height: 72px;
      .icon {
        width: 58px;
        height: 58px;
      }
      :deep(.van-badge--top-right) {
        top: 5px;
        right: 10px;
      }
    }
    .btn-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 22px;
      height: 72px;
      .item {
        width: 190px;
        height: 100%;
        font-family: PingFangSC-Medium;
        font-size: 26px;
        color: #ffffff;
        letter-spacing: 0;
        font-weight: 500;
        text-align: center;
        line-height: 72px;
      }
      .join-cart {
        background: #cea62a;
        border-radius: 35.75px 0px 0px 35.75px;
      }
      .buy-now {
        background: #a04c19;
        border-radius: 0px 35.75px 35.75px 0px;
      }
    }
  }
}
:deep(.van-popup--bottom) {
  bottom: 65px;
}
.choose-quantity-wrapper {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 72px 61px;
  img {
    width: 196px;
    height: 196px;
    margin-right: 66px;
  }
  .quantity-info {
    .item {
      margin-bottom: 32px;
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      .pirce {
        font-family: PingFangSC-Medium;
        font-size: 34px;
        color: #9e4242;
        letter-spacing: 0;
        font-weight: 500;
      }
    }
  }
}
</style>
