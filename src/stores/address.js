import {
  defineStore
} from 'pinia'
import {
  computed,
  isProxy,
  ref,
  toRaw
} from 'vue'
export const useAddressStore = defineStore('address', () => {
  const addressObj = ref({})
  const updateAddressObj = (val) => {
    if (isProxy(val)) {
      addressObj.value = toRaw(val)
    } else {
      addressObj.value = val
    }
  }
  const getAddress = computed(() => addressObj.value)
  return {
    addressObj,
    updateAddressObj,
    getAddress
  }
})