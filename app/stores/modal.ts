import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const modalController = reactive<{ name: string | null; status: boolean }>({
    name: null,
    status: false,
  })

  function openModal(name: string) {
    modalController.name = name
    modalController.status = true
  }

  function closeModal() {
    modalController.status = false
  }

  function onModalAfterLeave() {
    modalController.name = null
  }

  return {
    modalController,
    openModal,
    closeModal,
    onModalAfterLeave,
  }
})
