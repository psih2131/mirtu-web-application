<template>
  <div class="category-page__filter" :class="{ 'category-page__filter--open': isOpen }">
    <button type="button" class="category-page__filter-head" @click="toggle">
      <span>Цена</span>
      <span class="category-page__filter-chevron" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
    <Collapse :when="isOpen" class="category-page__collapse">
      <div class="category-page__filter-body">
        <FieldsPriceRangeFilter
          v-model="rangeValue"
          :min="0"
          :max="1000000"
          :step="1000"
        />
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Collapse } from 'vue-collapsed'
import FieldsPriceRangeFilter from '@/components/fields/PriceRangeFilter.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ min: 0, max: 1000000 }),
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(true)

const rangeValue = computed({
  get: () => [props.modelValue?.min ?? 0, props.modelValue?.max ?? 1000000],
  set: (val) => emit('update:modelValue', { min: val[0], max: val[1] }),
})

function toggle() {
  isOpen.value = !isOpen.value
}
</script>
