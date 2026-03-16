<template>
  <NuxtLink v-if="item" :to="`/products/${item.sku_id_poizon}`" class="order-page__product-card">
    <div class="order-page__product-img-wrap">
      <img class="order-page__product-img" :src="item.image_url" :alt="item.title">
      <span v-if="item.quantity" class="order-page__product-qty-badge">{{ item.quantity }}</span>
    </div>
    <p class="order-page__product-name">{{ item.title }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },

})
</script>