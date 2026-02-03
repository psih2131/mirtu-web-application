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
      title="Одежда для спорта"
      :products="clothingProducts"
    />

    <blogSliderSec
      :posts="blogPosts"
    />

    <seoTextSec />

  </div>
</template>

<script setup>
import bannerSliderSec from '@/components/sections/banner-slider-sec.vue'
import brendsSliderSec from '@/components/sections/brends-slider-sec.vue'
import productsSliderSec from '@/components/sections/products-slider-sec.vue'
import actualCatSec from '@/components/sections/actyal-cat-sec.vue'
import blogSliderSec from '@/components/sections/blog-slider-sec.vue'
import seoTextSec from '@/components/sections/seo-text-sec.vue'
import a1 from '~/assets/images/products/a1.jpg'
import a2 from '~/assets/images/products/a2.jpg'
import a3 from '~/assets/images/products/a3.jpg'
import a4 from '~/assets/images/products/a4.jpg'
import a5 from '~/assets/images/products/a5.jpg'
import a6 from '~/assets/images/products/a6.jpg'

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

const productRows2 = [
  { title: 'Oversize худи Essential', subtitle: 'Тёплые толстовки на каждый день', price: '29 990 ₸', img: a1, tag: 'NEW', description: 'Мягкий хлопок, свободный крой и универсальные оттенки — базовый худи для города и отдыха.' },
  { title: 'Флисовая кофта Trail', subtitle: 'Туристическая одежда', price: '34 990 ₸', img: a2, description: 'Лёгкий и тёплый флис, который удобно брать в поход или на прогулку в прохладную погоду.' },
  { title: 'Ветровка RunPro', subtitle: 'Для бега и тренировок', price: '37 990 ₸', img: a3, description: 'Защита от ветра и влаги, рефлективные детали и продуманные вентиляционные вставки.' },
  { title: 'Парка Urban Winter', subtitle: 'Городская зима', price: '59 990 ₸', img: a4, description: 'Утеплённая парка с капюшоном и вместительными карманами — стильная защита от холода.' },
  { title: 'Костюм Motion Set', subtitle: 'Худи и брюки', price: '49 990 ₸', img: a5, description: 'Спортивный комплект для активного дня: мягкий трикотаж и комфортный крой.' },
  { title: 'Футболка Everyday Tee', subtitle: 'Базовый гардероб', price: '14 990 ₸', img: a6, description: 'Классическая хлопковая футболка, которая подходит и под джинсы, и под спортивный образ.' },
  { title: 'Флисовая кофта Trail', subtitle: 'Туристическая одежда', price: '34 990 ₸', img: a2, description: 'Лёгкий и тёплый флис, который удобно брать в поход или на прогулку в прохладную погоду.' },
  { title: 'Ветровка RunPro', subtitle: 'Для бега и тренировок', price: '37 990 ₸', img: a3, description: 'Защита от ветра и влаги, рефлективные детали и продуманные вентиляционные вставки.' },
  { title: 'Парка Urban Winter', subtitle: 'Городская зима', price: '59 990 ₸', img: a4, description: 'Утеплённая парка с капюшоном и вместительными карманами — стильная защита от холода.' },
  { title: 'Костюм Motion Set', subtitle: 'Худи и брюки', price: '49 990 ₸', img: a5, description: 'Спортивный комплект для активного дня: мягкий трикотаж и комфортный крой.' },
  { title: 'Футболка Everyday Tee', subtitle: 'Базовый гардероб', price: '14 990 ₸', img: a6, description: 'Классическая хлопковая футболка, которая подходит и под джинсы, и под спортивный образ.' },
]

const newArrivalsProducts = productRows.map((p) => ({
  ...p,
  colors: pickRandomColors(2 + Math.floor(Math.random() * 2)),
}))

const clothingProducts = productRows2.map((p) => ({
  ...p,
  colors: pickRandomColors(2 + Math.floor(Math.random() * 2)),
}))

const blogPosts = [
  {
    title: 'Как выбрать кроссовки для бега в городе',
    category: 'Гид по выбору',
    date: '12 февраля',
    readTime: '5 мин',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    href: '/blog/running-shoes-guide',
    tag: 'Running',
    excerpt: 'Разбираемся, какие кроссовки подойдут для асфальта, чем отличаются тренировочные модели от соревновательных и на что смотреть при примерке.',
  },
  {
    title: 'Слоёные образы с худи и паркой на каждый день',
    category: 'Стиль',
    date: '8 февраля',
    readTime: '4 мин',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    href: '/blog/layering-hoodie-parka',
    tag: 'Outfit',
    excerpt: 'Показываем, как собрать тёплый и при этом лёгкий по ощущениям образ для города — от базовой футболки до верхнего слоя.',
  },
  {
    title: 'Что взять с собой в горный поход',
    category: 'Туризм',
    date: '2 февраля',
    readTime: '6 мин',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80',
    href: '/blog/mountain-hike-checklist',
    tag: 'Hiking',
    excerpt: 'Список must-have вещей в рюкзаке: обувь, одежда, дополнительные слои и мелочи, которые могут спасти поход.',
  },
  {
    title: 'Уход за обувью после дождя и снега',
    category: 'Уход',
    date: '28 января',
    readTime: '3 мин',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    href: '/blog/shoes-care-after-rain',
    tag: 'Care',
    excerpt: 'Рассказываем, как правильно просушить и почистить кроссовки и ботинки, чтобы они не потеряли форму и цвет.',
  },
  {
    title: 'Обувь для скейтбординга: ключевые отличия',
    category: 'Скейтбординг',
    date: '21 января',
    readTime: '4 мин',
    img: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&w=1000&q=80',
    href: '/blog/skate-shoes-difference',
    tag: 'Skate',
    excerpt: 'Чем скейтовая обувь отличается от обычных кед и почему усиленная подошва и носок так важны.',
  },
]
</script>
