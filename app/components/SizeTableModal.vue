<template>
  <Transition name="size-table">
    <div
      v-if="modelValue"
      class="size-table-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Таблица размеров"
    >
      <div class="size-table-modal__overlay" aria-hidden="true" @click="$emit('update:modelValue', false)" />
      <div class="size-table-modal__panel">
        <div class="size-table-modal__head">
          <h2 class="size-table-modal__title">Таблица размеров</h2>
          <button
            type="button"
            class="size-table-modal__close"
            aria-label="Закрыть"
            @click="$emit('update:modelValue', false)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="size-table-modal__body">
          <table class="size-table-modal__table">
            <thead>
              <tr>
                <th v-for="(key, i) in tableHeaders" :key="i" class="size-table-modal__th">{{ key }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ri in tableRowIndices" :key="ri" class="size-table-modal__tr">
                <td v-for="h in tableHeaders" :key="h" class="size-table-modal__td">{{ getCellValue(ri, h) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  sizeTable: {
    type: [Object, Array],
    default: () => ({}),
  },
})

/** Объект { EU: [...], JP: [...], ... } — ключи = заголовки, значения = столбцы */
const tableHeaders = computed(() => {
  const data = props.sizeTable
  if (!data || typeof data !== 'object') return []
  if (Array.isArray(data) && !data.length) return []
  const keys = Object.keys(data)
  if (!keys.length) return []
  return keys
})

const rowCount = computed(() => {
  const data = props.sizeTable
  if (!data || typeof data !== 'object') return 0
  const keys = Object.keys(data)
  if (!keys.length) return 0
  const maxLen = Math.max(...keys.map((k) => (Array.isArray(data[k]) ? data[k].length : 0)))
  return maxLen
})

const tableRowIndices = computed(() => Array.from({ length: rowCount.value }, (_, i) => i))

function getCellValue(rowIndex, headerKey) {
  const data = props.sizeTable
  const col = data?.[headerKey]
  if (!Array.isArray(col)) return '—'
  const val = col[rowIndex]
  return val !== undefined && val !== null && val !== '' ? String(val) : '—'
}
</script>

