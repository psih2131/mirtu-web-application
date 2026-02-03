<template>
  <div class="order-item">
    <div class="order-item__col order-item__col--item">
      <div class="order-item__img-wrap">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.name"
          class="order-item__img"
        >
        <div v-else class="order-item__img order-item__img--placeholder" />
      </div>
      <div class="order-item__info">
        <p class="order-item__name">{{ item.name }}</p>
        <p class="order-item__type">{{ item.type }}</p>
      </div>
    </div>
    <div class="order-item__col order-item__col--size">
      <span class="order-item__size">{{ item.size }}</span>
    </div>
    <div class="order-item__col order-item__col--qty">
      <div class="order-item__qty">
        <button
          type="button"
          class="order-item__qty-btn"
          aria-label="Уменьшить количество"
          :disabled="displayQty <= 1"
          @click="changeQty(displayQty - 1)"
        >
          −
        </button>
        <span class="order-item__qty-value">{{ displayQty }}</span>
        <button
          type="button"
          class="order-item__qty-btn"
          aria-label="Увеличить количество"
          :disabled="displayQty >= 99"
          @click="changeQty(displayQty + 1)"
        >
          +
        </button>
      </div>
    </div>
    <div class="order-item__col order-item__col--price">
      <span class="order-item__price">{{ formatPrice(itemTotal) }} ₸</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['updateQuantity'])

const displayQty = computed(() => Math.max(1, Math.min(99, props.quantity)))
const itemTotal = computed(() => props.item.price * displayQty.value)

function formatPrice(value) {
  return Number(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function changeQty(qty) {
  if (qty < 1 || qty > 99) return
  emit('updateQuantity', qty)
}
</script>
