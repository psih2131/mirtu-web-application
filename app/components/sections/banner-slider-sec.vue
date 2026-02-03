<template>
  <section class="banner-sec">
    <div class="container banner-sec__container">
      <ClientOnly>
        <div ref="wrapRef" class="banner-slider__wrap">
          <swiper-container
            ref="swiperRef"
            class="banner-slider"
            :slides-per-view="'auto'"
            :space-between="16"
            :speed="500"
            :loop="true"
            :pagination="true"
            :pagination-clickable="true"
          >
          <swiper-slide
            v-for="(slide, idx) in slides"
            :key="idx"
            class="banner-slider__slide"
            :class="idx % 2 === 0 ? 'banner-slider__slide--long' : 'banner-slider__slide--short'"
          >
            <NuxtLink
            to="/"
              class="banner-slide"
              :class="`banner-slide--${slide.theme}`"
            >
              <img
                :src="slide.image"
                :alt="slide.title"
                class="banner-slide__img"
              >
              <div class="banner-slide__content">
                <span v-if="slide.brand" class="banner-slide__brand">{{ slide.brand }}</span>
                <h2 class="banner-slide__title">{{ slide.title }}</h2>
                <p v-if="slide.subtitle" class="banner-slide__subtitle">{{ slide.subtitle }}</p>
              </div>
            </NuxtLink>
          </swiper-slide>
          </swiper-container>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
const swiperRef = ref<HTMLElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)

function setWrapWidth() {
  const el = wrapRef.value
  if (!el) return
  el.style.setProperty('--banner-wrap-width', `${el.offsetWidth}px`)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  nextTick(() => {
    setWrapWidth()
    const el = wrapRef.value
    if (!el) return
    resizeObserver = new ResizeObserver(setWrapWidth)
    resizeObserver.observe(el)
  })
})

onUnmounted(() => {
  if (resizeObserver && wrapRef.value) {
    resizeObserver.disconnect()
  }
})

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200',
    brand: 'mirtu.kz',
    title: 'Новое поступление',
    subtitle: 'New Balance',
    theme: 'dark',
  },
  {
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1200',
    brand: '',
    title: 'SALE 50%',
    subtitle: 'adidas',
    theme: 'light',
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200',
    brand: 'mirtu.kz',
    title: 'Коллекция Nike',
    subtitle: 'Air Max',
    theme: 'dark',
  },
  {
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200',
    brand: '',
    title: 'Хиты сезона',
    subtitle: 'Sneakers',
    theme: 'light',
  },
]
</script>
