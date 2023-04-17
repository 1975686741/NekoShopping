<template>
  <div class="detail">
    <VanSticky>
      <NavBarVue @click-left-event="goBack" :title="title"></NavBarVue>
    </VanSticky>
    <!-- 地址收集表单 -->
    <div class="collected-info">
      <div class="item">
        <label class="label-text" for="userName">收货人</label>
        <input id="userName" type="text" v-model.trim="userName" />
      </div>
      <div class="item">
        <label class="label-text" for="telNumber">手机号码</label>
        <input id="telNumber" type="text" v-model.trim="telNumber" />
      </div>
      <div class="item" @click="isShowArea = true">
        <label class="label-text" for="address">所在地区</label>

        <input id="address" type="text" v-model.trim="address" disabled />
      </div>
      <div class="item">
        <label class="label-text" for="detailadress">详细地址</label>
        <input id="detailadress" type="text" v-model.trim="detailadress" />
      </div>
      <div class="item">
        <label class="label-text">设置为默认地址</label>
        <van-switch
          active-color="#cea62a"
          inactive-color="#9e9e9e"
          v-model="checked"
        />
      </div>
    </div>
    <van-popup v-model:show="isShowArea" position="bottom" :style="{ height: '100%' }" >
      <van-area @confirm="chooseArea" @cancel="isShowArea = !isShowArea" title="标题" :area-list="areaList" />
    </van-popup>
    <!-- <van-popup
      v-model:show="isShowArea"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-area @confirm="chooseArea" title="标题" :area-list="areaList" />
    </van-popup> -->

    <!-- 保存地址 -->
    <button class="btn" @click="doSubmit">保存</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBarVue from "../../../components/NavBar.vue";
import { saveAction, detailAction } from "@/api/user/address";
import { areaList } from "@vant/area-data";
const route = useRoute();
const router = useRouter();
const title = ref("");
const flag = ref(""); // add 新增 edit 编辑
const addressId = ref(""); // 编辑的地址id
const userName = ref("");
const telNumber = ref("");
const address = ref(""); // "天津市 天津市 河东区"
const detailadress = ref(""); // 详细地址
const checked = ref(false); // 是否默认选中
const isShowArea = ref(false); // 是否显示三级联动
// 返回
const goBack = () => {
  router.go(-1);
};
// 如果是编辑获取地址信息
const getAddressDetail = async () => {
  const res = await detailAction({ id: addressId.value });
  userName.value = res.data.name;
  telNumber.value = res.data.mobile;
  address.value = res.data.address;
  detailadress.value = res.data.address_detail;
  checked.value = res.is_default ? true : false;
};
onMounted(() => {
  flag.value = route.params.flag;
  addressId.value = route.params.id;
  if (flag.value === "add") {
    title.value = "新增地址";
  } else {
    title.value = "编辑地址";
    console.log("addressId.value==>", addressId.value);
    getAddressDetail();
  }
});
// 选中的省市区
const chooseArea = (e) => {
  // console.log("e==>", e);
  address.value = e.selectedOptions.map((item) => item.text).join(",");
  isShowArea.value = false;
};

// 保存或修改地址
const doSubmit = async () => {
  const res = await saveAction({
    address: address.value,
    addressId: addressId.value ? addressId.value : "", // 新增必须有该字段，但是值是 空字符串
    checked: checked.value,
    detailadress: detailadress.value,
    openId: localStorage.getItem("openId"),
    telNumber: telNumber.value,
    userName: userName.value,
  });
  // 保存成功后返回
  if (res.data) {
    router.go(-1);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/common.scss";
.detail {
  ::v-deep .van-popup--bottom{
    height: auto!important;
  }
  .collected-info {
    padding: 0 30px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      .label-text {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #131313;
        letter-spacing: 0;
        font-weight: 500;
      }
      input {
        @include textOverFlow;
        width: 546px;
        height: 80px;
        background: #ffffff;
        border-radius: 14px;
        border: none;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #464646;
        letter-spacing: 0;
        font-weight: 400;
        text-indent: 32px;
      }
      :deep(.van-switch) {
        width: 80px;
        height: 42px;
      }
      :deep(.van-switch__node) {
        width: 36px;
        height: 36px;
      }
    }
  }

  .btn {
    display: block;
    margin: 107px auto 0;
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
