<template>
  <div class="order-confirm">
    <div class="container order-confirm__container">
      <div class="order-confirm__card">
        <div
          class="order-confirm__icon"
          :class="{
            'order-confirm__icon--pending': status === 'loading' || status === 'pending',
            'order-confirm__icon--error': status === 'error',
          }"
          aria-hidden="true"
        >
          <svg v-if="status === 'success'" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else-if="status === 'error'" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />
          </svg>
        </div>

        <h1 class="order-confirm__title">{{ title }}</h1>
        <p class="order-confirm__text">{{ text }}</p>
        <pre v-if="statusRaw" class="order-confirm__raw">{{ statusRaw }}</pre>

        <div class="order-confirm__actions">
          <NuxtLink
            v-if="status === 'success'"
            to="/user/orders"
            class="order-confirm__btn order-confirm__btn--primary"
          >
            Смотреть мои заказы
          </NuxtLink>
          <NuxtLink
            v-if="status === 'error' || status === 'pending'"
            to="/order"
            class="order-confirm__btn order-confirm__btn--primary"
          >
            Вернуться к заказу
          </NuxtLink>
          <NuxtLink to="/" class="order-confirm__btn order-confirm__btn--secondary">
            На главную
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

const route = useRoute()

const status = ref('loading')
const statusRaw = ref('')
const title = ref('Проверяем оплату…')
const text = ref('Подождите, идёт проверка статуса платежа в банке.')

function resolveBerekeOrderId() {
  const q = route.query
  return (
    q.orderId ||
    q.mdOrder ||
    q.order_id ||
    (import.meta.client ? sessionStorage.getItem('berekeOrderId') : null)
  )
}

onMounted(async () => {
  const orderId = resolveBerekeOrderId()

  if (!orderId) {
    status.value = 'pending'
    title.value = 'Оплата обрабатывается'
    text.value = 'Не удалось определить платёж. Проверьте статус заказа в личном кабинете.'
    return
  }

  try {
    const res = await fetch('/api/payment/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    })

    const bodyText = await res.text()
    statusRaw.value = bodyText

    let data = null
    try {
      data = bodyText ? JSON.parse(bodyText) : null
    } catch {
      data = bodyText
    }

    const orderStatus = Number(data?.orderStatus)

    if (orderStatus === 2) {
      status.value = 'success'
      title.value = 'Ваш заказ подтверждён'
      text.value =
        'Оплата прошла успешно. Мы уже приняли заказ в обработку — статус можно отслеживать в личном кабинете.'
      if (import.meta.client) sessionStorage.removeItem('berekeOrderId')
      return
    }

    status.value = 'pending'
    title.value = 'Оплата ещё не подтверждена'
    text.value =
      'Банк ещё не подтвердил платёж или оплата не завершена. Обновите страницу через минуту или проверьте заказы в кабинете.'
  } catch (e) {
    console.error('payment status error:', e)
    status.value = 'error'
    title.value = 'Не удалось проверить оплату'
    text.value = 'Попробуйте обновить страницу или посмотрите статус заказа в личном кабинете.'
  }
})

// TODO: ограничить доступ только для авторизованных пользователей (middleware)
</script>
