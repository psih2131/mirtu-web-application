<template>
  <div class="order-page__payment-methods">
    <button
      v-for="method in paymentMethods"
      :key="method.id"
      type="button"
      class="order-page__payment-card"
      :class="{ 'order-page__payment-card--active': paymentMethod === method.id }"
      @click="selectMethod(method.id)"
    >
      <img
        v-if="method.logo"
        :src="method.logo"
        :alt="method.title"
        class="order-page__payment-logo"
      >
      <div v-else class="order-page__payment-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5" />
          <path d="M2 10h20" stroke="currentColor" stroke-width="1.5" />
          <path d="M6 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <div class="order-page__payment-content">
        <h3 class="order-page__payment-title">{{ method.title }}</h3>
        <p class="order-page__payment-desc">{{ method.description }}</p>
      </div>
    </button>
  </div>
</template>

<script setup>
import kaspiLogo from '~/assets/images/payment/kaspi.png'

const props = defineProps({
  paymentMethod: {
    type: String,
    default: 'KASPI',
  },
})

const emit = defineEmits(['update:paymentMethod'])

const paymentMethods = [
  {
    id: 'KASPI',
    title: 'Каспи',
    description: 'Оплата картой Каспи или рассрочка',
    logo: kaspiLogo,
  },
  {
    id: 'CARD',
    title: 'Оплата картой',
    description: 'Visa, Mastercard и другие банковские карты',
    logo: null,
  },
]

function selectMethod(id) {
  if (id === props.paymentMethod) return
  emit('update:paymentMethod', id)
}
</script>
