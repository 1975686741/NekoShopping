<template>
  <div class="feedBack">
    <van-sticky>
      <NavBarVue @click-left-event="goBack" title="意见与反馈"></NavBarVue>
    </van-sticky>
    <div class="form">
      <div class="item">
        <h2>留言</h2>
        <div class="box">
          <textarea
            maxlength="150"
            v-model.trim="iptVal"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <div class="textLen">{{ iptVal.length }}/150</div>
        </div>
      </div>
      <div class="item">
        <h2>联系方式</h2>
        <div class="box">
          <input v-model="phoneNum" type="text" />
        </div>
      </div>
      <div class="submit" @click="submitAction">提交</div>
    </div>
  </div>
</template>

<script setup>
import NavBarVue from "@/components/NavBar.vue";
import { ref, watch } from "vue";
import { submitAction as submitActionApi } from "@/api/feedback";
import { useRouter } from "vue-router";
import { showToast } from "vant";
const router = useRouter();
const iptVal = ref("");
const phoneNum = ref("");

watch(iptVal, async (newVal) => {
  if (newVal.length == 150) {
    showToast("最多输入150字");
  }
});

const goBack = () => {
  router.go(-1);
};
const submitAction = async () => {
  if (!iptVal.value) {
    showToast("请输入您宝贵的意见");
    return;
  }
  if (!phoneNum.value) {
    showToast("请输入联系方式");
    return;
  }
  const res = await submitActionApi({
    content: iptVal.value,
    name: localStorage.getItem("userInfo").nickName,
    openId: localStorage.getItem("openId"),
    phone: phoneNum.value,
  });
  if (res.data) {
    showToast("提交成功");
    // 重置数据
    iptVal.value = "";
    phoneNum.value = "";
  }
};
</script>

<style scoped lang="scss">
.feedBack {
  .form {
    .item {
      padding: 20px;
      h2 {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #131313;
        letter-spacing: 0;
        font-weight: 500;
        padding: 13px 18px 21px;
      }
      .box {
        position: relative;
        font-size: 30px;
        font-weight: 100;
        padding: 10px;
        background: #fff;
        .textLen {
          position: absolute;
          right: 40px;
          bottom: 22px;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #cacaca;
          letter-spacing: 0;
          font-weight: 400;
        }
      }
      textarea,
      input {
        border: none;
        width: 100%;
        font-size: 30px;
        font-weight: 100;
      }
      input {
        height: 80px;
      }
    }
    .submit {
      margin: 72px auto;
      width: 710px;
      height: 90px;
      background: #cea62a;
      border-radius: 44.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 500;
    }
  }
}
</style>
