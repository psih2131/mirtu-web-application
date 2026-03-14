<template>
  <div class="modals__panel modal-auth">
    <div class="modal-auth__accent" aria-hidden="true" />
    <button
      type="button"
      class="modal-auth__close"
      aria-label="Закрыть"
      @click="closeModal"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <h2 class="modal-auth__title">Авторизация</h2>
    <p class="modal-auth__desc">
      Для совершения покупок необходимо авторизоваться.
    </p>
    <button type="button" class="modal-auth__submit" @click="openAuth">
      Авторизоваться
    </button>
  </div>
</template>

<script setup>
const modalStore = useModalStore()

function closeModal() {
  modalStore.closeModal()
}

function openAuth() {
  modalStore.openModal('auth')
}
</script>
