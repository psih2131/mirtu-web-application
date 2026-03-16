<template>
  <div class="order-page__alert order-page__alert--error">
    <div class="order-page__alert-icon order-page__alert-icon--error">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <h2 class="order-page__alert-heading">Что-то пошло не так</h2>
    <p class="order-page__alert-text">Возникла ошибка на сайте. Попробуйте вернуться на главную</p>
    <NuxtLink to="/" class="order-page__alert-btn order-page__alert-btn--outline">Вернуться на главную</NuxtLink>
  </div>
</template>
