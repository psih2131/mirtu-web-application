<template>
  <div class="product-page">
    <section class="product-hero">
      <div class="container product-hero__container">
        <div class="product-hero__top">
          <nav class="product-hero__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="product-hero__breadcrumb">Главная</NuxtLink>
            <span class="product-hero__breadcrumb-sep">›</span>
            <NuxtLink to="/products" class="product-hero__breadcrumb">Каталог</NuxtLink>
            <template v-for="(crumb, i) in breadcrumbs" :key="i">
              <span class="product-hero__breadcrumb-sep">›</span>
              <NuxtLink
                v-if="crumb.to"
                :to="crumb.to"
                class="product-hero__breadcrumb"
              >
                {{ crumb.title }}
              </NuxtLink>
              <span v-else class="product-hero__breadcrumb-current">{{ crumb.title }}</span>
            </template>
          </nav>
          <div class="product-hero__actions">
            <span class="product-hero__sku">Артикул: {{ cardData?.basicInfo?.articlePoizon || '—' }}</span>
          </div>
        </div>

        <div class="product-hero__layout">
          <div class="product-hero__gallery">
            <ClientOnly>
              <ProductGallery
                :key="selectedVariantIndex"
                :images="productImages"
                :title="cardData?.basicInfo?.title || cardData?.displayInfo?.display_title || 'Товар'"
              />
            </ClientOnly>
          </div>

          <div class="product-hero__info">
            <div class="product-hero__info-header">
              <p class="product-hero__brand">{{ cardData?.basicInfo?.brand || '—' }}</p>
              <span
                class="product-hero__availability"
                :class="hasAvailableSizes ? 'product-hero__availability--in' : 'product-hero__availability--out'"
                aria-live="polite"
              >
                <span class="product-hero__availability-dot" aria-hidden="true" />
                {{ hasAvailableSizes ? 'В наличии' : 'Нет в наличии' }}
              </span>
              <h1 class="product-hero__title">{{ cardData?.basicInfo?.title || cardData?.displayInfo?.display_title || '—' }}</h1>
            </div>
            
            <div class="product-hero__rating">
              <span class="product-hero__stars" aria-hidden="true">★★★★☆</span>
              <NuxtLink to="#reviews" class="product-hero__reviews-link">0 отзывов</NuxtLink>
            </div>

            <div class="product-hero__price-wrap">
              <span class="product-hero__price">{{ productPrice }}</span>
              <span class="product-hero__price-old">{{ productOldPrice || '—' }}</span>
            </div>

            <div v-if="productColor" class="product-hero__option">
              <span class="product-hero__option-label">Цвет: {{ productColor }}</span>
            </div>

            <div class="product-hero__option">
              <span class="product-hero__option-label">Размер: {{ selectedVariant?.args?.Размер || '—' }}</span>
              <div class="product-hero__sizes">
                <button
                  v-for="(variant, i) in variants"
                  :key="variant.skuIdPoizon || i"
                  type="button"
                  class="product-hero__size-btn"
                  :class="{
                    'product-hero__size-btn--active': selectedVariantIndex === i,
                    'product-hero__size-btn--disabled': !variant.isAvailable,
                  }"
                  :disabled="!variant.isAvailable"
                  @click="selectVariant(i)"
                >
                  {{ variant.args?.Размер || '—' }}
                </button>
              </div>
              <button
                v-if="hasSizeTable"
                type="button"
                class="product-hero__size-guide product-hero__size-guide--btn"
                @click="sizeTableModalOpen = true"
              >
                Таблица размеров
              </button>
              <NuxtLink v-else to="#size-guide" class="product-hero__size-guide">Таблица размеров</NuxtLink>
            </div>

            <div v-if="hasAvailableSizes" class="product-hero__cta">
              <button type="button" class="product-hero__add-cart">
                <svg class="product-hero__cart-icon" width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.875 19.25C8.35825 19.25 8.75 18.8582 8.75 18.375C8.75 17.8918 8.35825 17.5 7.875 17.5C7.39175 17.5 7 17.8918 7 18.375C7 18.8582 7.39175 19.25 7.875 19.25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17.5 19.25C17.9832 19.25 18.375 18.8582 18.375 18.375C18.375 17.8918 17.9832 17.5 17.5 17.5C17.0168 17.5 16.625 17.8918 16.625 18.375C16.625 18.8582 17.0168 19.25 17.5 19.25Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M0.875 0.875H4.375L6.72 12.5913C6.80001 12.9941 7.01917 13.356 7.3391 13.6135C7.65904 13.8711 8.05936 14.0079 8.47 14H16.975C17.3856 14.0079 17.786 13.8711 18.1059 13.6135C18.4258 13.356 18.645 12.9941 18.725 12.5913L20.125 5.25H5.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Добавить в корзину
              </button>
              <div class="product-hero__qty">
                <button type="button" class="product-hero__qty-btn" aria-label="Уменьшить" @click="quantity = Math.max(1, quantity - 1)">
                  −
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  class="product-hero__qty-input"
                  min="1"
                  max="99"
                  aria-label="Количество"
                  @input="quantity = Math.min(99, Math.max(1, Number(quantity) || 1))"
                >
                <button type="button" class="product-hero__qty-btn" aria-label="Увеличить" @click="quantity = Math.min(99, quantity + 1)">
                  +
                </button>
              </div>
            </div>

            <div v-else class="product-hero__out-of-stock">
              <span class="product-hero__out-of-stock-icon">!</span>
              <p class="product-hero__out-of-stock-text">Нет в наличии</p>
              <p class="product-hero__out-of-stock-hint">Товар отсутствует на складе</p>
            </div>

            <p class="product-hero__delivery">Бесплатная доставка при заказе от 30 000 ₸</p>

            <div v-if="cardData" class="product-hero__about">
              <h2 class="product-hero__about-title">О товаре</h2>
              <dl class="product-hero__specs">
                <div
                  v-for="(item, idx) in aboutProductSpecs"
                  :key="idx"
                  class="product-hero__spec-row"
                >
                  <dt class="product-hero__spec-dt">{{ item.name }}</dt>
                  <dd class="product-hero__spec-dd">{{ item.value }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="product-accordion">
      <div class="container">
        <div class="product-accordion__item" :class="{ 'product-accordion__item--open': accordionOpen.description }">
          <button
            type="button"
            class="product-accordion__head"
            aria-expanded="accordionOpen.description"
            :aria-controls="'accordion-description'"
            :id="'accordion-head-description'"
            @click="accordionOpen.description = !accordionOpen.description"
          >
            <span class="product-accordion__title">Описание</span>
            <span class="product-accordion__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <Collapse :when="accordionOpen.description" class="product-accordion__collapse">
            <div id="accordion-description" class="product-accordion__body" role="region" aria-labelledby="accordion-head-description">
              <div class="product-accordion__content">
                <p v-for="(p, i) in descriptionParagraphs" :key="i" class="product-accordion__text">{{ p }}</p>
              </div>
            </div>
          </Collapse>
        </div>
        <div class="product-accordion__item" :class="{ 'product-accordion__item--open': accordionOpen.specs }">
          <button
            type="button"
            class="product-accordion__head"
            aria-expanded="accordionOpen.specs"
            :aria-controls="'accordion-specs'"
            :id="'accordion-head-specs'"
            @click="accordionOpen.specs = !accordionOpen.specs"
          >
            <span class="product-accordion__title">Характеристики</span>
            <span class="product-accordion__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <Collapse :when="accordionOpen.specs" class="product-accordion__collapse">
            <div id="accordion-specs" class="product-accordion__body" role="region" aria-labelledby="accordion-head-specs">
              <dl class="product-accordion__specs">
                <div
                  v-for="(item, idx) in productSpecs"
                  :key="idx"
                  class="product-accordion__spec-row"
                >
                  <dt class="product-accordion__spec-dt">{{ item.name }}</dt>
                  <dd class="product-accordion__spec-dd">{{ item.value }}</dd>
                </div>
              </dl>
            </div>
          </Collapse>
        </div>
        <div
          v-if="staticCategoryContent?.care"
          class="product-accordion__item"
          :class="{ 'product-accordion__item--open': accordionOpen.care }"
        >
          <button
            type="button"
            class="product-accordion__head"
            aria-expanded="accordionOpen.care"
            :aria-controls="'accordion-care'"
            :id="'accordion-head-care'"
            @click="accordionOpen.care = !accordionOpen.care"
          >
            <span class="product-accordion__title">{{ staticCategoryContent.care.title }}</span>
            <span class="product-accordion__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <Collapse :when="accordionOpen.care" class="product-accordion__collapse">
            <div id="accordion-care" class="product-accordion__body" role="region" aria-labelledby="accordion-head-care">
              <div class="product-accordion__content">
                <p v-for="(p, i) in staticCategoryContent.care.paragraphs" :key="i" class="product-accordion__text">{{ p }}</p>
              </div>
            </div>
          </Collapse>
        </div>
        <div
          v-for="block in commonBlocks"
          :key="block.key"
          class="product-accordion__item"
          :class="{ 'product-accordion__item--open': accordionOpen[block.key] }"
        >
          <button
            type="button"
            class="product-accordion__head"
            :aria-expanded="accordionOpen[block.key]"
            :aria-controls="'accordion-' + block.key"
            :id="'accordion-head-' + block.key"
            @click="accordionOpen[block.key] = !accordionOpen[block.key]"
          >
            <span class="product-accordion__title">{{ block.title }}</span>
            <span class="product-accordion__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
              </svg>
            </span>
          </button>
          <Collapse :when="accordionOpen[block.key]" class="product-accordion__collapse">
            <div :id="'accordion-' + block.key" class="product-accordion__body" role="region" :aria-labelledby="'accordion-head-' + block.key">
              <div class="product-accordion__content">
                <p v-for="(p, i) in block.paragraphs" :key="i" class="product-accordion__text">{{ p }}</p>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </section>

    <SectionsProductsSliderSec
      title="Похожие товары"
      :products="relatedProducts"
      :max-slides-per-view="4"
    />

    <SizeTableModal
      v-model="sizeTableModalOpen"
      :size-table="sizeTable || {}"
    />
  </div>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'
import { ref, computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useCounterStore } from '@/stores/counter'
import { useUiStore } from '@/stores/ui'

const route = useRoute()
const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain.endsWith('/api') ? apiUrlDomain : apiUrlDomain.replace(/\/?$/, '') + '/api'

const store = useCounterStore()
const uiStore = useUiStore()

const spu = route.params.id

uiStore.showPreloader()
let cardDataRef
try {
  cardDataRef = await useFetch(`${apiBase}/card/${spu}`, {
    method: 'GET',
    key: `card-${spu}`,
  })
} finally {
  uiStore.hidePreloader()
}
const { data: cardData } = cardDataRef

const { data: reviewsData } = await useFetch(`${apiBase}/reviews/card/${spu}`, {
  method: 'GET',
  key: `reviews-card-${spu}`,
})
console.log('Отзывы товара:', reviewsData.value)

watch(cardData, (val) => {
  console.log('cardData:', val)
}, { immediate: true })

const breadcrumbs = computed(() => {
  const bi = cardData.value?.basicInfo
  const di = cardData.value?.displayInfo
  const category = bi?.category
  const categoryTitle = category?.category_ru || category?.name_ru || 'Каталог'
  const categoryId = category?.id
  const productTitle = bi?.title || di?.display_title || 'Товар'
  const items = []
  if (categoryTitle && categoryTitle !== 'Каталог') {
    items.push({
      title: categoryTitle,
      to: categoryId ? `/products/categories/${categoryId}` : null,
    })
  }
  items.push({ title: productTitle, to: null })
  return items
})

const sizeTable = computed(() => {
  const table = cardData.value?.sizeTable
  if (table && typeof table === 'object' && !Array.isArray(table) && Object.keys(table).length > 0) {
    return table
  }
  return null
})

const hasSizeTable = computed(() => sizeTable.value != null)

const sizeTableModalOpen = ref(false)

const variants = computed(() => cardData.value?.variants || [])

const hasAvailableSizes = computed(() =>
  variants.value.some((v) => v.isAvailable === true)
)

const selectedVariantIndex = ref(0)

const selectedVariant = computed(() => {
  const list = variants.value
  if (!list.length) return null
  const idx = Math.min(selectedVariantIndex.value, list.length - 1)
  return list[idx]
})

const productImages = computed(() => {
  const v = selectedVariant.value
  if (v?.images?.length) return v.images
  const mainImg = cardData.value?.displayInfo?.display_image
  return mainImg ? [mainImg] : (productImageUrls?.length ? productImageUrls : ['/placeholder-product.jpg'])
})

const productSpecs = computed(() => {
  const props = cardData.value?.basicInfo?.properties
  if (!props || typeof props !== 'object') return []
  return Object.entries(props).map(([name, value]) => ({
    name,
    value: value != null ? String(value) : '—',
  }))
})

const productColor = computed(() => {
  const v = selectedVariant.value
  const args = v?.args
  if (args && (args.Цвет != null || args.Color != null)) {
    return String(args.Цвет ?? args.Color ?? '')
  }
  const props = cardData.value?.basicInfo?.properties
  if (props && typeof props === 'object') {
    const color = props.Цвет ?? props.Color ?? props.color
    if (color != null) return String(color)
  }
  return cardData.value?.displayInfo?.display_style || ''
})

/** Основные поля для блока «О товаре» из cardData */
const aboutProductSpecs = computed(() => {
  const bi = cardData.value?.basicInfo
  const di = cardData.value?.displayInfo
  const gender = bi?.gender ?? di?.gender ?? cardData.value?.basicInfo?.properties?.gender ?? '—'
  return [
    { name: 'Артикул', value: bi?.articlePoizon || '—' },
    { name: 'Бренд', value: bi?.brand || '—' },
    { name: 'Категория', value: bi?.category?.category_ru || '—' },
    { name: 'Цвет', value: productColor.value || '—' },
    { name: 'Пол', value: gender !== '—' ? String(gender) : '—' },
  ]
})

const productPrice = computed(() => {
  const v = selectedVariant.value
  if (v?.priceAmount != null) {
    const amount = Number(v.priceAmount)
    const formatted = Number.isFinite(amount) ? amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : v.priceAmount
    return `${formatted} ${v.priceCurrencySymbol || '₽'}`
  }
  const di = cardData.value?.displayInfo
  if (di?.displayPriceAmount != null) {
    const amount = Number(di.displayPriceAmount)
    const formatted = Number.isFinite(amount) ? amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : di.displayPriceAmount
    return `${formatted} ${di.displayPriceCurrencySymbol || '₽'}`
  }
  return '—'
})

const productOldPrice = computed(() => '52 990 ₽')


function selectVariant(index) {
  const v = variants.value[index]
  if (v && v.isAvailable) {
    selectedVariantIndex.value = index
  }
}

watch(
  variants,
  (list) => {
    if (!list.length) return
    const firstAvailableIdx = list.findIndex((v) => v.isAvailable === true)
    selectedVariantIndex.value = firstAvailableIdx >= 0 ? firstAvailableIdx : 0
  },
  { immediate: true }
)




















const productImageModulesWebp = import.meta.glob('~/assets/images/products/*.webp', { eager: true, query: '?url', import: 'default' })
const productImageModulesJpg = import.meta.glob('~/assets/images/products/*.jpg', { eager: true, query: '?url', import: 'default' })
const productImageUrls = [
  ...Object.values(productImageModulesWebp).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
  ...Object.values(productImageModulesJpg).map((m) => (typeof m === 'string' ? m : m?.default ?? '')),
].filter(Boolean)

function getImg(index) {
  return productImageUrls[index % productImageUrls.length] ?? productImageUrls[0] ?? ''
}

const colorPalette = ['#1a1a1a', '#ffffff', '#c0c0c0', '#8b4513', '#2c5282', '#c53030', '#2f855a', '#744210', '#553c9a', '#b83280', '#dd6b20', '#e53e3e', '#3182ce', '#38a169']
/** Детерминированный выбор цветов — одинаковый результат на сервере и клиенте (избегает hydration mismatch) */
function pickColorsForIndex(index, count) {
  const start = (index * 7) % colorPalette.length
  return Array.from({ length: count }, (_, i) => colorPalette[(start + i) % colorPalette.length])
}

const relatedProductsRows = [
  { title: 'Nike SB Dunk Low Pro', subtitle: 'Скейт-обувь', price: '45 990 ₸', img: getImg(0) },
  { title: 'adidas Hamburg', subtitle: 'Кроссовки', price: '32 990 ₸', img: getImg(1) },
  { title: 'Reebok Club C 85', subtitle: 'Женские кроссовки', price: '28 990 ₸', img: getImg(2) },
  { title: "Nike Blazer Low '77", subtitle: 'Мужские кроссовки', price: '49 990 ₸', img: getImg(3) },
  { title: 'New Balance 574', subtitle: 'Беговые', price: '39 990 ₸', img: getImg(4) },
  { title: 'Converse Chuck Taylor', subtitle: 'Кеды', price: '24 990 ₸', img: getImg(5) },
  { title: 'Puma Suede Classic', subtitle: 'Кроссовки', price: '21 990 ₸', img: getImg(6) },
  { title: 'Vans Old Skool', subtitle: 'Скейтбординг', price: '27 990 ₸', img: getImg(7) },
  { title: 'adidas Hamburg', subtitle: 'Кроссовки', price: '32 990 ₸', img: getImg(1) },
  { title: 'Reebok Club C 85', subtitle: 'Женские кроссовки', price: '28 990 ₸', img: getImg(2) },
  { title: "Nike Blazer Low '77", subtitle: 'Мужские кроссовки', price: '49 990 ₸', img: getImg(3) },
  { title: 'New Balance 574', subtitle: 'Беговые', price: '39 990 ₸', img: getImg(4) },
  { title: 'Converse Chuck Taylor', subtitle: 'Кеды', price: '24 990 ₸', img: getImg(5) },
  { title: 'Puma Suede Classic', subtitle: 'Кроссовки', price: '21 990 ₸', img: getImg(6) }
]
const relatedProducts = relatedProductsRows.map((p, i) => ({
  ...p,
  colors: pickColorsForIndex(i, 2 + (i % 2)),
}))

const quantity = ref(1)
const accordionOpen = reactive({ description: true, specs: false, care: false, payment: false, delivery: false, return: false })

const commonBlocks = computed(() => {
  const common = staticContentData?._common || {}
  return [
    { key: 'payment', ...common.payment },
    { key: 'delivery', ...common.delivery },
    { key: 'return', ...common.return },
  ].filter((b) => b.title && b.paragraphs?.length)
})

const requestURL = useRequestURL()
let staticContentData = {}
try {
  staticContentData = await $fetch(`${requestURL.origin}/static-content.json`)
} catch {
  staticContentData = {}
}

const staticCategoryContent = computed(() => {
  const categoryTitle = cardData.value?.basicInfo?.category?.category_ru || cardData.value?.basicInfo?.category?.name_ru || ''
  if (!categoryTitle) return null
  const key = Object.keys(staticContentData).find(
    (k) => k.toLowerCase() === categoryTitle.toLowerCase() || categoryTitle.toLowerCase().includes(k.toLowerCase())
  )
  return key ? staticContentData[key] : null
})

const descriptionParagraphs = computed(() => {
  const text = cardData.value?.basicInfo?.title || ''
  return text ? [text] : []
})
</script>
