<template>
  <div v-if="!isLoaded" class="user-cabinet user-cabinet--loading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="user-cabinet">

    <div class="container">   
    <aside class="user-cabinet__nav">
      <UserCabinetNav :user="user" active-item="profile" />
    </aside>

    <main class="user-cabinet__content">
      <section class="user-cabinet-profile">
        <h1 class="user-cabinet-profile__title">Персональная информация</h1>

        <div class="user-cabinet-profile__fields" v-if="user">
          <div class="user-cabinet-profile__readonly">
            <div class="user-cabinet-profile__field user-cabinet-profile__field--readonly">
              <label class="user-cabinet-profile__label">Email</label>
              <p class="user-cabinet-profile__value">{{ user.email }}</p>
            </div>
            <div class="user-cabinet-profile__field user-cabinet-profile__field--readonly">
              <label class="user-cabinet-profile__label">ID</label>
              <p class="user-cabinet-profile__value user-cabinet-profile__value--mono">{{ user.id }}</p>
            </div>
            <div class="user-cabinet-profile__field user-cabinet-profile__field--readonly">
              <label class="user-cabinet-profile__label">Email подтверждён</label>
              <p class="user-cabinet-profile__value">
                <span :class="['user-cabinet-profile__badge', user.is_confirmed ? 'user-cabinet-profile__badge--success' : 'user-cabinet-profile__badge--muted']">
                  {{ user.is_confirmed ? 'Да' : 'Нет' }}
                </span>
              </p>
            </div>
            <div class="user-cabinet-profile__field user-cabinet-profile__field--readonly">
              <label class="user-cabinet-profile__label">Валюта</label>
              <p class="user-cabinet-profile__value">{{ user.preferred_currency }}</p>
            </div>
          </div>
          <div class="user-cabinet-profile__editable">
            <div class="user-cabinet-profile__field">
              <label class="user-cabinet-profile__label">Имя</label>
              <input
                v-model="form.name"
                type="text"
                class="user-cabinet-profile__input"
                :class="{ 'user-cabinet-profile__input--error': errors.name }"
                placeholder="Имя"
              >
              <p v-if="errors.name" class="user-cabinet-profile__field-error">{{ errors.name }}</p>
            </div>
            <div class="user-cabinet-profile__field">
              <label class="user-cabinet-profile__label">Номер телефона</label>
              <input
                v-model="form.phone"
                type="tel"
                class="user-cabinet-profile__input"
                :class="{ 'user-cabinet-profile__input--error': errors.phone }"
                placeholder="+7 700 123 45 67"
                @input="onPhoneInput"
              >
              <p v-if="errors.phone" class="user-cabinet-profile__field-error">{{ errors.phone }}</p>
            </div>
          </div>
        </div>
        <div class="user-cabinet-profile__actions">
          <button
            type="button"
            class="user-cabinet-profile__btn user-cabinet-profile__btn--save"
            :disabled="isSubmitting"
            @click="onSave"
          >
            {{ isSubmitting ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
        </div>
        <div v-if="successMessage" class="user-cabinet-profile__message user-cabinet-profile__message--success">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="user-cabinet-profile__message user-cabinet-profile__message--error">
          {{ errorMessage }}
        </div>
      </section>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
//imports
import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'


//data
const userStore = useUserStore()
const uiStore = useUiStore()

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string; phone?: string | null; is_confirmed?: boolean; preferred_currency?: string } | null>(null)
const isLoaded = ref(false)


//methods


//hooks
onMounted(async () => {
  uiStore.showPreloader()
  try {
    user.value = await $fetch(`${apiBase}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    })
    userStore.changeUserName(user.value?.name || '')
    userStore.changeLocalstorageAuthStatus(true)
    
    console.log('user', user.value)
  } catch {
    userStore.changeUserName(null)
    userStore.changeLocalstorageAuthStatus(false)
    user.value = null
    await navigateTo('/', { replace: true })
  } finally {
    isLoaded.value = true
    uiStore.hidePreloader()
  }
})

const form = reactive({
  name: '',
  phone: '',
})

const errors = ref<{ name: string; phone: string }>({ name: '', phone: '' })
const successMessage = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const phoneRegex = /^[+\d]*$/

function onPhoneInput(e: Event) {
  const target = e.target as HTMLInputElement
  const filtered = target.value.replace(/[^\d+]/g, '')
  if (target.value !== filtered) {
    form.phone = filtered
  }
}

function validate(): boolean {
  errors.value = { name: '', phone: '' }
  errorMessage.value = ''

  if (form.name.trim().length > 0 && form.name.trim().length < 2) {
    errors.value.name = 'Имя должно содержать минимум 2 символа'
    return false
  }
  if (form.phone && !phoneRegex.test(form.phone)) {
    errors.value.phone = 'Только цифры и знак +'
    return false
  }
  if (!form.name.trim() && !form.phone.trim()) {
    errorMessage.value = 'Укажите хотя бы одно поле для обновления'
    return false
  }
  return true
}

async function submitProfileUpdate() {
  const body: { name?: string; phone?: string } = {}
  if (form.name.trim()) body.name = form.name.trim()
  if (form.phone.trim()) body.phone = form.phone.trim()

  isSubmitting.value = true
  uiStore.showPreloader()
  try {
    const updated = await $fetch(`${apiBase}/user/edit`, {
      method: 'POST',
      body,
      credentials: 'include',
    })
    user.value = updated as typeof user.value
    userStore.changeUserName(user.value?.name || '')
    successMessage.value = 'Данные обновлены'
    setTimeout(() => { successMessage.value = '' }, 4000)
  } catch (err: unknown) {
    const e = err as { data?: { detail?: string }; statusCode?: number }
    const detail = e?.data?.detail ?? (typeof e?.data === 'string' ? e?.data : null)
    errorMessage.value = detail || 'Ошибка при обновлении данных'
  } finally {
    isSubmitting.value = false
    uiStore.hidePreloader()
  }
}

 function onSave() {
  successMessage.value = ''
  errorMessage.value = ''
  if (!validate()) return
   
  submitProfileUpdate()
}

watch(
  () => user.value,
  (u) => {
    if (u) {
      form.name = u.name || ''
      form.phone = (u.phone || '').replace(/[^\d+]/g, '')
    }
  },
  { immediate: true }
)
</script>
