<template>
  <div>
    <bannerSliderSec />

    <brendsSliderSec />

    <productsSliderSec
      title="Популярные модели"
      :products="newArrivalsProducts"
    />

    <actualCatSec />

    <productsSliderSec
      title="Часто покупают"
      :products="newArrivalsProducts"
    />

    <productsSliderSec
      title="Лидеры продаж"
      :products="newArrivalsProducts"
    />

  </div>
</template>

<script setup>
import bannerSliderSec from '@/components/sections/banner-slider-sec.vue'
import brendsSliderSec from '@/components/sections/brends-slider-sec.vue'
import productsSliderSec from '@/components/sections/products-slider-sec.vue'
import actualCatSec from '@/components/sections/actyal-cat-sec.vue'

const productImageModules = import.meta.glob('~/assets/images/products/*.webp', { eager: true, query: '?url', import: 'default' })
const productImageUrls = Object.values(productImageModules).map((m) => (typeof m === 'string' ? m : m?.default ?? ''))

function getImg(index) {
  return productImageUrls[index % productImageUrls.length] ?? productImageUrls[0] ?? ''
}

const colorPalette = ['#1a1a1a', '#ffffff', '#c0c0c0', '#8b4513', '#2c5282', '#c53030', '#2f855a', '#744210', '#553c9a', '#b83280', '#dd6b20', '#e53e3e', '#3182ce', '#38a169']
function pickRandomColors(count) {
  const shuffled = [...colorPalette].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const productRows = [
  { title: 'Nike SB Dunk Low Pro', subtitle: 'Skate Shoes', price: '45 990 ₸', img: getImg(0), tag: 'BEST SELLER', description: 'Классика, на которую можно положиться. Дизайн в духе скейт-культуры и кожаных курток — удобные кроссовки для города и катания.' },
  { title: 'adidas Hamburg', subtitle: 'Кроссовки', price: '32 990 ₸', img: getImg(1), description: 'Легендарная модель adidas в ретро-стиле. Удобная колодка и узнаваемый силуэт для повседневной носки.' },
  { title: 'Reebok Club C 85', subtitle: 'Женские кроссовки', price: '28 990 ₸', img: getImg(2), tag: 'BEST SELLER', description: 'Минималистичный дизайн и мягкая подошва. Идеальный выбор для тех, кто ценит простоту и комфорт.' },
  { title: "Nike Blazer Low '77", subtitle: 'Мужские кроссовки', price: '49 990 ₸', img: getImg(3), description: 'Низкий силуэт в духе баскетбола 70-х. Классика Nike с современной посадкой и долговечными материалами.' },
  { title: 'New Balance 574', subtitle: 'Беговые', price: '39 990 ₸', img: getImg(4), description: 'Универсальная модель для бега и прогулок. Поддержка стопы и стабильность в каждой детали.' },
  { title: 'Converse Chuck Taylor', subtitle: 'Кеды', price: '24 990 ₸', img: getImg(5), tag: 'BEST SELLER', description: 'Самые узнаваемые кеды в мире. Канвас, резиновая подошва и дух уличной культуры с 1917 года.' },
  { title: 'Puma Suede Classic', subtitle: 'Кроссовки', price: '21 990 ₸', img: getImg(6), description: 'Замшевый верх и мягкая подошва. Классика Puma для повседневного стиля.' },
  { title: 'Vans Old Skool', subtitle: 'Скейтбординг', price: '27 990 ₸', img: getImg(7), description: 'Полоска на боку и прочная конструкция. Выбор скейтеров и любителей уличной моды по всему миру.' },
  { title: 'adidas Hamburg', subtitle: 'Кроссовки', price: '32 990 ₸', img: getImg(1), description: 'Легендарная модель adidas в ретро-стиле. Удобная колодка и узнаваемый силуэт для повседневной носки.' },
  { title: 'Reebok Club C 85', subtitle: 'Женские кроссовки', price: '28 990 ₸', img: getImg(2), description: 'Минималистичный дизайн и мягкая подошва. Идеальный выбор для тех, кто ценит простоту и комфорт.' },
  { title: "Nike Blazer Low '77", subtitle: 'Мужские кроссовки', price: '49 990 ₸', img: getImg(3), description: 'Низкий силуэт в духе баскетбола 70-х. Классика Nike с современной посадкой и долговечными материалами.' },
  { title: 'New Balance 574', subtitle: 'Беговые', price: '39 990 ₸', img: getImg(4), description: 'Универсальная модель для бега и прогулок. Поддержка стопы и стабильность в каждой детали.' },
  { title: 'Converse Chuck Taylor', subtitle: 'Кеды', price: '24 990 ₸', img: getImg(5), description: 'Самые узнаваемые кеды в мире. Канвас, резиновая подошва и дух уличной культуры с 1917 года.' },
  { title: 'Puma Suede Classic', subtitle: 'Кроссовки', price: '21 990 ₸', img: getImg(6), description: 'Замшевый верх и мягкая подошва. Классика Puma для повседневного стиля.' },
  { title: 'Vans Old Skool', subtitle: 'Скейтбординг', price: '27 990 ₸', img: getImg(7), description: 'Полоска на боку и прочная конструкция. Выбор скейтеров и любителей уличной моды по всему миру.' },
]

const newArrivalsProducts = productRows.map((p) => ({
  ...p,
  colors: pickRandomColors(2 + Math.floor(Math.random() * 2)),
}))
</script>
