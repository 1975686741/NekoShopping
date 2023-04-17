<template>
  <div class="home">
    <!-- 头部搜索开始 -->
    <SubHeader />
    <!-- 轮播图开始 -->
    <div class="swiper-container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#FF0000">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <img :src="item.image_url" alt="" />
        </van-swipe-item>
      </van-swipe>
      <div class="banner2">
        <div class="top">
          <div class="text">
            <div class="da">排行榜</div>
            <div class="xiao">心动不如行动</div>
          </div>
          <div class="pic">
            <img
              src="https://g-search2.alicdn.com/img/bao/uploaded/i4/i2/2024314280/O1CN01JtfyD91hUHwUTYmsb_!!0-item_pic.jpg_580x580Q90.jpg"
              alt=""
            />
            <img
              src="https://img.alicdn.com/imgextrahttps://img.alicdn.com/imgextra/i1/2214389169743/O1CN016KQF0M2LqLfzNHhq4_!!2214389169743-0-alimamacc.jpg_270x270.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="bottom">
          <div class="text1">
            <div class="text2">半价秒杀</div>
            <van-count-down class="text3" millisecond :time="time" format="HH:mm:ss:SS" />
          </div>
          <div class="bottom1">
            <img
              src="https://gw.alicdn.com/imgextra/i2/2549841410/O1CN01IZnj4m1MHpG3449AP_!!2549841410.jpg_Q75.jpg_.webp"
              alt=""
            />
            <img
              src="https://gw.alicdn.com/imgextra/i3/2212369671514/O1CN01AM0afA1N3SNkr0TZe_!!2212369671514.jpg_Q75.jpg_.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 分类开始 -->
    <div class="category">
      <RouterLink
        v-for="item in channelList"
        :key="item.id"
        :to="{
          name: 'CategoryList',
          query: { id: item.id, name: item.aliasName },
        }"
        v-slot="{ href, navigate }"
      >
        <div @click="navigate" :href="href" class="category-item">
          <img class="category-item-icon" :src="item.icon_url" alt="" />
          <div class="category-item-name">{{ item.name }}</div>
        </div>
      </RouterLink>
    </div>
    <!-- 商品图标 -->
    <div class="four">
      <div class="left">
        <img
          src="https://www.bing.com/th/id/OGC.4df88100aaa54686487a16d6875b4900?pid=1.7&rurl=https%3a%2f%2fwimg.588ku.com%2fgif%2f21%2f07%2f23%2f2013dade60710e6f719a008dc47138b7.gif&ehk=gjxmxHcjqQqoFTUSvjqIfyIjOUCktT0cYpOvomefZcg%3d"
          alt=""
        />
      </div>
      <div class="big">
        <div class="zuo">
          <div class="zuo1">
            美酒甄选
            <div class="min1">严选正品</div>
          </div>
          <img
            src="https://img12.360buyimg.com/n1/jfs/t1/179997/24/7408/120640/60b9cec9Eb9b67250/f36b57fc066772dc.jpg"
            alt=""
          />
        </div>
        <div class="middle">
          <div class="zuo2">
            爆款直降
            <div class="min2">6期免息</div>
          </div>
          <img
            src="https://img13.360buyimg.com/n1/s450x450_jfs/t1/107692/5/26486/138671/6233e789Ee3751f0a/fc69f8e32a1dc54c.jpg"
            alt=""
          />
        </div>
        <div class="right">
          <div class="zuo3">
            分期免息
            <div class="min3">必买爆品</div>
          </div>
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- 新品首发开始 -->
    <RouterLink to="/home/newhotlist?flag=new" custom v-slot="{ href, navigate }">
      <div :href="href" @click="navigate" class="new-product">
        <img  :src="getAssetsImageUrl('images/new-product-pic.png')" alt="" />
      </div>
    </RouterLink>
    <!-- 新品列表 -->
    <div class="new-product-list">
      <RouterLink
        v-for="item in newGoodsList"
        :key="item.id"
        v-slot="{ href, navigate }"
        :to="{ name: 'ProductDetail', params: { id: item.id } }"
      >
        <div @click="navigate" :href="href" class="item">
          <img :src="item.list_pic_url" alt="" />
          <div class="product-name">{{ item.name }}</div>
          <div class="product-desc">{{ item.goods_brief }}</div>
          <div class="product-price">￥{{ item.retail_price }}</div>
        </div>
      </RouterLink>
    </div>

    <!-- 商品分类列表 -->
    <div class="category-list">
      <div class="item" v-for="(item, index) in newCategoryList" :key="item.id">
        <!-- 商品标题 -->
        <div class="item-title" :class="'item-title-' + (index + 1)">
          <span class="title">{{ item.name }}</span
          >好物
        </div>
        <!-- 商品 -->
        <div class="sub-list">
          <div
            class="sub-item"
            v-for="(subItem, index) in item.goodsList"
            :key="item.id"
            @click="goProductDetail(subItem.id)"
          >
            <div v-if="index !== item.goodsList.length - 1">
              <img v-lazy="subItem.list_pic_url" alt="" />
              <p class="subitem-name">{{ subItem.name }}</p>
              <p class="subitem-pirce">￥{{ subItem.retail_price }}</p>
            </div>
            <div
              v-else
              class="last-item"
              @click.stop="goCategoryList(subItem.id, subItem.name)"
            >
              <p class="title">{{ subItem.name }}好物</p>
              <img
                class="img"
                v-lazy="getAssetsImageUrl('images/next-home-icon.png')"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAssetsImageUrl } from "@/utils/index.js";
import { index as indexApi } from "@/api/home";
import SearchInputVue from "../../components/SearchInput.vue";
import { useAddressStore } from "@/stores/address.js";
import SubHeader from "../../components/SubHeader.vue";
const time = ref(2 * 20 * 30 * 1000);
const router = useRouter();
const addressStore = useAddressStore();
const bannerList = ref([]); // 轮播图数据
const channelList = [
  {
    id: 1005000,
    name: "家居",
    aliasName: "居家",
    url: "/pages/category/category?id=1005000",
    icon_url: getAssetsImageUrl("images/jiaju.png"),
    sort_order: 1,
  },
  {
    id: 1005001,
    name: "餐厨",
    aliasName: "餐厨",
    url: "/pages/category/category?id=1005001",
    icon_url: getAssetsImageUrl("images/canchu.png"),
    sort_order: 2,
  },
  {
    id: 1005002,
    name: "服装",
    aliasName: "服装",
    url: "/pages/category/category?id=1005002",
    icon_url: getAssetsImageUrl("images/fuzhuang.png"),
    sort_order: 4,
  },
  {
    id: 1008000,
    name: "旅行",
    aliasName: "配件",
    url: "/pages/category/category?id=1008000",
    icon_url: getAssetsImageUrl("images/lvxing.png"),
    sort_order: 3,
  },
  {
    id: 1019000,
    name: "兴趣",
    aliasName: "志趣",
    url: "/pages/category/category?id=1019000",
    icon_url: getAssetsImageUrl("images/xingqu.png"),
    sort_order: 5,
  },
]; // 首页分类列表
const brandList = ref([]); // 品牌制造商列表
const newGoodsList = ref([]); // 新品首发列表
const hotGoodsList = ref([]); // 人气推荐列表
const topicList = ref([]); // 专题精选列表
const newCategoryList = ref([]); // 分类列表
const locationAddress = ref(); // 定位信息
const city = ref(""); // 定位城市 默认郑州
// 从 pinia 中获取搜索的位置信息
const getLocation = () => {
  locationAddress.value = addressStore.getAddress;
  if (locationAddress.value.name) {
    // 如果存在位置信息
    city.value = locationAddress.value.name;
  } else {
    // 开启定位功能
    getLocationCity();
  }
};
// IP定位获取当前城市信息
const getLocationCity = () => {
  AMap.plugin("AMap.CitySearch", function () {
    var citySearch = new AMap.CitySearch();
    citySearch.getLocalCity(function (status, result) {
      if (status === "complete" && result.info === "OK") {
        // 查询成功，result即为当前所在城市信息
        // console.log("result==>", result);
        city.value = result.city;
      }
    });
  });
};
onMounted(async () => {
  const res = await indexApi();
  const {
    success,
    banner,
    brandList: brandListData,
    channel,
    hotGoods,
    newCategoryList: newCategoryListData,
    newGoods,
    topicList: topicListData,
  } = res;
  if (success) {
    bannerList.value = banner;
    // channelList.value = channel
    brandList.value = brandListData;
    newGoodsList.value = newGoods;
    hotGoodsList.value = hotGoods;
    topicList.value = topicListData;
    newCategoryListData.forEach((item) => {
      item.goodsList.push({ name: item.name, id: item.id });
    });
    newCategoryList.value = newCategoryListData;
  }
  getLocation();
});
// 跳转到商品详情页面
const goProductDetail = (id) => {
  router.push({ name: "ProductDetail", params: { id } });
};
// 跳转的分类页面
const goCategoryList = (id, name) => {
  router.push({ name: "CategoryList", query: { id, name } });
};
</script>

<style lang="scss" scoped>
@import "@/assets/common.scss";
$linearGradients: linear-gradient(135deg, #296aff 0%, #52c5ff 100%),
  linear-gradient(140deg, #fca334 0%, #fdd036 100%),
  linear-gradient(-41deg, rgba(149, 255, 0, 0.95) 0%, #4fcb11 100%),
  linear-gradient(-41deg, rgba(68, 240, 255, 0.95) 0%, #009ad0 100%),
  linear-gradient(90deg, #8b3af7 17%, #f16cff 83%),
  linear-gradient(90deg, #ff74a5 18%, #ffbfcd 83%),
  linear-gradient(144deg, #5c51eb 0%, #a097ff 100%),
  linear-gradient(-40deg, #ffc781 0%, #ff9650 100%),
  linear-gradient(-41deg, rgba(196, 222, 37, 0.95) 0%, #4ab216 100%);

.home {
  padding-bottom: 100px;
  background: #fff;

  // 轮播图开始
  .swiper-container {
    // margin-top: 22px;
    padding: 22px 19px 0;
    display: flex;
    background-color: #fff;

    :deep(.van-swipe__indicator) {
      opacity: 0.5;
      background-color: #fff;
    }

    .my-swipe {
      width: 50%;
      border-radius: 10%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .banner2 {
      margin: 0 0.15rem 0 0.2rem;
      flex: 1;
      .top {
        height: 50%;
        background: linear-gradient(to top, transparent, mistyrose);
        border-radius: 12%;
        .text {
          padding-left: 0.2rem;
          display: flex;
          .da {
            font-weight: bold;
            width: 30%;
            font-size: 12px;
          }
          .xiao {
            border-radius: 30%;
            text-align: center;
            margin-right: 0.8rem;
            flex: 1;
            background: #f3f3e4;
            color: #5c3317;
            font-size: 12px;
            transform: scale(0.78, 0.78);
            *font-size: 10px;
          }
        }
        .pic {
          margin: 0 0.1rem 0 0.1rem;
          img {
            width: 50%;
            height: 1.8rem;
          }
        }
      }
      .bottom {
        height: 50%;
        background: linear-gradient(to top, transparent, mistyrose);
        border-radius: 12%;
        .text1 {
          display: flex;
          justify-content: space-around;
          .text2 {
            font-weight: bold;
            font-size: 12px;
          }
          .text3 {
            font-weight: bold;
            color: red;
          }
        }
        .bottom1 {
          margin: 0 0.1rem 0 0.1rem;
          img {
            width: 50%;
            height: 2rem;
          }
        }
      }
    }
  }

  // 分类开始
  .category {
    background: #fff6f6;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 78px;
    padding: 47px 48px 50px;
    box-sizing: border-box;
    margin: 0.2rem;
    border-radius: 0.5625rem;
    // img {
    //   width: 1.25rem /* 100/16 */;
    //   height: 1.25rem /* 100/16 */;
    // }
    &-item {
      text-align: center;
      &-icon {
        width: 69px;
        height: 69px;
      }
      &-name {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #666666;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
  }
  // 商品图标开始
  .four {
    padding-top: 0.2rem;
    height: 1.6rem;
    display: flex;
    .left {
      flex: 1;
      height: 1rem;
      margin-right: 0.8rem;
      img {
        width: 100%;
        height: auto;
        margin: -10px 0 0 12px;
      }
    }
    .big {
      width: 78%;
      height: 1rem;
      display: grid;
      margin-top: 0.2rem;
      grid-template-columns: 2.48rem auto 2.48rem;
      .zuo {
        background: #ffe4e13d;
        margin-right: 0.3rem;
        border-radius: 18%;
        position: relative;
        .zuo1 {
          font-weight: bolder;
          font-size: 12px;
          .min1 {
            float: left;
            font-size: 12px;
            transform: scale(0.75, 0.75);
            *font-size: 9px;
            color: gray;
          }
        }
        img {
          width: 40%;
          height: 1rem;
          position: absolute;
          right: 0;
          margin-top: -0.5rem;
        }
      }
      .middle {
        background: #ffe4e13d;
        margin: 0 0.35rem;
        border-radius: 18%;
        .zuo2 {
          font-weight: bolder;
          font-size: 12px;
          .min2 {
            float: left;
            font-size: 12px;
            transform: scale(0.75, 0.75);
            *font-size: 9px;
            color: gray;
          }
        }
        img {
          width: 40%;
          height: 1rem;
          position: absolute;
          right: 0;
          margin-top: -0.5rem;
        }
      }
      .right {
        background: #ffe4e13d;
        margin-right: 0.3rem;
        border-radius: 18%;
        .zuo3 {
          font-weight: bolder;
          font-size: 12px;
          .min3 {
            float: left;
            font-size: 12px;
            transform: scale(0.75, 0.75);
            *font-size: 9px;
            color: gray;
          }
        }
        img {
          width: 40%;
          height: 1rem;
          position: absolute;
          right: 0;
          margin-top: -0.5rem;
        }
      }
    }
  }


  // 新品首发 人气推荐 开始
  .new-product,
  .hot-recom {
    padding: 20px 19px;
    img {
      width: 710px;
      height: 242px;
      border-radius: 4%;
    }
  }

  // 新品 人气推荐列表
  .new-product-list {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: nowrap;
    overflow: auto;
    height: 5rem;
    background: #fff6f6;
    border-radius: 7%;
    border-bottom: 2px solid #e9e9e9;
    .item {
      width: 296px;
      border-right: .1rem solid rgba(151, 151, 151, 0.2);
      img {
        width: 254px;
        height: 254px;
      }

      .product-name,
      .product-desc {
        @include textOverFlow;
        width: 210px;
        letter-spacing: 0;
        padding-left: 26px;
      }

      .product-name {
        font-size: 30px;
        color: #333333;
        font-weight: 500;
      }

      .product-desc,
      .product-price {
        font-size: 24px;
        color: #999999;
        font-weight: 400;
      }

      .product-price {
        padding-left: 26px;
        padding-top: 23px;
        color: #9e4242;
      }
    }
  }

  // 商品分类列表
  .category-list {
    padding: 0 19px;

    .item {
      margin-top: 61px;

      &-title {
        text-align: center;
        font-family: PingFangSC-Semibold;
        font-size: 38px;
        color: #333333;
        font-weight: 600;

        .title {
          position: relative;
          font-weight: inherit;

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: -1;
            content: "";
            width: 81px;
            height: 13px;
          }
        }
      }

      @for $i from 1 through length($linearGradients) {
        .item-title-#{$i} .title:after {
          background-image: nth($linearGradients, $i);
        }
      }

      .sub-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 44px 10px;
        margin-top: 36px;

        .sub-item {
          box-sizing: border-box;
          background: #fff6f6;
          border-radius: 7%;
          border-bottom: 2px solid #e9e9e9;
          img {
            width: 350px;
            height: 350px;
          }

          .subitem-name {
            margin-top: 17px;
            @include textOverFlow;
            font-family: PingFangSC-Medium;
            font-size: 26px;
            color: #333333;
            letter-spacing: 0;
            font-weight: 500;
            width: 310px;
          }

          .subitem-pirce {
            margin-top: 5px;
            font-family: PingFangSC-Regular;
            font-size: 26px;
            color: #9e4242;
            letter-spacing: 0;
            font-weight: 400;
          }

          .last-item {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 350px;
            height: 350px;
            background-color: #fff;

            .title {
              font-family: PingFangSC-Regular;
              font-size: 32px;
              color: #666666;
              letter-spacing: 0;
              font-weight: 400;
            }

            .img {
              margin-top: 21px;
              width: 58px;
              height: 58px;
            }
          }
        }
      }
    }
  }
}
</style>
