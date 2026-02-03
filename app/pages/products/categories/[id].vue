<template>
  <section class="category-page">
    <div class="container category-page__container">
      <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
        <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
        <span class="category-page__breadcrumb-sep">›</span>
        <span class="category-page__breadcrumb-current">{{ categoryTitle }}</span>
      </nav>

      <h1 class="category-page__title">{{ categoryTitle }}</h1>

      <div class="category-page__layout">
        <aside class="category-page__sidebar">
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('type') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('type')">
              <span>Тип товара</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('type')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Кроссовки</label>
                <label class="category-page__checkbox"><input type="checkbox"> Кеды</label>
                <label class="category-page__checkbox"><input type="checkbox"> Ботинки</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('size') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('size')">
              <span>Размер</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('size')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> 38</label>
                <label class="category-page__checkbox"><input type="checkbox"> 39</label>
                <label class="category-page__checkbox"><input type="checkbox"> 40</label>
                <label class="category-page__checkbox"><input type="checkbox"> 41</label>
                <label class="category-page__checkbox"><input type="checkbox"> 42</label>
                <label class="category-page__checkbox"><input type="checkbox"> 43</label>
                <label class="category-page__checkbox"><input type="checkbox"> 44</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('color') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('color')">
              <span>Цвет</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('color')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Чёрный</label>
                <label class="category-page__checkbox"><input type="checkbox"> Белый</label>
                <label class="category-page__checkbox"><input type="checkbox"> Серый</label>
                <label class="category-page__checkbox"><input type="checkbox"> Синий</label>
                <label class="category-page__checkbox"><input type="checkbox"> Красный</label>
                <label class="category-page__checkbox"><input type="checkbox"> Коричневый</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('price') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('price')">
              <span>Цена</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('price')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <FieldsPriceRangeFilter v-model="priceRange" :min="0" :max="150000" :step="1000" />
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('collection') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('collection')">
              <span>Коллекция</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('collection')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Новая коллекция</label>
                <label class="category-page__checkbox"><input type="checkbox"> Распродажа</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('gender') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('gender')">
              <span>Пол</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('gender')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox" v-model="filters.genderMen"> Мужчины</label>
                <label class="category-page__checkbox"><input type="checkbox" v-model="filters.genderWomen"> Женщины</label>
                <label class="category-page__checkbox"><input type="checkbox" v-model="filters.genderUnisex"> Унисекс</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('closure') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('closure')">
              <span>Тип застёжки</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('closure')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Шнуровка</label>
                <label class="category-page__checkbox"><input type="checkbox"> Липучка</label>
                <label class="category-page__checkbox"><input type="checkbox"> Без застёжки</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('height') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('height')">
              <span>Высота</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('height')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Низкие</label>
                <label class="category-page__checkbox"><input type="checkbox"> Средние</label>
                <label class="category-page__checkbox"><input type="checkbox"> Высокие</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('width') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('width')">
              <span>Ширина</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('width')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Узкие</label>
                <label class="category-page__checkbox"><input type="checkbox"> Стандарт</label>
                <label class="category-page__checkbox"><input type="checkbox"> Широкие</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('tech') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('tech')">
              <span>Технологии</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('tech')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Air</label>
                <label class="category-page__checkbox"><input type="checkbox"> Boost</label>
                <label class="category-page__checkbox"><input type="checkbox"> React</label>
              </div>
            </Collapse>
          </div>
          <div class="category-page__filter" :class="{ 'category-page__filter--open': isFilterOpen('features') }">
            <button type="button" class="category-page__filter-head" @click="toggleFilter('features')">
              <span>Особенности</span>
              <span class="category-page__filter-chevron" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
                </svg>
              </span>
            </button>
            <Collapse :when="isFilterOpen('features')" class="category-page__collapse">
              <div class="category-page__filter-body">
                <label class="category-page__checkbox"><input type="checkbox"> Водоотталкивающие</label>
                <label class="category-page__checkbox"><input type="checkbox"> Дышащие</label>
                <label class="category-page__checkbox"><input type="checkbox"> Ортопедическая стелька</label>
              </div>
            </Collapse>
          </div>
        </aside>

        <div class="category-page__main">
          <div class="category-page__toolbar">
            <span class="category-page__count">{{ products.length }} товаров</span>
            <div class="category-page__sort">
              <label for="sort-select" class="category-page__sort-label">Сортировка:</label>
              <select id="sort-select" class="category-page__sort-select">
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </div>
          </div>

          <ul class="category-page__grid">
            <li v-for="(product, idx) in products" :key="idx" class="category-page__grid-item">
              <CardsProductCard :product="product" />
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
import { Collapse } from 'vue-collapsed'
import FieldsPriceRangeFilter from '@/components/fields/PriceRangeFilter.vue'

const route = useRoute()

const productImageModules = import.meta.glob('~/assets/images/products/*.webp', { eager: true, query: '?url', import: 'default' })
const productImageUrls = Object.values(productImageModules).map((m) => (typeof m === 'string' ? m : m?.default ?? ''))

function getImg(index) {
  return productImageUrls[index % productImageUrls.length] ?? productImageUrls[0] ?? ''
}

const colorPalette = ['#1a1a1a', '#ffffff', '#c0c0c0', '#8b4513', '#2c5282', '#c53030', '#2f855a', '#744210', '#553c9a', '#b83280', '#dd6b20', '#e53e3e', '#3182ce', '#38a169']
function pickRandomColors(count) {
  const shuffled = [...colorPalette].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const productRows = [
  { title: 'Nike SB Dunk Low Pro', subtitle: 'Скейт-обувь', price: '45 990 ₸', img: getImg(0), tag: 'BEST SELLER', description: 'Классика скейт-культуры.' },
  { title: 'adidas Hamburg', subtitle: 'Кроссовки', price: '32 990 ₸', img: getImg(1), description: 'Ретро-стиль adidas.' },
  { title: 'Reebok Club C 85', subtitle: 'Женские кроссовки', price: '28 990 ₸', img: getImg(2), tag: 'BEST SELLER', description: 'Минимализм и комфорт.' },
  { title: "Nike Blazer Low '77", subtitle: 'Мужские кроссовки', price: '49 990 ₸', img: getImg(3), description: 'Классика Nike 70-х.' },
  { title: 'New Balance 574', subtitle: 'Беговые', price: '39 990 ₸', img: getImg(4), description: 'Для бега и прогулок.' },
  { title: 'Converse Chuck Taylor', subtitle: 'Кеды', price: '24 990 ₸', img: getImg(5), tag: 'BEST SELLER', description: 'Узнаваемые кеды с 1917 года.' },
  { title: 'Puma Suede Classic', subtitle: 'Кроссовки', price: '21 990 ₸', img: getImg(6), description: 'Замша и мягкая подошва.' },
  { title: 'Vans Old Skool', subtitle: 'Скейтбординг', price: '27 990 ₸', img: getImg(7), description: 'Выбор скейтеров.' },
  { title: 'Nike Air Jordan 11 Retro', subtitle: 'Баскетбол', price: '89 990 ₸', img: getImg(0), tag: 'СКОРО', description: 'Легендарная модель.' },
  { title: 'Nike Air Jordan 6 Rings', subtitle: 'Баскетбол', price: '79 990 ₸', img: getImg(1), description: 'В духе шести чемпионских колец.' },
  { title: 'Nike Air Jordan 7 Retro', subtitle: 'Баскетбол', price: '84 990 ₸', img: getImg(2), description: 'Ретро-силуэт.' },
  { title: 'Nike Air Jordan 1 Retro High OG', subtitle: 'Классика', price: '94 990 ₸', img: getImg(3), description: 'Культовая высокая модель.' },
  { title: 'Nike Air Jordan 6 Retro', subtitle: 'Баскетбол', price: '82 990 ₸', img: getImg(4), tag: 'BEST SELLER', description: 'Ретро с современными технологиями.' },
  { title: 'Nike Air Jordan 1 Mid', subtitle: 'Повседневные', price: '64 990 ₸', img: getImg(5), tag: 'BEST SELLER', description: 'Универсальная середина.' },
  { title: 'Nike Air Jordan 11 Retro', subtitle: 'Баскетбол', price: '89 990 ₸', img: getImg(0), tag: 'СКОРО', description: 'Легендарная модель.' },
  { title: 'Nike Air Jordan 6 Rings', subtitle: 'Баскетбол', price: '79 990 ₸', img: getImg(1), description: 'В духе шести чемпионских колец.' },
]

const products = productRows.map((p) => ({
  ...p,
  colors: pickRandomColors(2 + Math.floor(Math.random() * 2)),
}))

const priceRange = ref([20000, 80000])

const categoryTitles = {
  obuv: 'Обувь',
  krossovki: 'Кроссовки',
  kedy: 'Кеды',
  botinki: 'Ботинки',
}

const categoryTitle = computed(() => categoryTitles[route.params.id] || 'Обувь')

const openFilters = ref(['gender'])
const filters = reactive({
  genderMen: false,
  genderWomen: false,
  genderUnisex: false,
})

function isFilterOpen(key) {
  return openFilters.value.includes(key)
}

function toggleFilter(key) {
  if (openFilters.value.includes(key)) {
    openFilters.value = openFilters.value.filter((k) => k !== key)
  } else {
    openFilters.value = [...openFilters.value, key]
  }
}
</script>
