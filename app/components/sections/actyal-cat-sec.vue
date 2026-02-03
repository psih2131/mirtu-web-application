<template>
  <section class="actual-cat-sec">
    <div class="container">
      <div class="actual-cat-sec__header">
        <h2 class="actual-cat-sec__title">
          Обувь для всех видов активности
        </h2>
        <p class="actual-cat-sec__desc">
          Современный магазин обуви с акцентом на минимализм и качество: беговые, туристические и скейт-модели для города и активного отдыха.
        </p>
      </div>


      <div class="actual-cat-sec__grid">
        <NuxtLink
          v-for="card in categoryCards"
          :key="card.slug"
          :to="card.to"
          class="actual-cat-sec__card"
        >
          <div class="actual-cat-sec__card-bg" :class="{ 'actual-cat-sec__card-bg--solid': !card.img }">
            <div v-if="card.img" class="actual-cat-sec__card-bg-inner" :style="{ backgroundImage: `url(${card.img})` }" />
          </div>
          <div class="actual-cat-sec__card-content">
            <span v-if="card.tag" class="actual-cat-sec__card-tag">{{ card.tag }}</span>
            <h3 class="actual-cat-sec__card-title">{{ card.title }}</h3>
            <p v-if="card.subtitle" class="actual-cat-sec__card-subtitle">{{ card.subtitle }}</p>
            <p v-if="card.text" class="actual-cat-sec__card-text">{{ card.text }}</p>
          </div>
   
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import runImg from '~/assets/images/category/x1.webp'
import travelImg from '~/assets/images/category/x2.jpg'
import snowImg from '~/assets/images/category/x3.jpeg'

const categoryCards = [
  {
    slug: 'running',
    title: 'Беговые',
    subtitle: 'Для тренировок и марафонов',
    img: runImg,
    to: '/catalog?cat=running',
    withCircleBtn: true,
  },
  {
    slug: 'hiking',
    title: 'Туристические',
    subtitle: 'В поход и на тропу',
    img: travelImg,
    to: '/catalog?cat=hiking',
  },
  {
    slug: 'snowboard',
    title: 'Сноубординг',
    subtitle: 'Горы и склоны',
    img: snowImg,
    to: '/catalog?cat=snowboard',
    withBtn: true,
  },
]
</script>
