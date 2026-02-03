<template>
  <div class="price-range">
    <div class="price-range__inputs">
      <div class="price-range__input-group">
        <span class="price-range__label">От</span>
        <div class="price-range__input-wrap">
          <input
            v-model.number="minInput"
            type="number"
            class="price-range__input"
            :min="min"
            :max="maxInput"
            :step="step"
          >
          <span class="price-range__currency">₸</span>
        </div>
      </div>
      <div class="price-range__input-group">
        <span class="price-range__label">До</span>
        <div class="price-range__input-wrap">
          <input
            v-model.number="maxInput"
            type="number"
            class="price-range__input"
            :min="minInput"
            :max="max"
            :step="step"
          >
          <span class="price-range__currency">₸</span>
        </div>
      </div>
    </div>

    <div class="price-range__slider">
      <div class="price-range__track">
        <div class="price-range__track-fill" :style="fillStyle" />
      </div>
      <input
        v-model.number="minInput"
        type="range"
        class="price-range__range price-range__range--min"
        :min="min"
        :max="max"
        :step="step"
      >
      <input
        v-model.number="maxInput"
        type="range"
        class="price-range__range price-range__range--max"
        :min="min"
        :max="max"
        :step="step"
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [0, 150000],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 150000,
  },
  step: {
    type: Number,
    default: 1000,
  },
})

const emit = defineEmits(['update:modelValue'])

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const minInput = computed({
  get: () => innerValue.value[0],
  set: (val) => {
    const safe = normalizeNumber(val, props.min)
    const clamped = Math.min(Math.max(safe, props.min), innerValue.value[1])
    innerValue.value = [clamped, innerValue.value[1]]
  },
})

const maxInput = computed({
  get: () => innerValue.value[1],
  set: (val) => {
    const safe = normalizeNumber(val, props.max)
    const clamped = Math.max(Math.min(safe, props.max), innerValue.value[0])
    innerValue.value = [innerValue.value[0], clamped]
  },
})

const fillStyle = computed(() => {
  const [from, to] = innerValue.value
  const range = props.max - props.min || 1
  const start = ((from - props.min) / range) * 100
  const end = ((to - props.min) / range) * 100
  return {
    left: `${start}%`,
    width: `${Math.max(end - start, 0)}%`,
  }
})

function normalizeNumber(val, fallback) {
  const num = Number(val)
  return Number.isFinite(num) ? num : fallback
}
</script>

