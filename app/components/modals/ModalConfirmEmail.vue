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

    <template v-if="isSuccess">
      <div class="modal-confirm__success-icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
          <path d="M8 12l3 3 5-6" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="modal-auth__title">Регистрация подтверждена</h2>
      <button type="button" class="modal-auth__submit" @click="onSuccessAuth">
        Авторизоваться
      </button>
    </template>

    <template v-else>
      <h2 class="modal-auth__title">Подтверждение email</h2>
      <p class="modal-auth__desc">Введите код из 6 цифр, отправленный на вашу почту</p>
      <form class="modal-auth__form modal-confirm__form" @submit.prevent="onSubmit">
        <div class="modal-confirm__inputs">
          <input
            v-for="(_, i) in 6"
            :key="i"
            :ref="(el) => setInputRef(el, i)"
            :value="digits[i]"
            type="text"
            inputmode="numeric"
            maxlength="1"
            class="modal-confirm__input"
            :class="{ 'modal-auth__input--error': serverError }"
            :aria-label="`Цифра ${i + 1}`"
            @input="onDigitInput($event, i)"
            @keydown="onDigitKeydown($event, i)"
            @paste="onPaste"
          >
        </div>
        <button
          type="submit"
          class="modal-auth__submit"
          :disabled="isSubmitting || !isCodeComplete"
        >
          {{ isSubmitting ? 'Проверка...' : 'Подтвердить' }}
        </button>
        <p v-if="serverError" class="modal-confirm__error">{{ serverError }}</p>
      </form>
      <button type="button" class="modal-auth__register" @click="openAuth">
        Уже есть аккаунт?
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
const modalStore = useModalStore()
const digits = ref(['', '', '', '', '', ''])
const inputRefs = ref<(HTMLInputElement | null)[]>([])
const isSubmitting = ref(false)
const isSuccess = ref(false)
const serverError = ref('')

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const userId = computed(() => modalStore.confirmEmailUserId)

const isCodeComplete = computed(() => digits.value.every((d) => d !== ''))

function setInputRef(el: unknown, i: number) {
  if (el) inputRefs.value[i] = el as HTMLInputElement
}

function onDigitInput(e: Event, index: number) {
  const input = e.target as HTMLInputElement
  const val = input.value.replace(/\D/g, '').slice(0, 1)
  digits.value[index] = val
  if (val && index < 5) {
    nextTick(() => inputRefs.value[index + 1]?.focus())
  }
}

function onDigitKeydown(e: KeyboardEvent, index: number) {
  if (e.key === 'Backspace' && !digits.value[index] && index > 0) {
    nextTick(() => inputRefs.value[index - 1]?.focus())
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6)
  const arr = text.split('')
  for (let i = 0; i < 6; i++) digits.value[i] = arr[i] || ''
  if (arr.length > 0) nextTick(() => inputRefs.value[Math.min(arr.length, 5)]?.focus())
}

function closeModal() {
  modalStore.closeModal()
}

function openAuth() {
  modalStore.openModal('auth')
}

function onSuccessAuth() {
  closeModal()
  openAuth()
}

async function onSubmit() {
  if (!userId.value || !isCodeComplete.value) return

  serverError.value = ''
  isSubmitting.value = true
  try {
    await $fetch(`${apiBase}/auth/confirm`, {
      method: 'POST',
      body: {
        user_id: userId.value,
        code: digits.value.join(''),
      },
    })
    isSuccess.value = true
  } catch (err) {
    const e = err as { data?: { detail?: unknown }; response?: { _data?: { detail?: unknown }; status?: number }; statusCode?: number }
    const detail = e?.data?.detail ?? e?.response?._data?.detail
    const status = e?.statusCode ?? e?.response?.status
    if (status === 422 && Array.isArray(detail)) {
      const msgs = (detail as Array<{ msg?: string }>).map((d) => d?.msg).filter(Boolean)
      serverError.value = msgs.join('. ') || 'Ошибка валидации'
    } else {
      serverError.value = typeof detail === 'string' ? detail : 'Неверный код. Попробуйте ещё раз'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
