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

        <!-- Filters -->
        <aside class="category-page__sidebar">

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

<pre>
selectedBrandIds: {{ selectedBrandIds }}
selectedGenders: {{ selectedGenders }}
selectedSeriesIds: {{ selectedSeriesIds }}
priceRange: {{ priceRange }}
</pre>
        </aside>

        <div class="category-page__main">
          <div class="category-page__toolbar">
            <span class="category-page__count" v-if="cardsData?.total_count">{{ cardsData.total_count }} товаров</span>

            <!-- Sort Select -->
            <FieldsSortSelect v-model="sortParams" @update:model-value="onSortChange" />

          </div>

          <ul class="category-page__grid" v-if="cardsData?.cards.length > 0">
            <li v-for="(product, idx) in cardsData.cards" :key="idx" class="category-page__grid-item">
              <CardsProductCard :product="convertProductData(product)" />
            </li>
          </ul>

          <div class="category-page__load-more-wrap">
            <button type="button" class="category-page__load-more">
              Загрузить ещё
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//Imports
import { ref, computed, watch } from 'vue'

import { useRuntimeConfig } from '#app';

import { useRoute } from 'vue-router'

import FiltersFilterBrands from '@/components/filters/FilterBrands.vue'
import { useUiStore } from '@/stores/ui'
import FiltersFilterGender from '@/components/filters/FilterGender.vue'
import FiltersFilterPrice from '@/components/filters/FilterPrice.vue'
import FiltersFilterSeries from '@/components/filters/FilterSeries.vue'
import useAllFiltrsData from '@/composables/allFiltrsData'



//Data
const route = useRoute()

const apiUrlDomain = useRuntimeConfig().public.apiUrl;

const categoryId = ref(+route.params.id)

const categoryTitle = ref()

const allAvaliableCategories = ref([]);

const  { allFiltrsData }  = await useAllFiltrsData();

allAvaliableCategories.value = allFiltrsData.value.filters.categories;



const apiBase = apiUrlDomain.endsWith('/api') ? apiUrlDomain : apiUrlDomain.replace(/\/?$/, '') + '/api'

//API — GET available filters
const { data: availableFilters } = await useFetch(`${apiBase}/filters`, {
  method: 'GET',
  query: { category_ids: categoryId.value ? [categoryId.value] : [] },
})
console.log('availableFilters', availableFilters.value)

// Filter state (must be before buildCardsBody)
const priceRange = ref({ min: 0, max: 1000000 })
const sortParams = ref({ sort_by: null, sort_order: null })
const selectedBrandIds = ref([])
const selectedGenders = ref([])
const selectedSeriesIds = ref([])

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

const cardsBody = ref(buildCardsBody())

const uiStore = useUiStore()

const { data: cardsData, execute: executeFetchCards } = await useFetch(`${apiBase}/cards`, {
  method: 'POST',
  body: cardsBody,
  query: { limit: 20, offset: 0 },
  key: `cards-category-${categoryId.value}`,
  watch: false,
})

async function fetchCards() {
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

console.log('cardsData', cardsData.value)

//Methods
function getCategoryTitle() {
  for(let i = 0; i < allAvaliableCategories.value.length; i++) {
    if(allAvaliableCategories.value[i].id === categoryId.value) {
      return allAvaliableCategories.value[i].name_ru
    }
  }
  return ''
}

categoryTitle.value = getCategoryTitle()


const convertProductData = (product) => {
  let newProductObject = {
    title: product.displayInfo.display_title || '',
    subtitle: product.basicInfo.title || '',
    price: product.displayInfo.displayPriceAmount + ' ' + product.displayInfo.displayPriceCurrencySymbol,
    img: product.displayInfo.display_image ,
    category: product.basicInfo?.category?.category_ru || '',
  }
  return newProductObject
}



function onApplyFilters() {
  fetchCards()
}

function onSortChange() {
  fetchCards()
}

function resetFilters() {
  selectedBrandIds.value = []
  selectedGenders.value = []
  selectedSeriesIds.value = []
  priceRange.value = { min: 0, max: 1000000 }
  sortParams.value = { sort_by: null, sort_order: null }
  fetchCards()
}

</script>
