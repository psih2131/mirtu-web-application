<template>
  <div class="product-hero__gallery-inner">
    <div class="product-hero__main">
      <swiper-container
        ref="mainSwiperRef"
        class="product-hero__main-swiper"
        :init="false"
        :space-between="0"
        :slides-per-view="1"
        :allow-touch-move="true"
        @swiperslidechange="onMainSlideChange"
      >
        <swiper-slide v-for="(img, idx) in images" :key="idx" class="product-hero__main-slide">
          <img :src="img" :alt="`${title} — фото ${idx + 1}`" class="product-hero__main-img">
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
          v-for="(img, idx) in images"
          :key="idx"
          class="product-hero__thumb"
          :class="{ 'product-hero__thumb--active': activeSlideIndex === idx }"
          @click="goToSlide(idx)"
        >
          <img :src="img" :alt="`${title} — фото ${idx + 1}`" class="product-hero__thumb-img">
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Товар',
  },
})

const mainSwiperRef = ref(null)
const thumbsSwiperRef = ref(null)
const activeSlideIndex = ref(0)
const isFavorite = ref(false)

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
