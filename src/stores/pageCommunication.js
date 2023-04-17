import {
  ref,
  computed
} from 'vue'
import {
  defineStore
} from 'pinia'
export const usePageCommunication = defineStore('pageCommunication', () => {
  const from = ref('')
  const getFrom = computed(() => from.value)
  const updateFrom = (val) => {
    from.value = val
  }
  return {
    getFrom,
    updateFrom
  }
})