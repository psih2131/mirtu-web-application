<template>
  <div class="order-page">
    <div class="container order-page__container">
      <h1 class="order-page__title">Оформление заказа</h1>

      <div class="order-page__layout">
        <main class="order-page__main">
          <section class="order-page__section">
            <h2 class="order-page__section-title">Ваш заказ</h2>
            <div class="order-page__table-head">
              <span class="order-page__th order-page__th--item">Товар</span>
              <span class="order-page__th order-page__th--size">Размер</span>
              <span class="order-page__th order-page__th--qty">Кол-во</span>
              <span class="order-page__th order-page__th--price">Цена</span>
            </div>
            <div class="order-page__list">
              <OrderItem
                v-for="item in orderItemsWithImages"
                :key="item.id"
                :item="item"
                :quantity="getOrderQuantity(item.id)"
                @update-quantity="setOrderQuantity(item.id, $event)"
              />
            </div>
          </section>

          <section class="order-page__section">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">1</span>
              <h2 class="order-page__section-title">Выбрать способ получения</h2>
            </div>
            <div class="order-page__options">
              <button
                type="button"
                class="order-page__option"
                :class="{ 'order-page__option--active': deliveryMethod === 'delivery' }"
                @click="deliveryMethod = 'delivery'"
              >
                <span class="order-page__option-title">Доставка</span>
                <span class="order-page__option-desc">с 28 июля, от 300 ₸</span>
              </button>
              <button
                type="button"
                class="order-page__option"
                :class="{ 'order-page__option--active': deliveryMethod === 'pickup' }"
                @click="deliveryMethod = 'pickup'"
              >
                <span class="order-page__option-title">Самовывоз</span>
                <span class="order-page__option-desc">Завтра, 0 ₸</span>
              </button>
            </div>
          </section>

          <section class="order-page__section">
            <h2 class="order-page__section-title">Адрес</h2>
            <div class="order-page__form">
              <div class="order-page__form-row">
                <input
                  v-model="form.region"
                  type="text"
                  class="order-page__input"
                  placeholder="Регион"
                >
                <input
                  v-model="form.address"
                  type="text"
                  class="order-page__input"
                  placeholder="Адрес"
                >
              </div>
              <div class="order-page__form-row">
                <input
                  v-model="form.comment"
                  type="text"
                  class="order-page__input order-page__input--wide"
                  placeholder="Комментарий"
                >
              </div>
              <div class="order-page__form-row order-page__form-row--inline">
                <input
                  v-model="form.apartment"
                  type="text"
                  class="order-page__input order-page__input--small"
                  placeholder="Квартира"
                >
                <input
                  v-model="form.floor"
                  type="text"
                  class="order-page__input order-page__input--small"
                  placeholder="Этаж"
                >
                <input
                  v-model="form.intercom"
                  type="text"
                  class="order-page__input order-page__input--small"
                  placeholder="Домофон"
                >
              </div>
            </div>
          </section>

          <section class="order-page__section">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">2</span>
              <h2 class="order-page__section-title">Способ оплаты</h2>
            </div>
            <div class="order-page__options">
              <button
                type="button"
                class="order-page__option"
                :class="{ 'order-page__option--active': paymentMethod === 'cash' }"
                @click="paymentMethod = 'cash'"
              >
                <span class="order-page__option-title">Наличными при получении</span>
              </button>
              <button
                type="button"
                class="order-page__option"
                :class="{ 'order-page__option--active': paymentMethod === 'card' }"
                @click="paymentMethod = 'card'"
              >
                <span class="order-page__option-title">Банковская карта</span>
                <span class="order-page__option-cards">МИР · VISA · MasterCard</span>
              </button>
            </div>
          </section>
        </main>

        <aside class="order-page__summary">
          <div class="order-page__summary-inner">
            <div class="order-page__summary-row">
              <span class="order-page__summary-label">Товаров, {{ counterStore.cartItemsCount }} шт.</span>
              <span class="order-page__summary-value">{{ formatPrice(counterStore.cartSubtotal) }} ₸</span>
            </div>
            <div class="order-page__summary-row">
              <span class="order-page__summary-label">Доставка</span>
              <span class="order-page__summary-value">{{ formatPrice(counterStore.cartShipping) }} ₸</span>
            </div>
            <div class="order-page__summary-row">
              <span class="order-page__summary-label">Налог</span>
              <span class="order-page__summary-value">{{ formatPrice(counterStore.cartTax) }} ₸</span>
            </div>
            <div v-if="orderBenefit > 0" class="order-page__summary-row order-page__summary-row--benefit">
              <span class="order-page__summary-label">Выгода:</span>
              <span class="order-page__summary-value">−{{ formatPrice(orderBenefit) }} ₸</span>
            </div>
            <div class="order-page__summary-row order-page__summary-row--total">
              <span class="order-page__summary-label">Итого:</span>
              <span class="order-page__summary-value">{{ formatPrice(counterStore.cartTotal) }} ₸</span>
            </div>
            <button type="button" class="order-page__submit" @click="submitOrder">
              Оформить заказ
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

definePageMeta({ layout: 'default' })

const productImageModulesWebp = import.meta.glob('~/assets/images/products/*.webp', { eager: true, query: '?url', import: 'default' })
const productImageModulesJpg = import.meta.glob('~/assets/images/products/*.jpg', { eager: true, query: '?url', import: 'default' })
const productImageUrls = [
  ...Object.values(productImageModulesWebp).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
  ...Object.values(productImageModulesJpg).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
].filter(Boolean)

function getOrderImg(index) {
  const i = Number(index) || 0
  return productImageUrls[i % productImageUrls.length] ?? productImageUrls[0] ?? ''
}

const counterStore = useCounterStore()
const deliveryMethod = ref('delivery')
const paymentMethod = ref('cash')
const orderBenefit = ref(0)
const orderQuantities = ref({})

const getOrderQuantity = (id) => {
  if (orderQuantities.value[id] !== undefined) return orderQuantities.value[id]
  const item = counterStore.cartItems.find((i) => i.id === id)
  return item ? item.quantity : 1
}
const setOrderQuantity = (id, qty) => {
  orderQuantities.value = { ...orderQuantities.value, [id]: qty }
}

const form = reactive({
  region: '',
  address: '',
  comment: '',
  apartment: '',
  floor: '',
  intercom: '',
})

const orderItemsWithImages = computed(() =>
  counterStore.cartItems.map((item) => ({
    ...item,
    image: item.image || getOrderImg(item.imageIndex ?? 0),
  }))
)

function formatPrice(value) {
  return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function submitOrder() {
  // TODO: отправка заказа
}
</script>
