<template>
  <Transition name="cart">
    <div
      v-if="counterStore.cartOpen"
      class="cart"
      role="dialog"
      aria-modal="true"
      aria-label="Корзина"
    >
      <div class="cart__overlay" aria-hidden="true" @click="closeCart" />
      <div class="cart__panel">
        <div class="cart__head">
          <div class="cart__head-top">
            <NuxtLink to="/" class="cart__back" @click="closeCart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Вернуться в магазин
            </NuxtLink>
            <button
              type="button"
              class="cart__close"
              aria-label="Закрыть корзину"
              @click="closeCart"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="cart__head-title-row">
            <h2 class="cart__title">Корзина</h2>
            <span class="cart__count">{{ counterStore.cartItemsCount }} {{ itemsLabel }}</span>
          </div>
        </div>

        <div class="cart__main">
          <div class="cart__items-wrap">
            <template v-if="counterStore.cartItems.length">
              <div class="cart__table-head">
                <span class="cart__th cart__th--item">Товар</span>
                <span class="cart__th cart__th--size">Размер</span>
                <span class="cart__th cart__th--qty">Кол-во</span>
                <span class="cart__th cart__th--price">Цена</span>
                <span class="cart__th cart__th--remove" aria-hidden="true" />
              </div>
              <div class="cart__list">
                <CartItem
                  v-for="item in cartItemsWithImages"
                  :key="item.id"
                  :item="item"
                  @remove="counterStore.removeFromCart(item.id)"
                  @update-quantity="(qty) => counterStore.updateCartQuantity(item.id, qty)"
                />
              </div>
              <p class="cart__shipping-note">Бесплатная доставка при заказе от 50 000 ₸</p>
            </template>
            <p v-else class="cart__empty">Корзина пуста</p>
          </div>

          <aside class="cart__summary">
            <h3 class="cart__summary-title">Итого</h3>
            <dl class="cart__summary-rows">
              <div class="cart__summary-row">
                <dt>Подытог</dt>
                <dd>{{ formatPrice(counterStore.cartSubtotal) }} ₸</dd>
              </div>
              <div class="cart__summary-row">
                <dt>Доставка</dt>
                <dd>{{ formatPrice(counterStore.cartShipping) }} ₸</dd>
              </div>
              <div class="cart__summary-row">
                <dt>Налог</dt>
                <dd>{{ formatPrice(counterStore.cartTax) }} ₸</dd>
              </div>
            </dl>
            <div class="cart__promo">
              <label for="cart-promo" class="cart__promo-label">Промокод</label>
              <input
                id="cart-promo"
                v-model="promoCode"
                type="text"
                class="cart__promo-input"
                placeholder="введите код"
              >
            </div>
            <div class="cart__summary-row cart__summary-row--total">
              <dt>Итого</dt>
              <dd>{{ formatPrice(counterStore.cartTotal) }} ₸</dd>
            </div>
            <NuxtLink to="/order" class="cart__checkout" @click="closeCart">
              Оформить заказ
            </NuxtLink>
          </aside>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const productImageModulesWebp = import.meta.glob('~/assets/images/products/*.webp', { eager: true, query: '?url', import: 'default' })
const productImageModulesJpg = import.meta.glob('~/assets/images/products/*.jpg', { eager: true, query: '?url', import: 'default' })
const productImageUrls = [
  ...Object.values(productImageModulesWebp).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
  ...Object.values(productImageModulesJpg).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
].filter(Boolean)

function getCartImg(index) {
  const i = Number(index) || 0
  return productImageUrls[i % productImageUrls.length] ?? productImageUrls[0] ?? ''
}

const counterStore = useCounterStore()
const promoCode = ref('')

const cartItemsWithImages = computed(() =>
  counterStore.cartItems.map((item) => ({
    ...item,
    image: item.image || getCartImg(item.imageIndex ?? 0),
  }))
)

const itemsLabel = computed(() => {
  const n = counterStore.cartItemsCount
  if (n === 1) return 'товар'
  if (n >= 2 && n <= 4) return 'товара'
  return 'товаров'
})

function closeCart() {
  counterStore.closeCart()
}

function formatPrice(value) {
  return Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>
