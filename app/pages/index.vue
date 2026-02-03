<template>
  <div>
    <bannerSliderSec />
    <brendsSliderSec />
    <productsSliderSec
      title="Новые поступления"
      :products="newArrivalsProducts"
    />
  </div>
</template>

<script setup>
import bannerSliderSec from '@/components/sections/banner-slider-sec.vue'
import brendsSliderSec from '@/components/sections/brends-slider-sec.vue'
import productsSliderSec from '@/components/sections/products-slider-sec.vue'

const newArrivalsProducts = [
  {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    brand: 'adidas Original',
    category: 'Кроссовки',
    model: 'Hamburg',
    price: '12 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
    brand: 'Reebok',
    category: 'Женские кроссовки',
    model: 'ERS 4000',
    price: '9 490 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    brand: 'Nike',
    category: 'Мужские кроссовки',
    model: "Wmns Blazer Low '77 Vintage",
    price: '14 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    brand: 'Premiata',
    category: 'Кроссовки',
    model: 'Cassie 7472',
    price: '18 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
    brand: 'Puma',
    category: 'Кроссовки',
    model: 'Easy Rider Mix',
    price: '11 490 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
    brand: 'Converse',
    category: 'Кеды',
    model: 'Chuck Taylor All Star',
    price: '7 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
    brand: 'New Balance',
    category: 'Беговые',
    model: '574',
    price: '13 490 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400',
    brand: 'Vans',
    category: 'Скейтбординг',
    model: 'Old Skool',
    price: '8 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919dacb?w=400',
    brand: 'Asics',
    category: 'Беговые',
    model: 'Gel-Kayano',
    price: '15 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abd5d1?w=400',
    brand: 'Fila',
    category: 'Кроссовки',
    model: 'Disruptor',
    price: '10 490 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400',
    brand: 'Jordan',
    category: 'Баскетбол',
    model: 'Air 1 Mid',
    price: '16 990 P',
  },
  {
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    brand: 'Nike',
    category: 'Кроссовки',
    model: 'Air Max 90',
    price: '14 490 P',
  },
]
</script>