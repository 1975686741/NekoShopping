<template>
  <div class="search">
    <VanSticky>
      <NavBarVue
        v-if="searchStatus === 'productList'"
        @click-left-event="goBack"
        title="分类"
      ></NavBarVue>
      <div class="search-com">
        <SearchInputVue
          :show-action="true"
          @do-search-action="doSearchProduction"
          @do-cancel-action="doCancelAction"
        >
        </SearchInputVue>
      </div>
    </VanSticky>

    <template v-if="searchStatus === 'default'">
      <!-- 历史记录 -->
      <div class="history" v-if="historyData.length > 0">
        <div class="history-title">
          <h4 class="title">历史记录</h4>
          <img
            @click="clearHistoryRecord"
            :src="getAssetsImageUrl('images/delete-search-icon.png')"
            alt=""
          />
        </div>
        <div class="history-list">
          <div class="item" v-for="item in historyData" :key="item.id"  @click="searchProductionList(item.keyword, 'productList')">
            {{ item.keyword }}
          </div>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div class="history hot-search">
        <div class="history-title">
          <h4 class="title">热门搜索</h4>
        </div>
        <div class="history-list">
          <div
            class="item"
            :class="item.keyword === defaultKeyword.keyword ? 'red' : ''"
            v-for="item in hotKeywordList"
            :key="item.id"
            @click="searchProductionList(item.keyword, 'productList')"
          >
            {{ item.keyword }}
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="searchStatus === 'list'">
      <ul class="simple-product-list">
        <li
          @click="searchProductionList(item.name, 'productList')"
          class="list-item"
          v-for="item in simpleProductList"
          :key="item.id"
        >
          <span class="name"> {{ item.name }} </span>
          <img
            :src="getAssetsImageUrl('images/forward-search-icon.png')"
            alt=""
          />
        </li>
      </ul>
    </template>
    <template v-else>
      <TheTabbarVue @item-change="tabbarItemChange"></TheTabbarVue>
      <ProductListVue :list="simpleProductList"></ProductListVue>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getAssetsImageUrl } from "@/utils";
import NavBarVue from "../../../components/NavBar.vue";
import SearchInputVue from "../../../components/SearchInput.vue";
import TheTabbarVue from "../../../components/TheTabbar.vue";
import ProductListVue from "../../../components/ProductList.vue";
import {
  indexaction,
  clearhistoryAction,
  helperaction,
  addhistoryaction,
} from "@/api/home/search";
import { useRouter } from "vue-router";
const router = useRouter();
const searchKeyword = ref(""); // 搜索关键字
// 搜索结果有三种状态：default list productList
const searchStatus = ref("default");
const historyData = ref([]); // 历史记录数据
const hotKeywordList = ref([]); // 热门搜索数据
let defaultKeyword = reactive({}); // 默认搜索关键字
const order = ref("asc"); // 排序，价格从小到大(asc)或从大到小排序(desc)
const simpleProductList = ref([]); // 输入框搜索的商品结果列表
// 返回
const goBack = () => {
  router.go(-1);
};
// 子组件触发 搜索商品
const doSearchProduction = (keyword) => {
  if (keyword) {
    searchProductionList(keyword, "list");
  } else {
    searchStatus.value = "default";
  }
};
// 发送请求获取 搜索数据
const searchProductionList = async (keyword, status) => {
  searchKeyword.value = keyword;
  searchStatus.value = status;
  const res = await helperaction({ keyword, order: order.value });
  simpleProductList.value = res.keywords;
  if (searchStatus.value === "productList") {
    // 将搜索关键字保存在数据库
    await addhistoryaction({ keyword, openId: localStorage.getItem("openId") });
  }
};
// 子组件 tabbar 点击事件触发
const tabbarItemChange = ({ index, status }) => {
  if (index !== 1) {
    order.value = "";
  } else {
    if (status === "up") {
      order.value = "asc";
    } else {
      order.value = "desc";
    }
  }
  searchProductionList(searchKeyword.value, "productList");
};
// 取消
const doCancelAction = () => {
  router.go(-1);
};
// 获取历史记录和热门搜索
const getHistoryAndHotList = async () => {
  const res = await indexaction({
    openId: localStorage.getItem("openId"),
  });
  historyData.value = res.historyData;
  hotKeywordList.value = res.hotKeywordList;
  defaultKeyword = res.defaultKeyword;
};

// 钩子函数
onMounted(() => {
  getHistoryAndHotList();
});
// 清除历史记录
const clearHistoryRecord = async () => {
  const res = clearhistoryAction({
    openId: localStorage.getItem("openId"),
  });
  // 清除成功后，历史数据重置
  historyData.value = [];
};
</script>

<style lang="scss" scoped>
@import "@/assets/common.scss";

.search {
  &-com {
    padding: 8px 22px 41px;
    background-color: #fff;
  }

  // 历史记录
  .history {
    margin-top: 2px;
    padding: 0 40px;
    background-color: #fff;

    &-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 42px;

      .title {
        font-family: PingFangSC-Medium;
        font-size: 26px;
        color: #000000;
        letter-spacing: 0;
        font-weight: 500;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }

    &-list {
      padding-top: 28px;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      .item {
        margin-right: 10px;
        margin-bottom: 12px;
        border: 1px solid rgba(226, 226, 226, 1);
        padding: 12px 23px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
  }

  // 热门搜索
  .hot-search {
    margin-top: 20px;

    .red {
      color: #9f0606;
    }
  }

  // 输入框搜索结果列表
  .simple-product-list {
    list-style: none;
    background-color: #fff;

    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2px;
      height: 93px;
      padding: 0 32.79px 0 52px;

      .name {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 400;
      }

      img {
        width: 25.21px;
        height: 26px;
      }
    }
  }
}
</style>
