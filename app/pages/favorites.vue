<template>
  <section class="category-page favorites-page">
    <div class="container category-page__container">
      <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
        <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
        <span class="category-page__breadcrumb-sep">›</span>
        <NuxtLink to="/products" class="category-page__breadcrumb-link">Каталог</NuxtLink>
        <span class="category-page__breadcrumb-sep">›</span>
        <span class="category-page__breadcrumb-current">Избранное</span>
      </nav>

      <h1 class="category-page__title">Избранное</h1>

      <ul v-if="favoritesList.length > 0" class="category-page__grid favorites-page__grid">
        <li v-for="(product, idx) in favoritesList" :key="product.spu || idx" class="favorites-page__grid-item">
          <CardsProductCard :product="normalizeProduct(product)" />
        </li>
      </ul>
      <p v-else class="favorites-page__empty">В избранном пока нет товаров</p>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
const favoritesList = computed(() => favoritesStore.list)

function normalizeProduct(p: Record<string, unknown>) {
  const bi = p?.basicInfo as Record<string, unknown> | undefined
  const di = p?.displayInfo as Record<string, unknown> | undefined
  if (bi || di) {
    const spu = bi?.spuPoizon ?? di?.spuPoizon ?? p?.spu ?? ''
    return {
      ...p,
      spu,
      article: bi?.articlePoizon ?? p?.article ?? '',
      title: di?.display_title ?? bi?.title ?? p?.title ?? '',
      subtitle: bi?.title ?? p?.subtitle ?? '',
      price: di?.displayPriceAmount != null
        ? `${Number(di.displayPriceAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${(di?.displayPriceCurrencySymbol as string) ?? '₸'}`
        : (p?.price as string) ?? '',
      price_amount: di?.displayPriceAmount ?? p?.price_amount ?? '',
      currency_code: di?.displayPriceCurrency ?? p?.currency_code ?? 'KZT',
      img: di?.display_image ?? p?.img ?? p?.image_url ?? '',
      category: (bi?.category as Record<string, string>)?.category_ru ?? (p?.category as string) ?? '',
    }
  }
  return p as Record<string, unknown>
}

onMounted(() => {
  if (import.meta.client) {
    favoritesStore.load()
  }
})
</script>

<style scoped lang="scss">
.favorites-page {
  padding-top: 200px;
  padding-bottom: 100px;
  background: #fff;
}

.favorites-page__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.favorites-page__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.favorites-page__grid-item {
  min-width: 0;
}

.favorites-page__empty {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .favorites-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .favorites-page__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
</style>
