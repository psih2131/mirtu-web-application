<template>
  <div class="category-page__filter" :class="{ 'category-page__filter--open': isOpen }">
    <button type="button" class="category-page__filter-head" @click="toggle">
      <span>Коллекция <span class="filter-series__count">({{ series.length }})</span></span>
      <span class="category-page__filter-chevron" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
    <Collapse :when="isOpen" class="category-page__collapse">
      <div class="category-page__filter-body filter-series__body">
        <div class="filter-series__search-wrap">
          <input
            v-model="searchQuery"
            type="text"
            class="filter-series__search"
            placeholder="Найти коллекцию..."
            aria-label="Поиск по коллекциям"
          >
          <button
            v-if="searchQuery.length"
            type="button"
            class="filter-series__clear"
            aria-label="Очистить поиск"
            @click="searchQuery = ''"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div v-if="searchQuery.trim() && !filteredSeries.length" class="filter-series__empty">
          Ничего не найдено
        </div>
        <div v-else class="filter-series__list">
          <label
            v-for="item in filteredSeries"
            :key="item.id"
            class="category-page__checkbox"
            :class="{ 'filter-series__item--disabled': !isSelectable(item) }"
          >
            <input
              type="checkbox"
              :value="item.id"
              :checked="selectedIds.includes(item.id)"
              :disabled="!isSelectable(item)"
              @change="(e) => onToggle(item.id, e.target.checked)"
            >
            <span>{{ item.name }}</span>
            <span v-if="item.count != null" class="filter-series__count-inline">({{ item.count }})</span>
          </label>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Collapse } from 'vue-collapsed'

const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
  selectedBrandIds: {
    type: Array,
    default: () => [],
  },
  open: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.open)
const selectedIds = ref([...props.modelValue])
const searchQuery = ref('')

const filteredSeries = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.series
  return props.series.filter((s) =>
    (s.name || '').toLowerCase().includes(q)
  )
})

function isSelectable(item) {
  const brandIds = props.selectedBrandIds
  if (!brandIds.length) return true
  return brandIds.includes(item.brand_id)
}

function toggle() {
  isOpen.value = !isOpen.value
}

function onToggle(id, checked) {
  if (checked) {
    selectedIds.value = [...selectedIds.value, id]
  } else {
    selectedIds.value = selectedIds.value.filter((x) => x !== id)
  }
  emit('update:modelValue', [...selectedIds.value])
}

watch(
  () => [props.series, props.selectedBrandIds],
  () => {
    selectedIds.value = selectedIds.value.filter((id) => {
      const item = props.series.find((s) => s.id === id)
      if (!item) return false
      return isSelectable(item)
    })
    emit('update:modelValue', [...selectedIds.value])
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (val) => {
    selectedIds.value = [...(val || [])]
  },
  { deep: true }
)
</script>

<style scoped>
.filter-series__count {
  color: #9ca3af;
}

.filter-series__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-series__search-wrap {
  position: relative;
}

.filter-series__search {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-series__search:focus {
  border-color: #1e3a5f;
}

.filter-series__clear {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}

.filter-series__clear:hover {
  color: #6b7280;
  background: #f3f4f6;
}

.filter-series__search::placeholder {
  color: #9ca3af;
}

.filter-series__empty {
  padding: 1rem;
  font-size: 0.8125rem;
  color: #9ca3af;
  text-align: center;
  background: #f9fafb;
  border-radius: 6px;
}

.filter-series__list {
  max-height: 350px;
  overflow-y: auto;
}

.filter-series__count-inline {
  margin-left: 0.25rem;
  font-size: 0.8125rem;
  color: #9ca3af;
}

.filter-series__item--disabled {
  opacity: 0.5;
  color: #9ca3af;
  cursor: not-allowed;
  pointer-events: none;
}

.filter-series__item--disabled input {
  cursor: not-allowed;
}
</style>
