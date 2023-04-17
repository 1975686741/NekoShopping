<template>
  <div class="address-management">
    <VanSticky>
      <NavBarVue @click-left-event="goBack" title="地址管理"></NavBarVue>
    </VanSticky>
    <!-- 地址列表 -->
    <ul class="address-list-container">
      <van-swipe-cell v-for="item in addressList" :key="item.id">
        <li class="item" @click="chooseAddress(item)">
          <h2 class="name">{{ item.name }}</h2>
          <div class="detail-info">
            <div class="extra-info">
              <div class="phone">{{ item.mobile }}</div>
              <div class="default" v-if="item.is_default === 1">默认</div>
            </div>
            <div class="detail">
              <p>{{ item.address }}</p>
              <p>{{ item.address_detail }}</p>
            </div>
          </div>
          <div class="edit" @click.stop="goAddressDetail('edit', item.id)">
            <img :src="EditIconPath" alt="" />
          </div>
        </li>
        <template #right>
          <van-button
            @click="deleteAddressById(item.id)"
            square
            text="删除"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </ul>
    <!-- 新建地址 -->
    <button class="btn" @click="goAddressDetail('add', '')">+ 新建地址</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBarVue from "../../../components/NavBar.vue";
import { getListAction, deleteAction } from "@/api/user/address";
import EditIconPath from "@/assets/images/edit-address-icon.png";
import { usePageCommunication } from "@/stores/pageCommunication.js";
import { showToast, showConfirmDialog } from "vant";
const pageCommunicationStore = usePageCommunication();
const router = useRouter();
const addressList = ref([]);
const from = ref(""); // 从哪个页面来
// 返回
const goBack = () => {
  router.go(-1);
};
onMounted(async () => {
  const res = await getListAction({ openId: localStorage.getItem("openId") });
  addressList.value = res.data;
  from.value = pageCommunicationStore.getFrom;
});

// 选中地址
const chooseAddress = (item) => {
  // 将选中的地址保存在本地，返回到支部订单页面后再从本地取出来
  // 返回订单支付页面
  if (from.value === "/user") {
    // 如果从我的页面进来，直接返回
    router.replace({ path: "/user" });
  } else {
    window.localStorage.setItem("address", JSON.stringify(item));
    router.replace({ name: "OrderPay", query: { flag: 1 } });
  }
};
// 跳转到新增/修改地址页面
const goAddressDetail = (flag, id) => {
  router.push({ name: "AddressDetail", params: { flag, id } });
};
// 删除地址
const deleteAddressById = (id) => {
  showConfirmDialog({
    title: "提示",
    message: "删除后将无法找回，是否删除！！！",
  })
    .then(async () => {
      const res = await deleteAction({ id });
      if (res.data) {
        const index = addressList.value.findIndex((item) => item.id === id);
        addressList.value.splice(index, 1);
        showToast("删除成功");
      }
    })
    .catch(() => {
      showToast("你点击了取消！");
    });
};
</script>
<style lang="scss" scoped>
@import "@/assets/common.scss";
.address-management {
  .address-list-container {
    margin: 30.5px auto 0;
    width: 710px;
    height: calc(100vh - 350px);
    overflow: auto;
    list-style: none;
    .item {
      display: flex;
      justify-content: start;
      padding: 52px 51px 36px 34px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(223, 223, 223, 1);
      background-color: #fff;

      .name {
        @include textOverFlow;
        width: 100px;
        font-family: PingFangSC-Semibold;
        font-size: 30px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 600;
      }
      .detail-info {
        margin-left: 21px;
        .extra-info {
          display: flex;
          .phone {
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #333333;
            letter-spacing: 0;
            font-weight: 400;
          }
          .default {
            margin-left: 24px;
            width: 100px;
            height: 40px;
            border: 1px solid rgba(158, 66, 66, 1);
            box-sizing: border-box;
            border-radius: 4px;
            font-size: 20px;
            color: rgba(158, 66, 66, 1);
            text-align: center;
            line-height: 40px;
          }
        }
        .detail {
          margin-top: 16px;
          width: 383px;
          height: 80px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #999999;
          letter-spacing: 0;
          font-weight: 400;
          p {
            @include textOverFlow;
          }
        }
      }
      .edit {
        margin-left: 80px;
        margin-top: 57px;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .delete-button {
      height: 224px;
    }
  }
  // 新建地址
  .btn {
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    width: 710px;
    height: 90px;
    background: #cea62a;
    border-radius: 44.5px;
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #ffffff;
    letter-spacing: 0;
    font-weight: 500;
    border: none;
  }
}
</style>
