<template>
  <div class="app-wrapper">

    <headerComponent />

    <slot/>

    <footerComponent />

    <cartComponent />
    
  </div>
</template>

<script setup>
import headerComponent from '@/components/header.vue'
import footerComponent from '@/components/footer.vue'
import cartComponent from '@/components/cart.vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>

