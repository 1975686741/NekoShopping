<template>
  <div>
    <van-search v-model="keyword" :placeholder="placeholder" :shape="shape" :show-action="showAction" @search="doSearch"
      :disabled="disabled" @cancel="doCancel" :left-icon="getAssetsImageUrl('images/input-search-icon.png')" />
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { getAssetsImageUrl } from '@/utils'
import { showToast } from 'vant';
import { debounce } from 'lodash-es'
// import _ from 'lodash'
// defineProps是一个 宏 命令 可以直接使用
const props = defineProps({
  placeholder: {
    type: String,
    default: '商品搜索'
  },
  shape: {
    type: String,
    default: 'round'
  },
  showAction: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['doSearchAction', 'doCancelAction'])
const doSearch = () => {
  emit('doSearchAction', keyword.value)
}
const doCancel = () => {
  emit('doCancelAction')
}
const keyword = ref('')
const _throttle = debounce(doSearch, 100)
watch(keyword, (newVal, oldVal) => {
  _throttle()
})
</script>


<style lang='scss' scoped>
// :deep() 深度作用选择器
:deep(.van-search) {
  padding: 0;
}

:deep(.van-field__control) {
  text-indent: 22px;
}
</style>
