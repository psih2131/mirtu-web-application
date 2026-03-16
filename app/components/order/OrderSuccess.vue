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
            {{ formatPrice(order.payment_amount_kzt || order.amount) }} {{ order.currency_symbol || '₸' }}
            <s v-if="hasDiscount" class="order-page__success-old-price">{{ formatPrice(oldSum) }} {{ order.currency_symbol || '₸' }}</s>
          </span>
          <span v-if="hasDiscount" class="order-page__success-discount">Скидка −{{ formatPrice(order.discount_applied) }} {{ order.currency_symbol || '₸' }}</span>
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
    <NuxtLink to="/" class="order-page__success-btn">Продолжить покупки</NuxtLink>
  </div>
</template>

<script setup>
import OrderProcuctCard from '@/components/cards/OrderProcuctCard.vue'

import {ref} from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const hasDiscount = computed(() => {
  const d = Number(props.order?.discount_applied) || 0
  return d > 0
})

const oldSum = computed(() => {
  const current = Number(props.order?.payment_amount_kzt || props.order?.amount) || 0
  const discount = Number(props.order?.discount_applied) || 0
  return current + discount
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
