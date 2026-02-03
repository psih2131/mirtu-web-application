<template>
  <section class="blog-sec">
    <div class="container blog-sec__container">
      <header class="blog-sec__header">
        <div class="blog-sec__header-main">
          <h2 class="blog-sec__title">Наш блог</h2>
          <p class="blog-sec__subtitle">
            Подборки образов, советы по уходу и гиды по выбору обуви и одежды для активной жизни.
          </p>
        </div>
        <div class="blog-sec__nav">
          <span class="blog-sec__counter">{{ currentPage }}/{{ totalPages }}</span>
          <div class="blog-sec__arrows">
            <button
              type="button"
              class="blog-sec__arrow blog-sec__arrow--prev"
              aria-label="Назад"
              @click="goPrev"
            >
              <span class="blog-sec__arrow-icon">←</span>
            </button>
            <button
              type="button"
              class="blog-sec__arrow blog-sec__arrow--next"
              aria-label="Вперёд"
              @click="goNext"
            >
              <span class="blog-sec__arrow-icon">→</span>
            </button>
          </div>
        </div>
      </header>

      <ClientOnly>
        <swiper-container
          ref="blogSwiperRef"
          class="blog-slider"
          :init="false"
          @swiperslidechange="onSlideChange"
        >
          <swiper-slide
            v-for="(post, idx) in posts"
            :key="idx"
            class="blog-slider__slide"
          >
            <CardsBlogCard :post="post" />
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
})

const blogSwiperRef = ref(null)
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, (props.posts || []).length))

const swiperApi = useSwiper(blogSwiperRef, {
  slidesPerView: 1.1,
  spaceBetween: 16,
  speed: 450,
  loop: true,
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 20 },
    960: { slidesPerView: 3, spaceBetween: 24 },
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
</script>

