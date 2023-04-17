<template>
  <div class="cart">
    <VanSticky>
      <NavBarVue
        :is-show-left-arrow="false"
        left-title=""
        title="购物车"
      ></NavBarVue>
    </VanSticky>
    <!-- 商家承诺 -->
    <div class="seller-commit">
      <p>30天无忧退货</p>
      <p>48小时快速退款</p>
      <p>满88元免邮费</p>
    </div>
    <!-- 购物车列表 -->
    <ul class="cart-list">
      <van-swipe-cell v-for="item in cartListData" :key="item.id">
        <li class="item">
          <div class="checkbox">
            <van-checkbox
              v-model="item.checked"
              checked-color="#cea62a"
            ></van-checkbox>
          </div>
          <img :src="item.list_pic_url" alt="" />
          <div class="info">
            <p class="name">{{ item.goods_name }}</p>
            <div class="extra-info">
              <p class="price">￥{{ item.retail_price }}</p>
              <van-stepper v-model="item.number" />
            </div>
          </div>
        </li>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="deleteCartItemById(item.id)"
          />
        </template>
      </van-swipe-cell>
    </ul>

    <!-- 全选和下单 -->
    <div class="footer">
      <div class="all-checked">
        <van-checkbox v-model="allChecked" checked-color="#cea62a"
          >全选</van-checkbox
        >
      </div>
      <div class="total-price">
        合计：<span class="price">￥{{ totalPrice }}</span>
        <button class="submit-order" @click="submitOrder">下单</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import NavBarVue from "../../components/NavBar.vue";
import { cartList, deleteAction, submitAction } from "@/api/cart";
import { showConfirmDialog, showToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const cartListData = ref([]);
onMounted(async () => {
  const res = await cartList({ openId: localStorage.getItem("openId") });
  res.data.forEach((item) => (item.checked = false));
  cartListData.value = res.data;
});
// 是否全选
const allChecked = computed({
  get() {
    return cartListData.value.every((item) => item.checked);
  },
  set(val) {
    cartListData.value.forEach((item) => (item.checked = val));
  },
});
// 计算总价
const totalPrice = computed(() => {
  return cartListData.value.reduce((total, current) => {
    if (current.checked) {
      return total + current.retail_price * current.number;
    } else {
      return total;
    }
  }, 0);
});
// 通过 id 删除购物车
const deleteCartItemById = async (id) => {
  showConfirmDialog({
    title: "提示",
    message: "删除后不可恢复，确定删除吗？",
  })
    .then(async () => {
      // on confirm
      const res = await deleteAction({ id });
      if (res.data) {
        showToast("删除成功");
        // 刷新列表
        cartListData.value = cartListData.value.filter(
          (item) => item.id !== id
        );
      }
    })
    .catch(() => {
      // on cancel
      showToast("你点击了取消！");
    });
};
// 下单事件
const submitOrder = async () => {
  const goodsId = cartListData.value
    .filter((item) => item.checked)
    .map((ele) => ele.goods_id)
    .join(",");

  if (!cartListData.value.some((item) => item.checked)) {
    showToast("至少要选择1个商品");
    return;
  }
  const res = await submitAction({
    allPrise: totalPrice.value,
    goodsId: goodsId,
    openId: localStorage.getItem("openId"),
  });
  if (res.data) {
    // 下单成功，跳转到订单确认页面
    router.push({ name: "OrderPay" });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/common.scss";
.cart {
  padding-bottom: 236px;
  // 商家承诺
  .seller-commit {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 20px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #333333;
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
  // 购物车列表
  .cart-list {
    padding: 0 20px;
    list-style: none;
    height: calc(100vh - 450px);
    overflow: auto;
    .item {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 20px;
      background-color: #fff;
      width: 710px;
      height: 253px;
      .checkbox {
        display: flex;
        justify-content: center;
        width: 87px;
      }
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
        overflow: hidden;
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
          :deep(.van-stepper) {
            display: flex;
            align-items: center;
            width: 137px;
            height: 40px;
            border: 1px solid rgba(229, 229, 229, 1);
            border-radius: 6px;
            box-sizing: border-box;
            .van-stepper__minus,
            .van-stepper__plus,
            .van-stepper__input {
              margin: 0;
              width: 45px;
              height: 100%;
              background-color: #fff;
              font-size: 10px;
            }
            .van-stepper__input {
              border-left: 1px solid rgba(229, 229, 229, 1);
              border-right: 1px solid rgba(229, 229, 229, 1);
            }
          }
        }
      }
    }
    .delete-button {
      height: 253px;
    }
  }
  // 全选和下单
  .footer {
    position: fixed;
    bottom: 100px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 136px;
    padding: 0 20px 0 25px;
    box-sizing: border-box;
    background-color: #fff;
    .all-checked {
      :deep(.van-checkbox__label) {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #999999;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
    .total-price {
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #999999;
      letter-spacing: 0;
      font-weight: 400;
      .price {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #9e4242;
        letter-spacing: 0;
        font-weight: 500;
      }
    }
    .submit-order {
      margin-left: 38px;
      width: 193px;
      height: 72px;
      background: #cea62a;
      border-radius: 35.75px;
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
