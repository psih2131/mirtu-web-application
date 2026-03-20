<template>
  <section class="category-page">
    <div class="container category-page__container">
      <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
        <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
        <span class="category-page__breadcrumb-sep">›</span>
        <NuxtLink to="/products" class="category-page__breadcrumb-link">Каталог</NuxtLink>
        <span class="category-page__breadcrumb-sep">›</span>
        <span class="category-page__breadcrumb-current">{{ categoryTitle }}</span>
      </nav>

      <h1 class="category-page__title">{{ categoryTitle }}</h1>

      <div class="category-page__layout">

        <!-- Filter toggle (mobile) -->
        <button
          type="button"
          class="category-page__filter-toggle"
          @click="filtersOpen = !filtersOpen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M5 10h10M7 15h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <span>Фильтр</span>
          <svg
            class="category-page__filter-toggle-chevron"
            :class="{ 'category-page__filter-toggle-chevron--open': filtersOpen }"
            width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Filters -->
        <aside class="category-page__sidebar" :class="{ 'category-page__sidebar--open': filtersOpen }">

          <!-- Filter Price -->
          <FiltersFilterPrice v-model="priceRange" />

          <!-- Filter Gender -->
          <FiltersFilterGender
            v-if="availableFilters?.filters?.genders?.length"
            v-model="selectedGenders"
            :genders="availableFilters.filters.genders"
          />

          <!-- Filter Brands -->
          <FiltersFilterBrands
            v-if="availableFilters?.filters?.brands?.length"
            v-model="selectedBrandIds"
            :brands="availableFilters.filters.brands"
            :open="false"
          />

          <!-- Filter Series -->
          <FiltersFilterSeries
            v-if="availableFilters?.filters?.series?.length"
            v-model="selectedSeriesIds"
            :series="availableFilters.filters.series"
            :selected-brand-ids="selectedBrandIds"
            :open="false"
          />

          <!-- Buttons Apply -->
          <div class="category-page__buttons-apply">
            <button type="button" class="category-page__button-apply" @click="onApplyFilters">
              Применить
            </button>
            <button type="button" class="category-page__button-reset" @click="resetFilters">
              Сбросить
            </button>
          </div>

        <!-- <pre>
        selectedBrandIds: {{ selectedBrandIds }}
        selectedGenders: {{ selectedGenders }}
        selectedSeriesIds: {{ selectedSeriesIds }}
        priceRange: {{ priceRange }}
        </pre> -->

        </aside>

        <div class="category-page__main">
          <div class="category-page__toolbar">
            <span class="category-page__count" v-if="totalCount">{{ totalCount }} товаров</span>

            <!-- Sort Select -->
            <FieldsSortSelect v-model="sortParams" @update:model-value="onSortChange" />

          </div>

          <ul class="category-page__grid" v-if="displayCards.length > 0">
            <li v-for="(product, idx) in displayCards" :key="idx" class="category-page__grid-item">
              <CardsProductCard :product="convertProductData(product)" />
            </li>
          </ul>

          <div v-else class="category-page__empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4zm2 30h-4v-4h4v4zm0-8h-4V14h4v12z" fill="#d1d5db"/>
            </svg>
            <p class="category-page__empty-title">Товары не найдены</p>
            <p class="category-page__empty-text">По заданным параметрам ничего не найдено. Попробуйте изменить фильтры или сбросить их.</p>
            <button type="button" class="category-page__empty-reset" @click="resetFilters">Сбросить фильтры</button>
          </div>

          <div class="category-page__load-more-wrap" v-if="hasMore">
            <button type="button" class="category-page__load-more" @click="loadMore">
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Imports
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useRoute } from 'vue-router'

import FiltersFilterBrands from '@/components/filters/FilterBrands.vue'

import FiltersFilterGender from '@/components/filters/FilterGender.vue'

import FiltersFilterPrice from '@/components/filters/FilterPrice.vue'

import FiltersFilterSeries from '@/components/filters/FilterSeries.vue'

import useAllFiltrsData from '@/composables/allFiltrsData'

import { useUiStore } from '@/stores/ui'

// Variables
const route = useRoute()

const apiUrlDomain = useRuntimeConfig().public.apiUrl

const categoryId = ref(+route.params.id)

const categoryTitle = ref()

const filtersOpen = ref(false)

const allAvaliableCategories = ref([])


const { allFiltrsData } = await useAllFiltrsData()
allAvaliableCategories.value = allFiltrsData.value.filters.categories

const apiBase = apiUrlDomain.endsWith('/api') ? apiUrlDomain : apiUrlDomain.replace(/\/?$/, '') + '/api'

const { data: availableFilters } = await useFetch(`${apiBase}/filters`, {
  method: 'GET',
  query: { category_ids: categoryId.value ? [categoryId.value] : [] },
})
console.log('availableFilters', availableFilters.value)

const priceRange = ref({ min: 0, max: 1000000 })
const sortParams = ref({ sort_by: null, sort_order: null })
const selectedBrandIds = ref([])
const selectedGenders = ref([])
const selectedSeriesIds = ref([])

const uiStore = useUiStore()

const cardsBody = ref(buildCardsBody())

const limit = 20
const loadedMoreCards = ref([])

const { data: cardsData, execute: executeFetchCards } = await useFetch(`${apiBase}/cards`, {
  method: 'POST',
  body: cardsBody,
  query: { limit, offset: 0 },
  key: `cards-category-${categoryId.value}`,
  watch: false,
})

const displayCards = computed(() => [
  ...(cardsData.value?.cards || []),
  ...loadedMoreCards.value,
])

const totalCount = computed(() => cardsData.value?.total_count ?? 0)

const hasMore = computed(() => {
  const total = totalCount.value
  const loaded = displayCards.value.length
  return total > loaded
})

console.log('cardsData', cardsData.value)

categoryTitle.value = getCategoryTitle()

// Methods
function buildCardsBody() {
  const body = {
    category_ids: categoryId.value ? [categoryId.value] : [],
  }
  if (selectedBrandIds.value.length) body.brand_ids = selectedBrandIds.value
  if (selectedSeriesIds.value.length) body.series_ids = selectedSeriesIds.value
  if (selectedGenders.value.length) body.genders = selectedGenders.value
  if (sortParams.value?.sort_by) {
    body.sort_by = sortParams.value.sort_by
    body.sort_order = sortParams.value.sort_order
  }
  if (priceRange.value?.min > 0) body.min_price = priceRange.value.min
  if (priceRange.value?.max < 1000000) body.max_price = priceRange.value.max
  return body
}

async function fetchCards() {
  loadedMoreCards.value = []
  uiStore.showPreloader()
  try {
    cardsBody.value = buildCardsBody()
    await executeFetchCards()
  } finally {
    setTimeout(() => {
      uiStore.hidePreloader()
    }, 300)
  }
}

async function loadMore() {
  if (!hasMore.value) return
  uiStore.showPreloader()
  try {
    const body = buildCardsBody()
    const offset = displayCards.value.length
    const result = await $fetch(`${apiBase}/cards`, {
      method: 'POST',
      body,
      query: { limit, offset },
    })
    loadedMoreCards.value = [...loadedMoreCards.value, ...(result?.cards || [])]
  } finally {
    setTimeout(() => {
      uiStore.hidePreloader()
    }, 300)
  }
}

function getCategoryTitle() {
  for (let i = 0; i < allAvaliableCategories.value.length; i++) {
    if (allAvaliableCategories.value[i].id === categoryId.value) {
      return allAvaliableCategories.value[i].name_ru
    }
  }
  return ''
}

function convertProductData(product) {
  return {
    spu: product.basicInfo.spuPoizon || '',
    article: product.basicInfo.articlePoizon || '',
    title: product.displayInfo.display_title || '',
    subtitle: product.basicInfo.title || '',
    price: product.displayInfo.displayPriceAmount + ' ' + product.displayInfo.displayPriceCurrencySymbol,
    price_amount: product.displayInfo.displayPriceAmount || '',
    currency_code: product.displayInfo.displayPriceCurrency || '',
    img: product.displayInfo.display_image,
    category: product.basicInfo?.category?.category_ru || '',
  }
}

function onApplyFilters() {
  filtersOpen.value = false
  fetchCards()
}

function onSortChange() {
  fetchCards()
}

function resetFilters() {
  filtersOpen.value = false
  selectedBrandIds.value = []
  selectedGenders.value = []
  selectedSeriesIds.value = []
  priceRange.value = { min: 0, max: 1000000 }
  sortParams.value = { sort_by: null, sort_order: null }
  fetchCards()
}


</script>
