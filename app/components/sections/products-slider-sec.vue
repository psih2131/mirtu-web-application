<template>
  <section class="products-sec">
    <div class="container products-sec__container">
      <header class="products-sec__header">
        <h2 class="products-sec__title">{{ title }}</h2>
      </header>

      <ClientOnly>
        <swiper-container
          ref="productsSwiperRef"
          class="products-slider"
          :init="false"
          @swiperslidechange="onSlideChange"
        >
          <swiper-slide
            v-for="(product, idx) in products"
            :key="idx"
            class="products-slider__slide"
          >
            <CardsProductCard :product="product" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <div class="products-sec__nav">
        <button
          type="button"
          class="products-sec__arrow products-sec__arrow--prev"
          aria-label="Назад"
          @click="goPrev"
        >
          <span class="products-sec__arrow-icon">←</span>
        </button>
        <span class="products-sec__counter">{{ currentPage }}/{{ totalPages }}</span>
        <button
          type="button"
          class="products-sec__arrow products-sec__arrow--next"
          aria-label="Вперёд"
          @click="goNext"
        >
          <span class="products-sec__arrow-icon">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Популярные товары',
  },
  products: {
    type: Array,
    default: () => [],
  },
  maxSlidesPerView: {
    type: Number,
    default: 5,
  },
})

const productsSwiperRef = ref(null)
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, (props.products || []).length))

const maxSlides = Math.min(5, Math.max(2, props.maxSlidesPerView))

const swiperApi = useSwiper(productsSwiperRef, {
  slidesPerView: Math.min(4, maxSlides),
  spaceBetween: 24,
  speed: 400,
  loop: true,
  loopAdditionalSlides: maxSlides,
  breakpoints: {
    200: { slidesPerView: 1, spaceBetween: 10 },
    330: { slidesPerView: 2 ,spaceBetween: 15},
    760: { slidesPerView: 3 ,spaceBetween: 24},
    940: { slidesPerView: 3, spaceBetween: 24},
    1240: { slidesPerView: 4, spaceBetween: 24},

    1450: { slidesPerView: maxSlides, spaceBetween: 24},
  },
})

function onSlideChange(e) {
  const [swiper] = e.detail || []
  if (swiper) currentPage.value = swiper.realIndex + 1
}

function goPrev() {
  const instance = unref(swiperApi.instance)
  instance?.slidePrev()
}

function goNext() {
  const instance = unref(swiperApi.instance)
  instance?.slideNext()
}

onMounted(() => {
  nextTick(() => {
    const instance = unref(swiperApi.instance)
    if (instance) currentPage.value = instance.realIndex + 1
  })
})
</script>
