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
            <span v-if="!cartAuthError" class="cart__count">{{ counterStore.cartItemsCount }} {{ itemsLabel }}</span>
          </div>
        </div>

        <!-- UI при ошибке авторизации -->
        <div v-if="cartAuthError" class="cart__auth-required">
          <p class="cart__auth-message">Для просмотра корзины необходимо авторизоваться.</p>
          <button type="button" class="cart__auth-btn" @click="onAuthRequiredClick">
            Авторизоваться
          </button>
        </div>

        <div v-else class="cart__main">
          <div class="cart__items-wrap">
            <template v-if="counterStore.cartItems.length">
              <div class="cart__table-head">
                <span class="cart__th cart__th--item">Товар</span>
                <span class="cart__th cart__th--qty">Кол-во</span>
                <span class="cart__th cart__th--price">Цена</span>
                <span class="cart__th cart__th--remove" aria-hidden="true" />
              </div>
              <div class="cart__list">
                <CartItem
                  v-for="item in counterStore.cartItems"
                  :key="item.id"
                  :item="item"
                  @remove="onRemove(item.id)"
                  @update-quantity="(qty) => onUpdateQuantity(item.id, qty)"
                />
              </div>
            </template>
            <p v-else class="cart__empty">Корзина пуста</p>
          </div>

          <aside class="cart__summary">
            <h3 class="cart__summary-title">Итого</h3>
            <dl class="cart__summary-rows">
              <div class="cart__summary-row">
                <dt>Стоимость</dt>
                <dd>{{ formatPrice(counterStore.cartSubtotal) }} {{ summarySymbol }}</dd>
              </div>
              <div class="cart__summary-row">
                <dt>Количество</dt>
                <dd>{{ counterStore.cartItemsCount }} {{ itemsLabel }}</dd>
              </div>
            </dl>
            <div class="cart__summary-row cart__summary-row--total">
              <dt>Итого</dt>
              <dd>{{ formatPrice(counterStore.cartSubtotal) }} {{ summarySymbol }}</dd>
            </div>
            <div class="cart__checkout-wrapper">
              <NuxtLink to="/order" class="cart__checkout" @click="closeCart">
                Оформить заказ
              </NuxtLink>
            </div>
            
          </aside>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { useModalStore } from '@/stores/modal'
import { useUiStore } from '@/stores/ui'

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const counterStore = useCounterStore()
const modalStore = useModalStore()
const uiStore = useUiStore()
const cartAuthError = ref(false)

async function fetchCart(opts = {}) {
  const { silent } = opts
  cartAuthError.value = false
  try {
    if (!silent) uiStore.showPreloader()
    const res = await fetch(`${apiBase}/cart`, { method: 'GET', credentials: 'include' })
    if (!res.ok) {
      if (res.status === 401) cartAuthError.value = true
      else console.error('Cart fetch error:', res.status)
      return
    }
    const result = await res.json()
    counterStore.setCartItems(result?.items ?? [])
  } catch (err) {
    console.error('Cart fetch error:', err)
  } finally {
    if (!silent) uiStore.hidePreloader()
  }
}

onMounted(() => {
  fetchCart({ silent: true })
})

watch(
  () => counterStore.cartOpen,
  async (isOpen) => {
    if (!isOpen) return
    await fetchCart()
  }
)

async function onUpdateQuantity(itemId, quantity) {
  try {
    const res = await fetch(`${apiBase}/cart/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
      credentials: 'include',
    })
    if (res.ok) await fetchCart()
  } catch (err) {
    console.error('Update quantity error:', err)
  }
}

async function onRemove(itemId) {
  try {
    const res = await fetch(`${apiBase}/cart/items/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    if (res.ok) await fetchCart()
  } catch (err) {
    console.error('Remove from cart error:', err)
  }
}

function onAuthRequiredClick() {
  closeCart()
  modalStore.openModal('auth')
}

const summarySymbol = computed(() => counterStore.cartItems[0]?.currency_symbol || '₸')

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
  return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>
