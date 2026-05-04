<template>
  <main class="doc-page">
    <section class="doc-page__section">
    <div class="container doc-page__inner">
      <h1 class="doc-page__title">{{ doc.title }}</h1>
        <div class="editor" v-html="doc.html" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import doc from '@/data/support-pages/private-policy.json'

useHead({
  title: doc.title,
})
</script>
