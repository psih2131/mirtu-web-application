<template>
  <article class="product-card">
    <NuxtLink to="/" class="product-card__link">
      <div class="product-card__img-wrap">
        <img
          :src="product.image"
          :alt="product.brand"
          class="product-card__img"
          loading="lazy"
        >
      </div>
      <div class="product-card__body">
        <h3 class="product-card__brand">{{ product.brand }}</h3>
        <p class="product-card__category">{{ product.category }}</p>
        <p class="product-card__model">{{ product.model }}</p>
        <p class="product-card__price">{{ product.price }}</p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
export interface ProductCardData {
  image: string
  brand: string
  category: string
  model: string
  price: string
}

defineProps<{
  product: ProductCardData
}>()
</script>
