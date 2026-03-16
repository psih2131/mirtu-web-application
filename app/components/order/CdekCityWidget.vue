<template>
  <div class="cdek-city-widget">
    <div class="cdek-city-widget__field-wrap">
      <input
        ref="inputRef"
        v-model="search"
        type="text"
        class="cdek-city-widget__input"
        placeholder="Начните вводить название вашего города и нажмите поиск"
        autocomplete="off"
        :readonly="!!selectedCity"
        @keydown.enter.prevent="onSearch"
      >
      <button
        v-if="!selectedCity"
        type="button"
        class="cdek-city-widget__btn cdek-city-widget__btn--search"
        aria-label="Поиск"
        @click="onSearch"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 20L16.2223 16.2156M18.3158 11.1579C18.3158 13.0563 17.5617 14.8769 16.2193 16.2193C14.8769 17.5617 13.0563 18.3158 11.1579 18.3158C9.2595 18.3158 7.43886 17.5617 6.0965 16.2193C4.75413 14.8769 4 13.0563 4 11.1579C4 9.2595 4.75413 7.43886 6.0965 6.0965C7.43886 4.75413 9.2595 4 11.1579 4C13.0563 4 14.8769 4.75413 16.2193 6.0965C17.5617 7.43886 18.3158 9.2595 18.3158 11.1579V11.1579Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <button
        v-else
        type="button"
        class="cdek-city-widget__btn cdek-city-widget__btn--clear"
        aria-label="Сбросить город"
        @click="onClear"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div v-if="showDropdown" class="cdek-city-widget__dropdown">
      <template v-if="cityList.length">
        <button
          v-for="city in cityList"
          :key="city.city_uuid"
          type="button"
          class="cdek-city-widget__item"
          @mousedown.prevent="selectCity(city)"
        >
          <span class="cdek-city-widget__item-name">{{ city.full_name }}</span>
          <span class="cdek-city-widget__item-code">{{ city.code }}</span>
        </button>
      </template>
      <div v-else class="cdek-city-widget__empty">
        Город не найден
      </div>
    </div>
    <p v-if="error" class="cdek-city-widget__error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue'])

const search = ref('')
const selectedCity = ref(null)
const cityList = ref([])
const showDropdown = ref(false)
const error = ref('')
const isLoading = ref(false)
const inputRef = ref(null)

watch(() => props.modelValue, (v) => {
  if (v?.name && v?.code) {
    selectedCity.value = { full_name: v.name, code: v.code }
    search.value = v.name
  } else {
    selectedCity.value = null
    search.value = ''
  }
}, { immediate: true })

async function onSearch() {
  if (selectedCity.value) return
  const q = search.value.trim()
  if (!q) {
    error.value = 'Введите название города'
    return
  }
  error.value = ''
  showDropdown.value = false
  isLoading.value = true
  try {
    const { data } = await useFetch(`/api/cdek/cityList?name=${encodeURIComponent(q)}`)
    const msg = data.value?.message
    if (Array.isArray(msg)) {
      cityList.value = msg
      showDropdown.value = true
    } else if (data.value?.error) {
      error.value = 'Ошибка поиска городов'
    } else {
      cityList.value = []
      showDropdown.value = true
    }
  } catch (e) {
    error.value = 'Ошибка поиска городов'
    cityList.value = []
  } finally {
    isLoading.value = false
  }
}

function selectCity(city) {
  selectedCity.value = city
  search.value = city.full_name
  showDropdown.value = false
  error.value = ''
  emit('update:modelValue', { name: city.full_name, code: city.code })
}

function onClear() {
  selectedCity.value = null
  search.value = ''
  showDropdown.value = false
  error.value = ''
  emit('update:modelValue', null)
}

function setError(msg) {
  error.value = msg
}

function getCityCode() {
  return props.modelValue?.code ?? selectedCity.value?.code ?? null
}

defineExpose({ setError, getCityCode })
</script>

<style scoped>
.cdek-city-widget {
  position: relative;
}

.cdek-city-widget__field-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.cdek-city-widget__field-wrap:focus-within {
  border-color: #1e3a5f;
}

.cdek-city-widget__input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0;
  font-size: 0.9375rem;
  color: #111827;
  background: none;
  border: none;
  outline: none;
}

.cdek-city-widget__input::placeholder {
  color: #9ca3af;
}

.cdek-city-widget__input:read-only {
  cursor: default;
}

.cdek-city-widget__btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: #6b7280;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.cdek-city-widget__btn:hover {
  color: #1e3a5f;
  background: #f3f4f6;
}

.cdek-city-widget__btn--search {
  color: #1e3a5f;
}

.cdek-city-widget__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 360px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
}

.cdek-city-widget__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.9375rem;
  color: #111827;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s;
  gap: 0.75rem;
}

.cdek-city-widget__item-name {
  flex: 1;
  min-width: 0;
}

.cdek-city-widget__item-code {
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}

.cdek-city-widget__item:hover {
  background: #f3f4f6;
}

.cdek-city-widget__empty {
  padding: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.cdek-city-widget__error {
  margin: 0.375rem 0 0;
  font-size: 0.8125rem;
  color: #dc2626;
}
</style>
