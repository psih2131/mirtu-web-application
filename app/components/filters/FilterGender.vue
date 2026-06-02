<template>
  <div class="category-page__filter" :class="{ 'category-page__filter--open': isOpen }">
    <button type="button" class="category-page__filter-head" @click="toggle">
      <span>Пол
        <!-- <span class="filter-gender__count">({{ genders.length }})</span> -->
      </span>
      <span class="category-page__filter-chevron" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z" fill="currentColor"/>
        </svg>
      </span>
    </button>
    <Collapse :when="isOpen" class="category-page__collapse">
      <div class="category-page__filter-body">
        <label
          v-for="gender in genders"
          :key="gender.name"
          class="category-page__checkbox"
        >
          <input
            type="checkbox"
            :value="gender.name"
            :checked="selectedNames.includes(gender.name)"
            @change="(e) => onToggle(gender.name, e.target.checked)"
          >
          <span>{{ gender.name ? gender.name.charAt(0).toUpperCase() + gender.name.slice(1).toLowerCase() : '' }}</span>
          <span v-if="gender.count != null" class="filter-gender__count-inline">({{ gender.count }})</span>
        </label>
      </div>
    </Collapse>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Collapse } from 'vue-collapsed'

const props = defineProps({
  genders: {
    type: Array,
    default: () => [],
  },
  open: {
    type: Boolean,
    default: true,
  },
  collapseKey: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.open)
const selectedNames = ref([...props.modelValue])

function toggle() {
  isOpen.value = !isOpen.value
}

function onToggle(name, checked) {
  if (checked) {
    selectedNames.value = [...selectedNames.value, name]
  } else {
    selectedNames.value = selectedNames.value.filter((x) => x !== name)
  }
  emit('update:modelValue', [...selectedNames.value])
}

watch(
  () => props.genders,
  () => {
    selectedNames.value = selectedNames.value.filter((name) =>
      props.genders.some((g) => g.name === name)
    )
    emit('update:modelValue', [...selectedNames.value])
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (val) => {
    selectedNames.value = [...(val || [])]
  },
  { deep: true }
)

watch(
  () => props.collapseKey,
  () => {
    isOpen.value = false
  }
)
</script>

<style scoped>
.filter-gender__count {
  color: #9ca3af;
}

.filter-gender__count-inline {
  margin-left: 0.25rem;
  font-size: 0.8125rem;
  color: #9ca3af;
}
</style>
