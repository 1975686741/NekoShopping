<template>
  <div class="location">
    <NavBarVue @click-left-event="goBack" title="城市定位"></NavBarVue>
    <div class="search-com">
      <SearchInputVue @do-search-action="doSearchAddress"></SearchInputVue>
    </div>
    <div class="search-item" v-if="searchResultList.length > 0">
      <SearchListItemVue
        v-for="item in searchResultList"
        :item-content="item.name"
        :key="item.id"
        @item-click="searhListItemClick(item)"
      ></SearchListItemVue>
    </div>
    <div class="map-wrapper">
      <h1 class="title">当前位置：</h1>
      <div id="container"></div>
    </div>
  </div>
</template>
<script setup>
import NavBarVue from "../../../components/NavBar.vue";
import SearchInputVue from "../../../components/SearchInput.vue";
import SearchListItemVue from "../../../components/SearchListItem.vue";
import { ref, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useAddressStore } from "@/stores/address.js";
const router = useRouter();
const addressStore = useAddressStore();
const lnglat = ref([115.825645, 28.718148]);
const addressName = ref("当前位置");
const searchResultList = ref([]);
var map = null;
// 返回按钮
const goBack = () => {
  router.go(-1);
};
// 创建点标记
const addMaker = () => {
  // 创建一个 Marker 实例：
  var marker = new AMap.Marker({
    position: lnglat.value, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: addressName.value,
  });
  // 设置label标签
  // label默认蓝框白底左上角显示，样式className为：amap-marker-label
  marker.setLabel({
    direction: "top",
    offset: new AMap.Pixel(0, 0), //设置文本标注偏移量
    content: `<div class='info'>${addressName.value}</div>`, //设置文本标注内容
  });

  // 将创建的点标记添加到已有的地图实例：
  map.add(marker);
};
onMounted(() => {
  map = new AMap.Map("container", {
    zoom: 14, //级别
    center: lnglat.value, //中心点坐标
  });
  const addressObj = addressStore.getAddress;
  if (addressObj.name && addressObj.location) {
    addressName.value = addressObj.name;
    lnglat.value = [addressObj.location.lng, addressObj.location.lat];
    map.setCenter(lnglat.value);
  }
  addMaker();
});
// 搜索地址
const doSearchAddress = (keyword) => {
  AMap.plugin("AMap.AutoComplete", function () {
    var autoOptions = {
      //city 限定城市，默认全国
      city: "全国",
    };
    // 实例化AutoComplete
    var autoComplete = new AMap.AutoComplete(autoOptions);
    // 根据关键字进行搜索
    autoComplete.search(keyword, function (status, result) {
      // 搜索成功时，result即是对应的匹配数据
      // console.log(result);
      searchResultList.value = result.tips;
    });
  });
};
// 搜索列表点击事件
const searhListItemClick = (address) => {
  // 1. 将点击的地址保存在 pinia 中
  addressStore.updateAddressObj(toRaw(address));
  // 2. 返回首页
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.location {
  height: 100vh;
  .search-com {
    padding: 36px 18px 36px 21px;
    background-color: #fff;
  }
  .search-item {
    height: calc(100vh - 684px);
    overflow: auto;
  }
  .map-wrapper {
    position: fixed;
    bottom: 58px;
    left: 0;
    right: 0;
    padding: 0 21px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 500;
      margin-bottom: 24px;
    }
    #container {
      width: 100%;
      height: 342px;
    }
    :deep(.amap-marker-label) {
      border: 0;
    }
  }
}
</style>
