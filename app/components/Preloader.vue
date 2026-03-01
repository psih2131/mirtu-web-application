<template>
  <Teleport to="body">
    <div v-if="preloaderVisible" class="preloader">
      <div class="preloader__spinner" />
    </div>
  </Teleport>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const { preloaderVisible } = storeToRefs(uiStore)
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
}

.preloader__spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #111827;
  border-radius: 50%;
  animation: preloader-spin 0.8s linear infinite;
}

@keyframes preloader-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
