<template>
  <div class="cart-item">
    <div class="cart-item__col cart-item__col--item">
      <div class="cart-item__img-wrap">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          class="cart-item__img"
        >
        <div v-else class="cart-item__img cart-item__img--placeholder" />
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">{{ item.name }}</p>
        <p class="cart-item__type">{{ item.type }}</p>
      </div>
    </div>
    <div class="cart-item__col cart-item__col--size">
      <span class="cart-item__size">{{ item.size }}</span>
    </div>
    <div class="cart-item__col cart-item__col--qty">
      <div class="cart-item__qty">
        <button
          type="button"
          class="cart-item__qty-btn"
          aria-label="Уменьшить количество"
          :disabled="item.quantity <= 1"
          @click="updateQty(item.quantity - 1)"
        >
          −
        </button>
        <span class="cart-item__qty-value">{{ item.quantity }}</span>
        <button
          type="button"
          class="cart-item__qty-btn"
          aria-label="Увеличить количество"
          :disabled="item.quantity >= 99"
          @click="updateQty(item.quantity + 1)"
        >
          +
        </button>
      </div>
    </div>
    <div class="cart-item__col cart-item__col--price">
      <span class="cart-item__price">{{ formatPrice(itemTotal) }} ₸</span>
    </div>
    <div class="cart-item__col cart-item__col--remove">
      <button
        type="button"
        class="cart-item__remove"
        aria-label="Удалить из корзины"
        @click="$emit('remove')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove', 'updateQuantity'])

const itemTotal = computed(() => props.item.price * props.item.quantity)

function formatPrice(value) {
  return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function updateQty(quantity) {
  if (quantity < 1 || quantity > 99) return
  emit('updateQuantity', quantity)
}
</script>
