<template>
    <div class="order">
      <van-sticky>
        <NavBarVue @click-left-event="goBack" title="确认订单"></NavBarVue>
      </van-sticky>
      <div class="addressInfo">
        
        <div class="user">
          <div class="address">
            <div class="isDefault">默认</div>
            {{list.address && list.address.address }} {{ list.address && list.address.address_detail }}
          </div>
          <div class="userInfo">
            <div class="isDefault"></div>
            {{ list.address && list.address.name }} {{ list.address && list.address.mobile }}
          </div>
        </div>
        <van-icon size="13" color="#999999" name="arrow" />
      </div>
      <div class="goods">
        <ul>
          <li v-for="item in list.goodsList" :key="item.id">
            <img :src="item.list_pic_url" alt="">
            <div class="box">
                <div class="title">{{ item.goods_name }}</div>
                <div class="right">
                  <div class="price">￥{{ item.retail_price }}</div>
                  <div class="number">x{{ item.number }}</div>
                </div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="info">
        <li>
          商品合计<span>￥{{ list.allPrise }}</span>
        </li>
        <li>
          运费<span>免运费</span>
        </li>
        <li>
          优惠券<span>暂无</span>
        </li>
      </ul>
      <div class="money">
        实付：<span>{{ list.allPrise  }}</span> <div class="pay" @click="pay">支付</div>
      </div>
    </div>
</template>

<script setup >
import NavBarVue from '@/components/NavBar.vue';
import {
  detailAction
} from "@/api/cart/order"
import {
  useRouter
} from "vue-router"
let router = useRouter()
import { onMounted ,ref} from '@vue/runtime-core';
import { showToast } from 'vant';
let list = ref({})
  onMounted(async ()=>{
    let arr = await detailAction({
      openId:localStorage.getItem("openId"),
      addressId:""
    })
    console.log(arr)
    list.value = arr
  })
const goBack = () => {
  router.go(-1);
}
const pay = ()=>{
  showToast("暂未开放...")
}
</script>

<style scoped lang="scss">
.order{
  padding-bottom: 136px;
  .addressInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 19px 25px;
    padding: 58px 26px;
    background: #fff;
    .user{
      .address,.userInfo{
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #333333;
        letter-spacing: 0;
        font-weight: 600;
        display: flex;
        align-items: center;
        .isDefault{
          width: 100px;
          height: 40px;
          border: 1px solid rgba(158,66,66,1);
          border-radius: 4px;
          display: flex;
          color: rgba(158,66,66,1);
          align-items: center;
          justify-content: center;
          margin-right: 35px;
        }
      }
      .userInfo{
        margin-top: 14px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        letter-spacing: 0;
        font-weight: 400;
        .isDefault{
          border: none;
        }
      }
    }
  }
  .goods{
    ul{
      margin: 20px;
      
    }
    li{
      margin: 20px 0;
      padding: 43px 28px;
      background: #fff;
      display: flex;
      align-items: stretch;
      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #333333;
      font-weight: 400;
      img{
        width: 174px;
        height: 169px;
        margin-right: 35px;
      }
      .box{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex: 1;
        .right{
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price{
            font-family: PingFangSC-Medium;
            font-size: 28px;
            color: #9E4242;
            letter-spacing: 0;
            font-weight: 500;
          }
        }
      }
    }
  }
  .info{
    margin: 19px;
    background: #fff;
    padding: 10px 28px;
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
      padding: 18px 0;
      border-bottom: 1Px solid rgba(214,214,214,1);
    }
    li:last-child{
      border: none;
    }
  }
  .money{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-family: PingFangSC-Regular;
    font-size: 26px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 400;
    padding: 32px 20px;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    span{
      font-family: PingFangSC-Medium;
      font-size: 28px;
      color: #9E4242;
      letter-spacing: 0;
      font-weight: 500;
    }
    .pay{
      width: 193px;
      height: 72px;
      background: #CEA62A;
      border-radius: 35.75px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 41px;
      color: #fff;
    }
  }
}
</style>

