<template>
    <div ref="searchRoot" class="search-component">
        <div class="search-component__header">
            
            <input
                v-model="searchQuery"
                type="text"
                class="search-component__field"
                placeholder="Ищите любой продукт или бренд"
                autocomplete="off"
                @keydown.enter.prevent="onSearchClick"
            >
            <button
                v-if="searchQuery.trim()"
                type="button"
                class="search-component__clear"
                aria-label="Очистить"
                @click="onClearClick"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button
                type="button"
                class="search-component__search-icon"
                aria-label="Найти"
                @click="onSearchClick"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
            <div class="search-component__decor-icon">
                <img class="search-component__decor-icon-img" src="@/assets/images/icons/search-decor.png" alt="">
            </div>
        </div>

        <div v-if="isOpen" class="search-component__dropdown">
            <div v-if="isLoading" class="search-component__dropdown-loading">Поиск...</div>
            <template v-else-if="searchResults.length">
                <NuxtLink
                    v-for="item in searchResults"
                    :key="item.spu"
                    :to="`/products/${item.spu}`"
                    class="search-component__dropdown-item"
                    @click="closeDropdown"
                >
                    <img
                        v-if="item.img"
                        :src="item.img"
                        :alt="item.title"
                        class="search-component__dropdown-img"
                    >
                    <div class="search-component__dropdown-info">
                        <span class="search-component__dropdown-title">{{ item.title }}</span>
                        <span v-if="item.category" class="search-component__dropdown-category">{{ item.category }}</span>
                        <span class="search-component__dropdown-price">{{ item.price }}</span>
                    </div>
                </NuxtLink>
            </template>
            <div v-else-if="searchQuery.trim().length >= 2" class="search-component__dropdown-empty">Товары не найдены</div>
        </div>
    </div>
</template>

<script setup>
const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const searchRoot = ref(null)
const searchQuery = ref('')
const searchResults = ref([])
const isOpen = ref(false)
const isLoading = ref(false)

function convertProduct(card) {
  const bi = card?.basicInfo
  const di = card?.displayInfo
  return {
    spu: bi?.spuPoizon ?? di?.spuPoizon ?? '',
    title: di?.display_title ?? bi?.title ?? '',
    img: di?.display_image ?? '',
    category: bi?.category?.category_ru ?? '',
    price: di?.displayPriceAmount != null ? `${Number(di.displayPriceAmount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${di?.displayPriceCurrencySymbol ?? '₸'}` : '',
  }
}

async function fetchSearch() {
  const q = searchQuery.value?.trim() || ''
  if (q.length < 2) {
    searchResults.value = []
    return
  }
  isLoading.value = true
  try {
    // GET /filters с search_word (по ТЗ) — если API возвращает cards, используем их
    const filtersRes = await $fetch(`${apiBase}/filters`, {
      method: 'GET',
      query: { search_word: q },
    })
    const cards = filtersRes?.filters?.cards ?? filtersRes?.cards ?? []
    searchResults.value = (Array.isArray(cards) ? cards : []).map(convertProduct).filter((p) => p.spu)
    // Если filters не вернул товары — POST /cards с search_word (гарантированно возвращает карточки)
    if (!searchResults.value.length) {
      const cardsRes = await $fetch(`${apiBase}/cards`, {
        method: 'POST',
        body: { search_word: q },
        query: { limit: 20, offset: 0 },
      })
      const list = cardsRes?.cards ?? []
      searchResults.value = (Array.isArray(list) ? list : []).map(convertProduct).filter((p) => p.spu)
    }
  } catch {
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

function onSearchClick() {
  const q = searchQuery.value?.trim() || ''
  if (q.length < 2) {
    searchResults.value = []
    isOpen.value = false
    return
  }
  isOpen.value = true
  fetchSearch()
}

function onClearClick() {
  searchQuery.value = ''
  searchResults.value = []
  isOpen.value = false
}

function closeDropdown() {
  isOpen.value = false
}

function handleClickOutside(e) {
  if (searchRoot.value && !searchRoot.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped  lang="scss">

@import "@/assets/scss/components/fields/header-search.scss";

</style>