<template>
  <div>
    <bannerSliderSec />

    <brendsSliderSec />

    <productsSliderSec
      title="Популярные кросовки Nike"
      :products="popularModelsProducts"
    />

    <actualCatSec />

    <productsSliderSec
      title="Сумки на каждый день"
      :products="frequentlyBoughtProducts"
    />

    <productsSliderSec
      title="Будь на стиле"
      :products="sportClothingProducts"
    />

    <!-- <blogSliderSec :posts="blogPosts" /> -->

    <seoTextSec />
  </div>
</template>

<script setup>
import bannerSliderSec from "@/components/sections/banner-slider-sec.vue";
import brendsSliderSec from "@/components/sections/brends-slider-sec.vue";
import productsSliderSec from "@/components/sections/products-slider-sec.vue";
import actualCatSec from "@/components/sections/actyal-cat-sec.vue";
import blogSliderSec from "@/components/sections/blog-slider-sec.vue";
import seoTextSec from "@/components/sections/seo-text-sec.vue";

const { products: popularModelsProducts } = await useCardsProducts({
  categoryIds: [1],
  brandIds: [2],
  sortBy: "rating",
  sortOrder: "desc",
  limit: 12,
  key: "home-popular-models-rating-desc",
});

const { products: frequentlyBoughtProducts } = await useCardsProducts({
  categoryIds: [4],
  brandIds: [2],
  sortBy: "rating",
  sortOrder: "desc",
  limit: 12,
  key: "home-frequently-bought",
});

const { products: sportClothingProducts } = await useCardsProducts({
  categoryIds: [2],
  brandIds: [96],
  sortBy: "rating",
  sortOrder: "desc",
  limit: 12,
  key: "home-sport-clothing",
});

const blogPosts = [
  {
    title: "Как выбрать кроссовки для бега в городе",
    category: "Гид по выбору",
    date: "12 февраля",
    readTime: "5 мин",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    href: "/blog/running-shoes-guide",
    tag: "Running",
    excerpt:
      "Разбираемся, какие кроссовки подойдут для асфальта, чем отличаются тренировочные модели от соревновательных и на что смотреть при примерке.",
  },
  {
    title: "Слоёные образы с худи и паркой на каждый день",
    category: "Стиль",
    date: "8 февраля",
    readTime: "4 мин",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
    href: "/blog/layering-hoodie-parka",
    tag: "Outfit",
    excerpt:
      "Показываем, как собрать тёплый и при этом лёгкий по ощущениям образ для города — от базовой футболки до верхнего слоя.",
  },
  {
    title: "Что взять с собой в горный поход",
    category: "Туризм",
    date: "2 февраля",
    readTime: "6 мин",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80",
    href: "/blog/mountain-hike-checklist",
    tag: "Hiking",
    excerpt:
      "Список must-have вещей в рюкзаке: обувь, одежда, дополнительные слои и мелочи, которые могут спасти поход.",
  },
  {
    title: "Уход за обувью после дождя и снега",
    category: "Уход",
    date: "28 января",
    readTime: "3 мин",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    href: "/blog/shoes-care-after-rain",
    tag: "Care",
    excerpt:
      "Рассказываем, как правильно просушить и почистить кроссовки и ботинки, чтобы они не потеряли форму и цвет.",
  },
  {
    title: "Обувь для скейтбординга: ключевые отличия",
    category: "Скейтбординг",
    date: "21 января",
    readTime: "4 мин",
    img: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?auto=format&fit=crop&w=1000&q=80",
    href: "/blog/skate-shoes-difference",
    tag: "Skate",
    excerpt:
      "Чем скейтовая обувь отличается от обычных кед и почему усиленная подошва и носок так важны.",
  },
];

</script>
