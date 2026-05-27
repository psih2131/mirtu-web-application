<template>
  <div class="order-page__success">
    <h2 class="order-page__success-title">Заказ оформлен</h2>
    <div class="order-page__success-card">
      <div class="order-page__success-row">
        <span class="order-page__success-label">Номер заказа:</span>
        <span class="order-page__success-value">#{{ order.id }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Статус:</span>
        <span class="order-page__success-value">{{ order.status }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Адрес:</span>
        <span class="order-page__success-value">{{ order.address }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Способ доставки:</span>
        <span class="order-page__success-value">{{ order.shipping_method }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Опция доставки:</span>
        <span class="order-page__success-value">{{ order.delivery_option_method === 'FAST' ? 'Быстрая' : 'Стандартная' }}</span>
      </div>
      <div class="order-page__success-row order-page__success-row--total">
        <span class="order-page__success-label">Сумма:</span>
        <span class="order-page__success-value order-page__success-value--total">
          <span class="order-page__success-price-wrap">
            {{ formatPrice(orderTotal) }} {{ currencySymbol }}
            <s v-if="hasDiscount" class="order-page__success-old-price">{{ formatPrice(oldSum) }} {{ currencySymbol }}</s>
          </span>
          <span v-if="hasDiscount" class="order-page__success-discount">Скидка −{{ formatPrice(order.discount_applied) }} {{ currencySymbol }}</span>
        </span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Стоимость товаров:</span>
        <span class="order-page__success-value">{{ formatPrice(productsAmount) }} {{ currencySymbol }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Стоимость доставки:</span>
        <span class="order-page__success-value">
          {{ deliveryAmount > 0 ? `${formatPrice(deliveryAmount)} ${currencySymbol}` : 'Бесплатно' }}
        </span>
      </div>
      <div v-if="order.currency" class="order-page__success-row">
        <span class="order-page__success-label">Валюта:</span>
        <span class="order-page__success-value">{{ order.currency }}</span>
      </div>
      <div v-if="order.promo_code_used" class="order-page__success-row">
        <span class="order-page__success-label">Промокод:</span>
        <span class="order-page__success-value">{{ order.promo_code_used }}</span>
      </div>
      <div class="order-page__success-row">
        <span class="order-page__success-label">Дата:</span>
        <span class="order-page__success-value">{{ formatOrderDate(order.created_at) }}</span>
      </div>
    </div>

    <div v-if="payMethod === 'KASPI'" class="order-page__success-qr">
      <p class="order-page__success-qr-title">Для оплаты заказа используйте этот QR-код</p>
      <p class="order-page__success-qr-text">
        После того как платёж будет подтверждён нашим менеджером, мы подтвердим заказ и вы получите уведомление.
      </p>
      <img
        :src="kaspiQrImg"
        alt="QR-код Kaspi для оплаты"
        class="order-page__success-qr-img"
      >
    </div>

    <div v-if="payMethod === 'CARD' && paymentUrl" class="order-page__success-pay">
      <p class="order-page__success-pay-title">Оплата картой</p>
      <p class="order-page__success-pay-text">
        Нажмите кнопку ниже, чтобы перейти на защищённую страницу банка и оплатить заказ.
      </p>
      <a target="_blank" :href="paymentUrl" class="order-page__success-pay-btn">Оплатить заказ</a>
    </div>

    <div class="order-page__success-products">
      <h3 class="order-page__success-products-title">Товары в заказе</h3>
      <div v-if="order.items?.length" class="order-page__products">
     
        <!-- items -->
        <template v-for="(item, index) in (order.items || [])" :key="index">
          <OrderProcuctCard :item="item" />
        </template>
        
      </div>
      <p v-else class="order-page__success-empty">В заказе нет товаров</p>
    </div>
    <div class="order-page__success-btn-wrapper">
      <NuxtLink to="/" class="order-page__success-btn">Продолжить покупки</NuxtLink>
    </div>
    
  </div>
</template>

<script setup>
import OrderProcuctCard from '@/components/cards/OrderProcuctCard.vue'
import kaspiQrImg from '~/assets/images/qr/kaspi.png'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  payMethod: {
    type: String,
    required: true,
  },
})

const paymentUrl = computed(() => props.order?.payment_url || '')

const currencySymbol = computed(() => props.order?.currency_symbol || '₸')

const orderTotal = computed(
  () => Number(props.order?.payment_amount_kzt || props.order?.amount) || 0,
)

const hasDiscount = computed(() => {
  const d = Number(props.order?.discount_applied) || 0
  return d > 0
})

const oldSum = computed(() => {
  const discount = Number(props.order?.discount_applied) || 0
  return orderTotal.value + discount
})

const productsAmount = computed(() => {
  const o = props.order
  const fromApi =
    o?.items_amount_kzt ??
    o?.products_amount_kzt ??
    o?.subtotal_kzt ??
    o?.items_total_kzt

  if (fromApi != null && fromApi !== '') {
    return Number(fromApi) || 0
  }

  return (o?.items || []).reduce((sum, item) => {
    const price = Number(item.price_amount) || 0
    const qty = Number(item.quantity) || 1
    return sum + price * qty
  }, 0)
})

const deliveryAmount = computed(() => {
  const o = props.order
  const fromApi =
    o?.delivery_amount_kzt ??
    o?.delivery_amount ??
    o?.shipping_amount_kzt ??
    o?.shipping_amount

  if (fromApi != null && fromApi !== '') {
    return Number(fromApi) || 0
  }

  const discount = Number(o?.discount_applied) || 0
  return Math.max(0, orderTotal.value + discount - productsAmount.value)
})

function formatPrice(v) {
  return Number(v || 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function formatOrderDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>
