import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type CartItem = {
  id: number
  article: string
  title: string
  quantity: number
  price_amount: number | string
  currency_code: string
  currency_symbol: string
  image_url: string
  sku_id_poizon?: number
  created_at?: string
}

export const useCounterStore = defineStore('counter', () => {
    const cartOpen = ref(false)
    const cartItems = ref<CartItem[]>([])

    const cartItemsCount = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const cartSubtotal = computed(() =>
        cartItems.value.reduce((sum, item) => {
            const price = Number(item.price_amount) || 0
            return sum + price * item.quantity
        }, 0)
    )

    function openCart() {
        cartOpen.value = true
    }

    function closeCart() {
        cartOpen.value = false
    }

    function setCartItems(items: CartItem[]) {
        cartItems.value = Array.isArray(items) ? items : []
    }

    function removeFromCart(id: number) {
        cartItems.value = cartItems.value.filter((item) => item.id !== id)
    }

    function updateCartQuantity(id: number, quantity: number) {
        const item = cartItems.value.find((i) => i.id === id)
        if (item) {
            item.quantity = Math.max(1, Math.min(99, quantity))
        }
    }

    return {
        cartOpen,
        cartItems,
        cartItemsCount,
        cartSubtotal,
        openCart,
        closeCart,
        setCartItems,
        removeFromCart,
        updateCartQuantity,
    }
})