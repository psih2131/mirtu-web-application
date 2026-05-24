<template>
  <div class="order-failed">
    <div class="container order-failed__container">
      <div class="order-failed__card">
        <div class="order-failed__icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>

        <h1 class="order-failed__title">Оплата не прошла</h1>
        <p class="order-failed__text">
          Платёж не был завершён. Заказ сохранён — вы можете попробовать оплатить снова или выбрать другой способ оплаты.
        </p>

        <div class="order-failed__actions">
          <NuxtLink to="/order" class="order-failed__btn order-failed__btn--primary">
            Попробовать снова
          </NuxtLink>
          <NuxtLink to="/user/orders" class="order-failed__btn order-failed__btn--secondary">
            Мои заказы
          </NuxtLink>
          <NuxtLink to="/" class="order-failed__btn order-failed__btn--ghost">
            На главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

// TODO: ограничить доступ только для авторизованных пользователей (middleware)
</script>
