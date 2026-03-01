<template>
  <div class="category-page__filter" :class="{ 'category-page__filter--open': isOpen }">
    <button type="button" class="category-page__filter-head" @click="toggle">
      <span>Бренды <span class="filter-brand__count">({{ brands.length }})</span></span>
      <span class="category-page__filter-chevron" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
    <Collapse :when="isOpen" class="category-page__collapse">
      <div class="category-page__filter-body filter-brand__body">
        <div class="filter-brand__search-wrap">
          <input
            v-model="searchQuery"
            type="text"
            class="filter-brand__search"
            placeholder="Найти бренд..."
            aria-label="Поиск по брендам"
          >
          <button
            v-if="searchQuery.length"
            type="button"
            class="filter-brand__clear"
            aria-label="Очистить поиск"
            @click="searchQuery = ''"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3L3 11M3 3L11 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div v-if="searchQuery.trim() && !filteredBrands.length" class="filter-brand__empty">
          Ничего не найдено
        </div>
        <div v-else class="filter-brand__list">
          <label
            v-for="brand in filteredBrands"
            :key="brand.id"
            class="category-page__checkbox"
          >
          <input
            type="checkbox"
            :value="brand.id"
            :checked="selectedIds.includes(brand.id)"
            @change="(e) => onToggle(brand.id, e.target.checked)"
          >
          <span>{{ brand.name }}</span>
          <span v-if="brand.count != null" class="category-page__filter-count">({{ brand.count }})</span>
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
  brands: {
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

const filteredBrands = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return props.brands
  return props.brands.filter((b) =>
    (b.name || '').toLowerCase().includes(q)
  )
})

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
  () => props.brands,
  () => {
    selectedIds.value = selectedIds.value.filter((id) =>
      props.brands.some((b) => b.id === id)
    )
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
.filter-brand__count {
  color: #9ca3af;
}

.filter-brand__body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-brand__search-wrap {
  position: relative;
}

.filter-brand__search {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.filter-brand__search:focus {
  border-color: #1e3a5f;
}

.filter-brand__clear {
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

.filter-brand__clear:hover {
  color: #6b7280;
  background: #f3f4f6;
}

.filter-brand__search::placeholder {
  color: #9ca3af;
}

.filter-brand__empty {
  padding: 1rem;
  font-size: 0.8125rem;
  color: #9ca3af;
  text-align: center;
  background: #f9fafb;
  border-radius: 6px;
}

.filter-brand__list {
  max-height: 350px;
  overflow-y: auto;
}

.category-page__filter-count {
  margin-left: 0.25rem;
  font-size: 0.8125rem;
  color: #9ca3af;
}
</style>
