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
    <h2 class="modal-auth__title">Регистрация</h2>
    <form class="modal-auth__form" @submit.prevent="onSubmit">
      <div class="modal-auth__field">
        <label for="reg-email" class="modal-auth__label">Email</label>
        <input
          id="reg-email"
          v-model="email"
          type="email"
          class="modal-auth__input"
          placeholder="Введите email"
          autocomplete="email"
        >
      </div>
      <div class="modal-auth__field">
        <label for="reg-name" class="modal-auth__label">Имя</label>
        <input
          id="reg-name"
          v-model="name"
          type="text"
          class="modal-auth__input"
          placeholder="Введите имя"
          autocomplete="name"
        >
      </div>
      <div class="modal-auth__field">
        <label for="reg-password" class="modal-auth__label">Пароль (минимум 8 символов)</label>
        <div class="modal-auth__password-wrap">
          <input
            id="reg-password"
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            class="modal-auth__input"
            placeholder="Введите пароль"
            autocomplete="new-password"
          >
          <button
            type="button"
            class="modal-auth__password-toggle"
            :aria-label="passwordVisible ? 'Скрыть пароль' : 'Показать пароль'"
            @click="passwordVisible = !passwordVisible"
          >
            <svg v-if="passwordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="modal-auth__field">
        <label for="reg-password-confirm" class="modal-auth__label">Повторите пароль</label>
        <div class="modal-auth__password-wrap">
          <input
            id="reg-password-confirm"
            v-model="passwordConfirm"
            :type="passwordConfirmVisible ? 'text' : 'password'"
            class="modal-auth__input"
            placeholder="Повторите пароль"
            autocomplete="new-password"
          >
          <button
            type="button"
            class="modal-auth__password-toggle"
            :aria-label="passwordConfirmVisible ? 'Скрыть пароль' : 'Показать пароль'"
            @click="passwordConfirmVisible = !passwordConfirmVisible"
          >
            <svg v-if="passwordConfirmVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
      <button type="submit" class="modal-auth__submit">
        Зарегистрироваться
      </button>
    </form>
    <button type="button" class="modal-auth__register" @click="openAuth">
      Уже есть аккаунт?
    </button>
  </div>
</template>

<script setup>
const modalStore = useModalStore()
const email = ref('')
const name = ref('')
const password = ref('')
const passwordConfirm = ref('')
const passwordVisible = ref(false)
const passwordConfirmVisible = ref(false)

function closeModal() {
  modalStore.closeModal()
}

function openAuth() {
  modalStore.openModal('auth')
}

function onSubmit() {
  // TODO: register logic — валидация: пароль min 8 символов, пароли совпадают
}
</script>
