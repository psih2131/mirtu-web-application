<template>
  <div class="category-page__sort">
    <label for="sort-select" class="category-page__sort-label">Сортировка:</label>
    <select
      id="sort-select"
      class="category-page__sort-select"
      :value="selectValue"
      @change="onChange"
    >
      <option value="default">По умолчанию</option>
      <option value="price-asc">По возрастанию цены</option>
      <option value="price-desc">По убыванию цены</option>
      <option value="creation_date-desc">По дате добавления</option>
      <option value="rating-desc">По рейтингу</option>
    </select>
  </div>
</template>

<script setup>
const SORT_MAP = {
  default: { sort_by: null, sort_order: null },
  'price-asc': { sort_by: 'price', sort_order: 'asc' },
  'price-desc': { sort_by: 'price', sort_order: 'desc' },
  'creation_date-desc': { sort_by: 'creation_date', sort_order: 'desc' },
  'rating-desc': { sort_by: 'rating', sort_order: 'desc' },
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ sort_by: null, sort_order: null }),
  },
})

const emit = defineEmits(['update:modelValue'])

const selectValue = computed(() => {
  const v = props.modelValue
  if (!v?.sort_by) return 'default'
  const key = `${v.sort_by}-${v.sort_order}`
  return Object.keys(SORT_MAP).includes(key) ? key : 'default'
})

function onChange(e) {
  const val = e.target.value
  emit('update:modelValue', { ...SORT_MAP[val] })
}
</script>
