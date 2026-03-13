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
    <h2 class="modal-auth__title">Восстановление пароля</h2>
    <form class="modal-auth__form" @submit.prevent="onSubmit">
      <div class="modal-auth__field">
        <label for="forgot-email" class="modal-auth__label">Email</label>
        <input
          id="forgot-email"
          v-model="email"
          type="email"
          class="modal-auth__input"
          placeholder="Введите email"
          autocomplete="email"
        >
      </div>
      <button type="submit" class="modal-auth__submit">
        Восстановить пароль
      </button>
    </form>
    <button type="button" class="modal-auth__register" @click="openAuth">
      Вернуться ко входу
    </button>
  </div>
</template>

<script setup>
const modalStore = useModalStore()
const email = ref('')

function closeModal() {
  modalStore.closeModal()
}

function openAuth() {
  modalStore.openModal('auth')
}

function onSubmit() {
  // TODO: forgot password logic
}
</script>
