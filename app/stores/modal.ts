import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const modalController = reactive<{ name: string | null; status: boolean }>({
    name: null,
    status: false,
  })

  /** ID пользователя для модалки подтверждения email (после регистрации) */
  const confirmEmailUserId = ref<string | null>(null)

  function openModal(name: string) {
    modalController.name = name
    modalController.status = true
  }

  function openConfirmEmail(userId: string) {
    confirmEmailUserId.value = userId
    openModal('confirm-email')
  }

  function closeModal() {
    modalController.status = false
  }

  function onModalAfterLeave() {
    modalController.name = null
    confirmEmailUserId.value = null
  }

  return {
    modalController,
    confirmEmailUserId,
    openModal,
    openConfirmEmail,
    closeModal,
    onModalAfterLeave,
  }
})
