<template>
  <div class="app-wrapper">

    <headerComponent :dataContacts="aboutData" />

    <slot/>

    <footerComponent :dataContacts="aboutData" />

    <cartComponent />
    
  </div>
</template>

<script setup>
import headerComponent from '@/components/header.vue'
import footerComponent from '@/components/footer.vue'
import cartComponent from '@/components/cart.vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const { data: aboutData } = await useFetch(`${apiBase}/about`, { method: 'GET' })

const route = useRoute()
watch(() => route.query.openCart, (val) => {
  if (val && process.client) counterStore.openCart()
}, { immediate: true })
</script>

