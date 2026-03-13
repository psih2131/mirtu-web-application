<template>
  <Teleport to="body">
    <Transition name="preloader">
      <div v-if="preloaderVisible" class="preloader">
        <div class="preloader__spinner" />
      </div>
    </Transition>
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
  background: rgba(0, 0, 0, 0.4);
}

.preloader__spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: preloader-spin 0.8s linear infinite;
}

@keyframes preloader-spin {
  to {
    transform: rotate(360deg);
  }
}

.preloader-enter-active,
.preloader-leave-active {
  transition: opacity 0.2s ease;
}
.preloader-enter-from,
.preloader-leave-to {
  opacity: 0;
}
</style>
