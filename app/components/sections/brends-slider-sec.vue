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
import { useRuntimeConfig } from "#app";
import {ref, onMounted} from "vue"
const config = useRuntimeConfig()
const baseUrl = config.public.apiUrl

const brendsSwiperRef = ref(null)
const brands = ref([])

const { data: brandsData } = await useFetch(`${baseUrl}/api/brands`)

console.log('brandsData', brandsData.value)
brands.value = brandsData.value.brands


// brands.value = brandsData.value
// console.log('brands', brands.value)

// watch(brandsData, (val) => {
//   if (val?.brands) {
//     brands.value = val.brands
//   }
// })


// async function getBrands() {
//   const brendstest = await fetch(`${baseUrl}/api/brands`)
//   const brendstestData = await brendstest.json()
//   console.log('brendstest', brendstestData)
 
// }

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

// onMounted(() => {
//   getBrands()
// })
</script>
