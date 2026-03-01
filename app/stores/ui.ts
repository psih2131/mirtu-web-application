import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const preloaderVisible = ref<boolean | null>(false)

  function showPreloader() {
    preloaderVisible.value = true
  }

  function hidePreloader() {
    preloaderVisible.value = false
  }

  return {
    preloaderVisible,
    showPreloader,
    hidePreloader,
  }
})
