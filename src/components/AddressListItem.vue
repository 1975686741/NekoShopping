<template>
  <div>
    <div class="address" @click="itemClickEvent">
      <div class="default" v-if="address.is_default === 1">默认</div>
      <div class="address-info">
        <div class="detail">
          {{ address.address }} {{ address.address_detail }}
        </div>
        <div class="person-info">
          <span class="name">{{ address.name }}</span>
          <span class="phone">{{ address.mobile }}</span>
        </div>
      </div>
      <div class="arrow">
        <img :src="ArrowRightPath" alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ArrowRightPath from "@/assets/images/forward-search-icon.png";
const props = defineProps({
  address: {
    type: Object,
    required: true,
    default: () => {
      return {};
    },
  },
  iconPath: {
    type: String,
    default: ArrowRightPath,
  },
});
const emit = defineEmits(["itemClick"]);
const itemClickEvent = () => {
  emit("itemClick");
};
</script>
<style lang="scss" scoped>
@import "@/assets/common.scss";
.address {
  display: flex;
  margin: 37px auto 0;
  width: 710px;
  height: 206px;
  box-sizing: border-box;
  background-color: #fff;
  .default {
    margin-left: 26px;
    margin-top: 58px;
    width: 100px;
    height: 40px;
    border: 1px solid rgba(158, 66, 66, 1);
    border-radius: 4px;
    font-size: 20px;
    color: rgba(158, 66, 66, 1);
    text-align: center;
    line-height: 40px;
  }
  .address-info {
    margin-top: 58px;
    margin-left: 35px;
    .detail {
      font-family: PingFangSC-Semibold;
      font-size: 28px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 600;
    }
    .person-info {
      margin-top: 14px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
      font-weight: 400;
      .name {
        @include textOverFlow;
      }
      .phone {
        @include textOverFlow;
        margin-left: 5px;
      }
    }
  }
  .arrow {
    display: flex;
    align-items: center;
    margin-left: 137px;
    height: 100%;
    img {
      width: 26px;
      height: 26px;
    }
  }
}
</style>
