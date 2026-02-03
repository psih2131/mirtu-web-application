<template>
  <article class="blog-card">
    <div class="blog-card__img-wrap">
      <img
        :src="post.img"
        :alt="post.title"
        class="blog-card__img"
        loading="lazy"
      >
      <span v-if="post.tag" class="blog-card__tag">{{ post.tag }}</span>
    </div>
    <div class="blog-card__body">
      <p class="blog-card__meta">
        <span>{{ post.category }}</span>
        <span>·</span>
        <span>{{ post.date }}</span>
        <span v-if="post.readTime">· {{ post.readTime }}</span>
      </p>
      <h3 class="blog-card__title">
        {{ post.title }}
      </h3>
      <p v-if="post.excerpt" class="blog-card__excerpt">
        {{ post.excerpt }}
      </p>
      <NuxtLink :to="post.href || '/blog'" class="blog-card__more">
        Читать статью
        <span class="blog-card__more-icon" aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

