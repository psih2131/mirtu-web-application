<template>
  <div v-if="!isLoaded" class="user-cabinet user-cabinet--loading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="user-cabinet">
    <aside class="user-cabinet__nav">
      <UserCabinetNav :user="user" active-item="profile" />
    </aside>

    <main class="user-cabinet__content">
      <section class="user-cabinet-profile">
        <h1 class="user-cabinet-profile__title">Персональная информация</h1>

        <div class="user-cabinet-profile__fields">
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Ваше имя</label>
            <input
              v-model="form.name"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Имя"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Ваша фамилия</label>
            <input
              v-model="form.surname"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Фамилия"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Ваша почта</label>
            <input
              v-model="form.email"
              type="email"
              class="user-cabinet-profile__input"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Страна</label>
            <input
              v-model="form.country"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Страна"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Номер телефона</label>
            <input
              v-model="form.phone"
              type="tel"
              class="user-cabinet-profile__input"
              placeholder="Телефон"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Дата рождения</label>
            <input
              v-model="form.birthDate"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Дата рождения"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field" style="grid-column: 1 / -1">
            <label class="user-cabinet-profile__label">Адрес</label>
            <input
              v-model="form.address"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Адрес"
              readonly
            >
          </div>
          <div class="user-cabinet-profile__field">
            <label class="user-cabinet-profile__label">Код</label>
            <input
              v-model="form.code"
              type="text"
              class="user-cabinet-profile__input"
              placeholder="Код"
              readonly
            >
          </div>
        </div>

        <div class="user-cabinet-profile__actions">
          <button type="button" class="user-cabinet-profile__btn user-cabinet-profile__btn--reset">
            Сбросить изменения
          </button>
          <button type="button" class="user-cabinet-profile__btn user-cabinet-profile__btn--save">
            Сохранить изменения
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string; phone?: string | null } | null>(null)
const isLoaded = ref(false)

onMounted(async () => {
  try {
    user.value = await $fetch(`${apiBase}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    })
  } catch {
    user.value = null
  } finally {
    isLoaded.value = true
  }
})

const form = reactive({
  name: '',
  surname: '',
  email: '',
  country: '',
  phone: '',
  birthDate: '',
  address: '',
  code: '',
})

watch(
  () => user.value,
  (u) => {
    if (u) {
      const parts = (u.name || '').split(' ')
      form.name = parts[0] || ''
      form.surname = parts.slice(1).join(' ') || ''
      form.email = u.email || ''
      form.phone = u.phone || ''
      form.country = ''
      form.birthDate = ''
      form.address = ''
      form.code = ''
    }
  },
  { immediate: true }
)
</script>
