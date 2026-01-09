<template>
  <div class="app">
  
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  
  </div>
</template>


<script setup lang="ts">



useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
})
</script>