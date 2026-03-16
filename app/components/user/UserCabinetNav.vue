<template>
  <aside class="user-cabinet-nav">
    <div class="user-cabinet-nav__profile">
      <div class="user-cabinet-nav__avatar-wrap">
        <img
          :src="avatarSrc"
          :alt="user?.name || 'Пользователь'"
          class="user-cabinet-nav__avatar"
        >
      </div>
      <h2 class="user-cabinet-nav__name">{{ user?.name || 'Пользователь' }}</h2>
    </div>

    <nav class="user-cabinet-nav__menu">
      <NuxtLink to="/user" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'profile' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z" fill="currentColor"/>
          <path d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z" fill="currentColor"/>
        </svg>
        <span>О пользователе</span>
      </NuxtLink>
      <NuxtLink to="/user/orders" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'orders' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H4V4h16v3zm0 2v11H4V9h16zm-9 6h2v-3h-2v3z" fill="currentColor"/>
        </svg>
        <span>Заказы</span>
      </NuxtLink>
      <!-- Купленные товары (hidden)
      <NuxtLink to="/user/purchases" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'purchases' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
        </svg>
        <span>Купленные товары</span>
      </NuxtLink>
      -->
      <NuxtLink to="/user/favorites" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'favorites' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 21.875C11.8281 21.2792 11.0688 20.6594 10.2656 20H10.2552C7.42709 17.6875 4.22188 15.0708 2.80625 11.9354C2.34117 10.9372 2.0947 9.85118 2.08332 8.75001C2.08022 7.23906 2.68622 5.79062 3.76439 4.73206C4.84255 3.6735 6.30186 3.09417 7.8125 3.12501C9.04233 3.12695 10.2457 3.48239 11.2792 4.14897C11.7333 4.44373 12.1442 4.80028 12.5 5.20834C12.8578 4.80188 13.2688 4.44554 13.7219 4.14897C14.7549 3.48226 15.958 3.1268 17.1875 3.12501C18.6981 3.09417 20.1575 3.6735 21.2356 4.73206C22.3138 5.79062 22.9198 7.23906 22.9167 8.75001C22.9061 9.85294 22.6596 10.9408 22.1938 11.9406C20.7781 15.0761 17.574 17.6917 14.7458 20L14.7354 20.0083C13.9313 20.6636 13.1729 21.2833 12.501 21.8833L12.5 21.875Z" fill="currentColor"/>
        </svg>
        <span>Избранное</span>
      </NuxtLink>
      <NuxtLink to="/user/returns" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'returns' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill="currentColor"/>
        </svg>
        <span>Возвраты</span>
      </NuxtLink>
      <NuxtLink to="/user/reviews" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'reviews' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
        </svg>
        <span>Отзывы и вопросы</span>
      </NuxtLink>
      <!-- Логин и пароль (hidden)
      <NuxtLink to="/user/login-password" class="user-cabinet-nav__item" :class="{ 'user-cabinet-nav__item--active': activeItem === 'login-password' }">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/>
        </svg>
        <span>Логин и пароль</span>
      </NuxtLink>
      -->
    </nav>

    <div class="user-cabinet-nav__footer">
      <button type="button" class="user-cabinet-nav__item user-cabinet-nav__item--logout" @click="onLogout">
        <svg class="user-cabinet-nav__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
        </svg>
        <span>Выйти</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import avatarImg1 from '~/assets/images/img/header-logo.png'
import avatarImg2 from '~/assets/images/brends/0d9a80d8726234ca418ef6cde0c523d1.svg'
import avatarImg3 from '~/assets/images/brends/3f7fe697e8a65cdae39c543150e251d8.svg'
import { useUserStore } from '@/stores/user'
import { useCounterStore } from '@/stores/counter'

const userStore = useUserStore()
const counterStore = useCounterStore()

interface UserData {
  id: string
  email: string
  name: string
  phone?: string | null
}

const props = defineProps<{
  user: UserData | null
  activeItem?: string
}>()

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const avatarPlaceholders = [avatarImg1, avatarImg2, avatarImg3]

const avatarSrc = computed(() => {
  const id = props.user?.id || '0'
  const idx = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarPlaceholders.length
  return avatarPlaceholders[idx] || avatarPlaceholders[0]
})

async function onLogout() {
  try {
    const res = await $fetch(`${apiBase}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    userStore.changeLocalstorageAuthStatus(false)
    userStore.changeUserName(null)
    counterStore.setCartItems([])
    console.log('Ответ сервера при выходе:', res)
  } catch (err) {
    console.log('Ошибка при выходе:', err)
  }
  await navigateTo('/')
}
</script>
