<template>
  <section class="brends-sec">
    <div class="container brends-sec__container">
      <ClientOnly>
        <div class="brends-slider__fade-wrap">
          <swiper-container
            ref="brendsSwiperRef"
            class="brends-slider"
            :init="false"
          >
          <swiper-slide
            v-for="(brand, idx) in brands"
            :key="idx"
            class="brends-slider__slide"
          >
            <NuxtLink to="/" class="brends-slide">
              <div class="brends-slide__img-wrap">
                <img
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
const brendsSwiperRef = ref(null)

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

const brandLogosModules = import.meta.glob('~/assets/images/brends/*.svg', { eager: true, query: '?url', import: 'default' })

const brandNames = [
  'STREETBEAT',
  'The North Face',
  'PUMA',
  'Nike',
  'Reebok',
  'Converse',
  'adidas',
  'VANS',
  'New Balance',
  'HUGO',
  'ASICS',
  'FILA',
  'Jordan',
  'Under Armour',
]

const brandLogoUrls = Object.values(brandLogosModules).map((m) => (typeof m === 'string' ? m : m?.default ?? ''))

const brands = brandNames.map((name, idx) => ({
  name,
  logo: brandLogoUrls[idx] ?? '',
})).filter(b => b.logo)
</script>
