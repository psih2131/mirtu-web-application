<template>
  <div v-if="!isLoaded" class="user-cabinet user-cabinet--loading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="user-cabinet">
    <div class="container">
      <aside class="user-cabinet__nav">
        <UserCabinetNav :user="user" active-item="favorites" />
      </aside>

      <main class="user-cabinet__content">
        <section class="user-cabinet-favorites">
          <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <NuxtLink to="/products" class="category-page__breadcrumb-link">Каталог</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <span class="category-page__breadcrumb-current">Избранное</span>
          </nav>
          <h1 class="category-page__title">Избранное</h1>
          <ul v-if="favoritesList.length > 0" class="user-cabinet-favorites__grid">
            <li v-for="(product, idx) in favoritesList" :key="product.spu || idx" class="user-cabinet-favorites__grid-item">
              <CardsProductCard :product="normalizeProduct(product)" />
            </li>
          </ul>
          <p v-else class="user-cabinet-favorites__empty">В избранном пока нет товаров</p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'
import { useFavoritesStore } from '@/stores/favorites'

const userStore = useUserStore()
const uiStore = useUiStore()
const favoritesStore = useFavoritesStore()

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string; phone?: string | null } | null>(null)
const isLoaded = ref(false)

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

onMounted(async () => {
  if (import.meta.client) {
    favoritesStore.load()
  }
  uiStore.showPreloader()
  try {
    user.value = await $fetch(`${apiBase}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    })
    userStore.changeUserName(user.value?.name || '')
    userStore.changeLocalstorageAuthStatus(true)
  } catch {
    userStore.changeUserName(null)
    userStore.changeLocalstorageAuthStatus(false)
    user.value = null
    await navigateTo('/', { replace: true })
  } finally {
    isLoaded.value = true
    uiStore.hidePreloader()
  }
})
</script>
