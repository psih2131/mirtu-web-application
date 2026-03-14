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
    <h2 class="modal-auth__title">Вход</h2>
    <form class="modal-auth__form" @submit.prevent="onSubmit">
      <div v-if="serverError" class="modal-auth__server-error">{{ serverError }}</div>
      <div class="modal-auth__field">
        <label for="auth-email" class="modal-auth__label">Email</label>
        <input
          id="auth-email"
          v-model="email"
          type="email"
          class="modal-auth__input"
          :class="{ 'modal-auth__input--error': errors.email }"
          placeholder="Введите email"
          autocomplete="email"
        >
        <p v-if="errors.email" class="modal-auth__error">{{ errors.email }}</p>
      </div>
      <div class="modal-auth__field">
        <label for="auth-password" class="modal-auth__label">Пароль</label>
        <div class="modal-auth__password-wrap">
          <input
            id="auth-password"
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            class="modal-auth__input"
            :class="{ 'modal-auth__input--error': errors.password }"
            placeholder="Введите пароль"
            autocomplete="current-password"
          >
          <p v-if="errors.password" class="modal-auth__error">{{ errors.password }}</p>
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
        <button type="button" class="modal-auth__forgot" @click="openForgot">
          Забыли пароль?
        </button>
      </div>
      <button type="submit" class="modal-auth__submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Вход...' : 'Авторизоваться' }}
      </button>
    </form>
    <button type="button" class="modal-auth__register" @click="openRegister">
      Зарегистрироваться
    </button>
  </div>
</template>

<script setup>
const modalStore = useModalStore()
const userStore = useUserStore()
const email = ref('')
const password = ref('')
const passwordVisible = ref(false)
const isSubmitting = ref(false)
const serverError = ref('')
const errors = ref({ email: '', password: '' })

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate() {
  const e = { email: '', password: '' }
  if (!email.value.trim()) {
    e.email = 'Введите email'
  } else if (!emailRegex.test(email.value.trim())) {
    e.email = 'Неверный формат email'
  }
  if (!password.value) {
    e.password = 'Введите пароль'
  }
  errors.value = e
  return !e.email && !e.password
}

function closeModal() {
  modalStore.closeModal()
}

function openForgot() {
  modalStore.openModal('forgot-password')
}

function openRegister() {
  modalStore.openModal('register')
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return

  isSubmitting.value = true
  try {
    const res = await $fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      body: {
        email: email.value.trim(),
        password: password.value,
      },
      credentials: 'include',
    })
    console.log('Ответ сервера при авторизации:', res)
    userStore.changeLocalstorageAuthStatus(true)
    closeModal()
    await navigateTo('/user')
  } catch (err) {
    const e = err
    const detail = e?.data?.detail ?? e?.response?._data?.detail
    const status = e?.statusCode ?? e?.response?.status
    if (status === 401) {
      serverError.value = 'Неверный email или пароль'
    } else {
      serverError.value = typeof detail === 'string' ? detail : 'Ошибка авторизации'
    }

    console.log('Ошибка авторизации:', err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
