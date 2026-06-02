<template>
  <section class="actual-cat-sec">
    <div class="container">
      <div class="actual-cat-sec__header">
        <h2 class="actual-cat-sec__title">
          Популярные категории
        </h2>
        <p class="actual-cat-sec__desc">
          Обувь, одежда и аксессуары для города, спорта и путешествий — выберите раздел и смотрите актуальные модели.
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
import travelImg from '~/assets/images/category/x4.jpg'
import snowImg from '~/assets/images/category/x5.jpg'

const categoryCards = [
  {
    slug: 'sneakers',
    title: 'Кроссовки',
    subtitle: 'Для города, спорта и повседневных образов',
    img: runImg,
    to: '/products/categories/1',
  },
  {
    slug: 'clothing',
    title: 'Одежда',
    subtitle: 'Стильные вещи для тренировок и отдыха',
    img: travelImg,
    to: '/products/categories/2',
  },
  {
    slug: 'bags',
    title: 'Сумки',
    subtitle: 'На каждый день и для путешествий',
    img: snowImg,
    to: '/products/categories/4',
  },
]
</script>
