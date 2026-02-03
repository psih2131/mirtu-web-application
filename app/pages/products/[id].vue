<template>
  <div class="product-page">
    <section class="product-hero">
      <div class="container product-hero__container">
        <div class="product-hero__top">
          <nav class="product-hero__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="product-hero__breadcrumb">Главная</NuxtLink>
            <span class="product-hero__breadcrumb-sep">›</span>
            <NuxtLink to="/products/categories/obuv" class="product-hero__breadcrumb">Кроссовки</NuxtLink>
            <span class="product-hero__breadcrumb-sep">›</span>
            <span class="product-hero__breadcrumb-current">{{ product.breadcrumb }}</span>
          </nav>
          <div class="product-hero__actions">
            <span class="product-hero__sku">Артикул: {{ product.sku }}</span>
          </div>
        </div>

        <div class="product-hero__layout">
          <div class="product-hero__gallery">
            <ClientOnly>
              <div class="product-hero__main">
                <span class="product-hero__sale">sale 10%</span>
                <swiper-container
                  ref="mainSwiperRef"
                  class="product-hero__main-swiper"
                  :init="false"
                  :space-between="0"
                  :slides-per-view="1"
                  :allow-touch-move="true"
                  @swiperslidechange="onMainSlideChange"
                >
                  <swiper-slide v-for="(img, idx) in product.images" :key="idx" class="product-hero__main-slide">
                    <img :src="img" :alt="`${product.title} — фото ${idx + 1}`" class="product-hero__main-img">
                  </swiper-slide>
                </swiper-container>
                <button
                  type="button"
                  class="product-hero__arrow product-hero__arrow--prev"
                  aria-label="Предыдущее фото"
                  @click="slidePrev"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="currentColor"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="product-hero__arrow product-hero__arrow--next"
                  aria-label="Следующее фото"
                  @click="slideNext"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="currentColor"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="product-hero__fav"
                  :class="{ 'product-hero__fav--active': isFavorite }"
                  :aria-label="isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'"
                  @click="isFavorite = !isFavorite"
                >
                  <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12.5 21.875C11.8281 21.2792 11.0688 20.6594 10.2656 20H10.2552C7.42709 17.6875 4.22188 15.0708 2.80625 11.9354C2.34117 10.9372 2.0947 9.85118 2.08332 8.75001C2.08022 7.23906 2.68622 5.79062 3.76439 4.73206C4.84255 3.6735 6.30186 3.09417 7.8125 3.12501C9.04233 3.12695 10.2457 3.48239 11.2792 4.14897C11.7333 4.44373 12.1442 4.80028 12.5 5.20834C12.8578 4.80188 13.2688 4.44554 13.7219 4.14897C14.7549 3.48226 15.958 3.1268 17.1875 3.12501C18.6981 3.09417 20.1575 3.6735 21.2356 4.73206C22.3138 5.79062 22.9198 7.23906 22.9167 8.75001C22.9061 9.85294 22.6596 10.9408 22.1938 11.9406C20.7781 15.0761 17.574 17.6917 14.7458 20L14.7354 20.0083C13.9313 20.6636 13.1729 21.2833 12.501 21.8833L12.5 21.875ZM7.8125 5.20834C6.8422 5.1962 5.90633 5.56756 5.20834 6.24168C4.53582 6.90227 4.15996 7.80735 4.16658 8.75001C4.17847 9.55262 4.36024 10.3436 4.7 11.0708C5.36824 12.4237 6.26991 13.648 7.36355 14.6875C8.39584 15.7292 9.58334 16.7375 10.6104 17.5854C10.8948 17.8198 11.1844 18.0563 11.474 18.2927L11.6563 18.4417C11.9344 18.6688 12.2219 18.9042 12.5 19.1354L12.5135 19.1229L12.5198 19.1177H12.526L12.5354 19.1104H12.5406H12.5458L12.5646 19.0948L12.6073 19.0604L12.6146 19.0542L12.626 19.0458H12.6323L12.6417 19.0375L13.3333 18.4698L13.5146 18.3208C13.8073 18.0823 14.0969 17.8458 14.3813 17.6115C15.4083 16.7636 16.5969 15.7563 17.6292 14.7094C18.723 13.6704 19.6247 12.4464 20.2927 11.0938C20.6386 10.3602 20.823 9.56095 20.8334 8.75001C20.8377 7.81026 20.462 6.90865 19.7917 6.25001C19.095 5.57284 18.159 5.19843 17.1875 5.20834C16.002 5.19827 14.8687 5.69519 14.0729 6.57397L12.5 8.38647L10.9271 6.57397C10.1313 5.69519 8.998 5.19827 7.8125 5.20834Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              <div class="product-hero__thumbs">
                <swiper-container
                  ref="thumbsSwiperRef"
                  class="product-hero__thumbs-swiper"
                  :init="false"
                  :space-between="8"
                  :slides-per-view="4"
                  :watch-slides-progress="true"
                  :free-mode="true"
                >
                  <swiper-slide
                    v-for="(img, idx) in product.images"
                    :key="idx"
                    class="product-hero__thumb"
                    :class="{ 'product-hero__thumb--active': activeSlideIndex === idx }"
                    @click="goToSlide(idx)"
                  >
                    <img :src="img" :alt="`${product.title} — фото ${idx + 1}`" class="product-hero__thumb-img">
                  </swiper-slide>
                </swiper-container>
              </div>
            </ClientOnly>
          </div>

          <div class="product-hero__info">
            <p class="product-hero__brand">{{ product.brand }}</p>
            <h1 class="product-hero__title">{{ product.title }}</h1>
            

            <div class="product-hero__rating">
              <span class="product-hero__stars" aria-hidden="true">★★★★☆</span>
              <NuxtLink to="#reviews" class="product-hero__reviews-link">{{ product.reviewsCount }} отзывов</NuxtLink>
            </div>

            <div class="product-hero__price-wrap">
                <span class="product-hero__price">{{ product.price }}</span>
                <span v-if="product.oldPrice" class="product-hero__price-old">{{ product.oldPrice }}</span>
            </div>

            <div class="product-hero__option">
              <span class="product-hero__option-label">Цвет: {{ product.colors[selectedColorIndex].name }}</span>
              <div class="product-hero__colors">
                <button
                  v-for="(c, i) in product.colors"
                  :key="i"
                  type="button"
                  class="product-hero__color-btn"
                  :class="{ 'product-hero__color-btn--active': selectedColorIndex === i }"
                  :style="{ backgroundColor: c.hex }"
                  :title="c.name"
                  :aria-label="`Цвет: ${c.name}`"
                  @click="selectedColorIndex = i"
                />
              </div>
            </div>

            <div class="product-hero__option">
              <span class="product-hero__option-label">Размер: {{ product.sizes[selectedSizeIndex] }}</span>
              <div class="product-hero__sizes">
                <button
                  v-for="(size, i) in product.sizes"
                  :key="size"
                  type="button"
                  class="product-hero__size-btn"
                  :class="{
                    'product-hero__size-btn--active': selectedSizeIndex === i,
                    'product-hero__size-btn--disabled': product.sizesDisabled?.includes(size),
                  }"
                  :disabled="product.sizesDisabled?.includes(size)"
                  @click="!product.sizesDisabled?.includes(size) && (selectedSizeIndex = i)"
                >
                  {{ size }}
                </button>
              </div>
              <NuxtLink to="#size-guide" class="product-hero__size-guide">Таблица размеров</NuxtLink>
            </div>

            <div class="product-hero__cta">
             
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

            <p class="product-hero__delivery">Бесплатная доставка при заказе от 30 000 ₸</p>

            <div class="product-hero__about">
              <h2 class="product-hero__about-title">О товаре</h2>
              <dl class="product-hero__specs">
                <div
                  v-for="(item, idx) in visibleSpecs"
                  :key="idx"
                  class="product-hero__spec-row"
                >
                  <dt class="product-hero__spec-dt">{{ item.name }}</dt>
                  <dd class="product-hero__spec-dd">{{ item.value }}</dd>
                </div>
              </dl>
              <Collapse :when="aboutExpanded" class="product-hero__about-collapse">
                <dl class="product-hero__specs product-hero__specs--more">
                  <div
                    v-for="(item, idx) in moreSpecs"
                    :key="idx"
                    class="product-hero__spec-row"
                  >
                    <dt class="product-hero__spec-dt">{{ item.name }}</dt>
                    <dd class="product-hero__spec-dd">{{ item.value }}</dd>
                  </div>
                </dl>
              </Collapse>
              <button
                v-if="moreSpecs.length"
                type="button"
                class="product-hero__specs-trigger"
                @click="aboutExpanded = !aboutExpanded"
              >
                {{ aboutExpanded ? 'Показать меньше' : 'Показать больше' }}
              </button>
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
                  v-for="(item, idx) in product.specs"
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
      </div>
    </section>

    <SectionsProductsSliderSec
      title="Похожие товары"
      :products="relatedProducts"
      :max-slides-per-view="4"
    />
  </div>
</template>

<script setup>
import { Collapse } from 'vue-collapsed'

const route = useRoute()

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
function pickRandomColors(count) {
  const shuffled = [...colorPalette].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
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
const relatedProducts = relatedProductsRows.map((p) => ({
  ...p,
  colors: pickRandomColors(2 + Math.floor(Math.random() * 2)),
}))

const product = {
  title: 'Nike Pegasus 41 Устойчивые к истиранию Низкие Повседневные Беговые Кроссовк',
  brand: 'Nike',
  breadcrumb: 'Женские',
  sku: '2102402125881',
  price: '45 990 ₸',
  oldPrice: '52 990 ₸',
  reviewsCount: 73,
  rating: 4.7,
  material: 'Замша',
  production: 'Китай',
  description: 'Nike Pegasus 41 — универсальные беговые кроссовки для ежедневных тренировок и городской носки. Модель с улучшенной амортизацией и устойчивостью к истиранию подойдёт тем, кто ценит комфорт и надёжность.\n\nВерх из дышащих материалов обеспечивает вентиляцию, а система фиксации поддерживает стопу при движении. Подошва спроектирована для асфальта и лёгкого бездорожья.',
  specs: [
    { name: 'Тип застежки', value: 'Шнуровка' },
    { name: 'Функциональность', value: 'Износостойкий' },
    { name: 'Стиль носка', value: 'Круглый носок' },
    { name: 'Тип каблука', value: 'на платформе' },
    { name: 'Материал', value: 'Замша' },
    { name: 'Производство', value: 'Китай' },
    { name: 'Сезон', value: 'Всесезонный' },
    { name: 'Пол', value: 'Унисекс' },
  ],
  colors: [
    { name: 'Белый', hex: '#f5f5f5' },
    { name: 'Розовый', hex: '#f8b4c4' },
    { name: 'Мятный', hex: '#a8e6cf' },
  ],
  sizes: ['39', '40', '40.5', '41', '42', '43', '43.5', '44', '44.5', '45', '46', '47'],
  sizesDisabled: ['42', '45'],
  images: productImageUrls.length ? productImageUrls : ['/placeholder-product.jpg'],
}

const mainSwiperRef = ref(null)
const thumbsSwiperRef = ref(null)
const activeSlideIndex = ref(0)
const selectedColorIndex = ref(1)
const selectedSizeIndex = ref(3)
const isFavorite = ref(false)
const quantity = ref(1)
const aboutExpanded = ref(false)
const accordionOpen = reactive({ description: true, specs: false })

const descriptionParagraphs = computed(() => {
  const text = product.description || ''
  return text.split('\n\n').filter(Boolean)
})

const visibleSpecsCount = 4
const visibleSpecs = computed(() => (product.specs || []).slice(0, visibleSpecsCount))
const moreSpecs = computed(() => (product.specs || []).slice(visibleSpecsCount))

const mainApi = useSwiper(mainSwiperRef, {
  spaceBetween: 0,
  slidesPerView: 1,
  allowTouchMove: true,
})

const thumbsApi = useSwiper(thumbsSwiperRef, {
  spaceBetween: 15,
  slidesPerView: 4,
  watchSlidesProgress: true,
  freeMode: true,
})

function goToSlide(index) {
  const mainInstance = unref(mainApi.instance)
  if (mainInstance) {
    mainInstance.slideTo(index)
    activeSlideIndex.value = index
  }
  const thumbsInstance = unref(thumbsApi.instance)
  if (thumbsInstance) thumbsInstance.slideTo(index)
}

function onMainSlideChange(e) {
  const [swiper] = e.detail || []
  if (swiper) {
    activeSlideIndex.value = swiper.realIndex
    const thumbsInstance = unref(thumbsApi.instance)
    if (thumbsInstance) thumbsInstance.slideTo(swiper.realIndex)
  }
}

function slidePrev() {
  const mainInstance = unref(mainApi.instance)
  if (mainInstance) {
    mainInstance.slidePrev()
    activeSlideIndex.value = mainInstance.realIndex
    const thumbsInstance = unref(thumbsApi.instance)
    if (thumbsInstance) thumbsInstance.slideTo(mainInstance.realIndex)
  }
}

function slideNext() {
  const mainInstance = unref(mainApi.instance)
  if (mainInstance) {
    mainInstance.slideNext()
    activeSlideIndex.value = mainInstance.realIndex
    const thumbsInstance = unref(thumbsApi.instance)
    if (thumbsInstance) thumbsInstance.slideTo(mainInstance.realIndex)
  }
}
</script>
