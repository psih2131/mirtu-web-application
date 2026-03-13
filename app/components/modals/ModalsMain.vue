<template>
  <Teleport to="body">
    <Transition name="modal" appear @after-leave="store.onModalAfterLeave">
      <div v-if="store.modalController.status" key="modals" class="modals__wrapper">
        <div class="modals__overlay" aria-hidden="true" @click="closeModal" />
        <ModalAuth v-if="store.modalController.name === 'auth'" />
        <ModalForgotPassword v-if="store.modalController.name === 'forgot-password'" />
        <ModalRegister v-if="store.modalController.name === 'register'" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useModalStore } from '@/stores/modal'
import ModalAuth from '@/components/modals/ModalAuth.vue'
import ModalForgotPassword from '@/components/modals/ModalForgotPassword.vue'
import ModalRegister from '@/components/modals/ModalRegister.vue'

const store = useModalStore()

function closeModal() {
  store.closeModal()
}
</script>
