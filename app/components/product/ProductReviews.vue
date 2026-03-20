<template>
  <section id="reviews" class="product-reviews">
    <div class="container">
      <h2 class="product-reviews__title">Отзывы</h2>

      <div class="product-reviews__layout">
        <div class="product-reviews__list">
          <p v-if="!reviews.length" class="product-reviews__empty">Пока нет отзывов. Будьте первым!</p>
          <div
            v-for="(r, idx) in reviews"
            :key="idx"
            class="product-reviews__item"
          >
            <div class="product-reviews__item-header">
              <span class="product-reviews__item-name">{{ r.author }}</span>
              <span class="product-reviews__item-stars" :aria-label="`${r.rating} из 5`">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="product-reviews__star"
                  :class="{ 'product-reviews__star--filled': star <= r.rating }"
                >
                  ★
                </span>
              </span>
            </div>
            <p class="product-reviews__item-text">{{ r.text }}</p>
            <time v-if="r.date" class="product-reviews__item-date">{{ r.date }}</time>
          </div>
        </div>

        <div class="product-reviews__form-wrap">
          <form class="product-reviews__form" @submit.prevent="onSubmit">
            <h3 class="product-reviews__form-title">Написать отзыв</h3>
            <div class="product-reviews__rating-row">
              <span class="product-reviews__form-label">Оценка:</span>
              <div class="product-reviews__stars-input" role="group" aria-label="Выберите оценку от 1 до 5">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="product-reviews__star-btn"
                  :class="{ 'product-reviews__star-btn--active': star <= form.rating }"
                  :aria-label="`${star} из 5 звёзд`"
                  @click="form.rating = star"
                >
                  ★
                </button>
              </div>
            </div>
            <div class="product-reviews__text-row">
              <label for="review-text" class="product-reviews__form-label">Текст отзыва:</label>
              <textarea
                id="review-text"
                v-model="form.text"
                class="product-reviews__textarea"
                rows="5"
                placeholder="Опишите ваши впечатления от товара..."
              />
            </div>
            <button type="submit" class="product-reviews__submit" :disabled="!form.text?.trim()">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId?: string | number
}>()

const reviews = ref<Array<{ author: string; text: string; rating: number; date?: string }>>([])
const form = reactive({
  text: '',
  rating: 5,
})

function onSubmit() {
  if (!form.text?.trim()) return
  reviews.value.push({
    author: 'Вы',
    text: form.text.trim(),
    rating: form.rating,
    date: new Date().toLocaleDateString('ru-RU'),
  })
  form.text = ''
  form.rating = 5
}
</script>

<style scoped lang="scss">
.product-reviews {
  padding: 3rem 0;
  background: #f9fafb;
}

.product-reviews__title {
  margin: 0 0 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e3a5f;
}

.product-reviews__layout {
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
}

.product-reviews__list {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.product-reviews__empty {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #d1d5db;
}

.product-reviews__item {
  background: #fff;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.product-reviews__item-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.product-reviews__item-name {
  font-weight: 600;
  color: #1e3a5f;
  font-size: 0.9375rem;
}

.product-reviews__item-stars {
  display: inline-flex;
  color: #fbbf24;
  font-size: 1rem;
}

.product-reviews__star {
  color: #e5e7eb;

  &--filled {
    color: #fbbf24;
  }
}

.product-reviews__item-text {
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #374151;
}

.product-reviews__item-date {
  font-size: 0.8125rem;
  color: #9ca3af;
}

.product-reviews__form-wrap {
  flex-shrink: 0;
  width: 360px;
}

.product-reviews__form {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.product-reviews__form-title {
  margin: 0 0 1.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e3a5f;
}

.product-reviews__form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.product-reviews__rating-row {
  margin-bottom: 1rem;

  .product-reviews__form-label {
    display: inline-block;
    margin-bottom: 0.35rem;
  }
}

.product-reviews__stars-input {
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.product-reviews__star-btn {
  padding: 0.25rem;
  font-size: 1.5rem;
  color: #e5e7eb;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s, transform 0.15s;

  &:hover {
    color: #fcd34d;
    transform: scale(1.1);
  }

  &--active {
    color: #fbbf24;
  }
}

.product-reviews__text-row {
  margin-bottom: 1rem;
}

.product-reviews__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #1e3a5f;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #1e3a5f;
    box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
}

.product-reviews__submit {
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #1e3a5f;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #2d4a6f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {
  .product-reviews__layout {
    flex-direction: column-reverse;
  }

  .product-reviews__form-wrap {
    width: 100%;
  }
}
</style>
