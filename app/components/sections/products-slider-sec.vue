<template>
  <section class="products-sec">
    <div class="container products-sec__container">
      <header class="products-sec__header">
        <h2 class="products-sec__title">{{ title }}</h2>
        <div class="products-sec__nav">
          <span class="products-sec__counter">{{ currentPage }}/{{ totalPages }}</span>
          <div class="products-sec__arrows">
            <button
              type="button"
              class="products-sec__arrow products-sec__arrow--prev"
              aria-label="Назад"
              @click="goPrev"
            >
              <span class="products-sec__arrow-icon">←</span>
            </button>
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
    </div>
  </section>
</template>

<script setup lang="ts">
export interface ProductSlideItem {
  image: string
  brand: string
  category: string
  model: string
  price: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    products?: ProductSlideItem[]
  }>(),
  {
    title: 'Популярные товары',
    products: () => [],
  }
)

const productsSwiperRef = ref(null)
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, props.products.length))

const swiperApi = useSwiper(productsSwiperRef, {
  slidesPerView: 4,
  spaceBetween: 24,
  speed: 400,
  loop: true,
  loopAdditionalSlides: 4,
  breakpoints: {
    480: { slidesPerView: 2 },
    640: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 5 },
  },
})

function onSlideChange(e: CustomEvent) {
  const [swiper] = e.detail as [{ realIndex: number }]
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
