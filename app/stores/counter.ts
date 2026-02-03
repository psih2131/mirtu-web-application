import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type CartItem = {
  id: string
  image: string
  imageIndex?: number
  name: string
  type: string
  size: string
  quantity: number
  price: number
}

export const useCounterStore = defineStore('counter', () => {
    const cartOpen = ref(false)
    const cartItems = ref<CartItem[]>([
        { id: '1', image: '', imageIndex: 0, name: 'Nike SB Dunk Low Pro', type: 'КРОССОВКИ', size: '42', quantity: 1, price: 45990 },
        { id: '2', image: '', imageIndex: 1, name: 'adidas Hamburg', type: 'КРОССОВКИ', size: '41', quantity: 1, price: 32990 },
        { id: '3', image: '', imageIndex: 2, name: 'Reebok Club C 85', type: 'КРОССОВКИ', size: '40', quantity: 1, price: 28990 },
    ])

    const cartItemsCount = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const cartSubtotal = computed(() =>
        cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const cartShipping = computed(() => (cartSubtotal.value >= 50000 ? 0 : 500))
    const cartTax = computed(() => Math.round(cartSubtotal.value * 0.15 * 100) / 100)
    const cartTotal = computed(() => cartSubtotal.value + cartShipping.value + cartTax.value)

    function openCart() {
        cartOpen.value = true
    }

    function closeCart() {
        cartOpen.value = false
    }

    function removeFromCart(id: string) {
        cartItems.value = cartItems.value.filter((item) => item.id !== id)
    }

    function updateCartQuantity(id: string, quantity: number) {
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
        cartShipping,
        cartTax,
        cartTotal,
        openCart,
        closeCart,
        removeFromCart,
        updateCartQuantity,
    }
})