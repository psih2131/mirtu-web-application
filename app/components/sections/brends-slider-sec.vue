<template>
  <section class="brends-sec" v-if="brands.length > 0">
    <div class="container brends-sec__container">
      <ClientOnly>
        <div class="brends-slider__fade-wrap">
          <swiper-container
            ref="brendsSwiperRef"
            class="brends-slider"
            :init="false"
          >
          <swiper-slide
            v-for="brand in brands"
            :key="brand.id"
            class="brends-slider__slide"
          >
            <NuxtLink :to="`/products?brand=${brand.id}`" class="brends-slide">
              <div class="brends-slide__img-wrap">
                <img
                  v-if="brand.logo"
                  :src="brand.logo"
                  :alt="brand.name"
                  class="brends-slide__img"
                  loading="lazy"
                >
              </div>
              <p class="brends-slide__name">{{ brand.name }}</p>
            </NuxtLink>
          </swiper-slide>
          </swiper-container>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
const config = useRuntimeConfig()
const baseUrl = config.public.apiUrl

const brendsSwiperRef = ref(null)
const brands = ref([])

const { data: brandsData } = await useFetch(`${baseUrl}/brands`)

console.log('brandsData', brandsData.value)
if (brandsData.value?.brands) {
  brands.value = brandsData.value.brands
}
console.log('brands', brands.value)

watch(brandsData, (val) => {
  if (val?.brands) {
    brands.value = val.brands
  }
})

useSwiper(brendsSwiperRef, {
  slidesPerView: 'auto',
  spaceBetween: 24,
  speed: 4000,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: { slidesPerView: 'auto' },
    640: { slidesPerView: 'auto' },
    768: { slidesPerView: 'auto' },
    1024: { slidesPerView: 'auto' },
    1280: { slidesPerView: 'auto' },
  },
})
</script>
