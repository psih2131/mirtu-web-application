import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'mirtu_favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref<Record<string, object>>({})

  function load() {
    if (import.meta.server) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      items.value = raw ? JSON.parse(raw) : {}
    } catch {
      items.value = {}
    }
  }

  function getProductSpu(product: object): string {
    const p = product as Record<string, unknown>
    return String(p?.spu ?? p?.basicInfo?.spuPoizon ?? p?.displayInfo?.spuPoizon ?? '')
  }

  function isFavorite(spu: string | number): boolean {
    return String(spu) in items.value
  }

  function add(product: object) {
    const spu = getProductSpu(product)
    if (!spu) return
    const next = { ...items.value, [spu]: product }
    items.value = next
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  function remove(spu: string | number) {
    const key = String(spu)
    const next = { ...items.value }
    delete next[key]
    items.value = next
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  function toggle(product: object) {
    const spu = getProductSpu(product)
    if (!spu) return
    if (isFavorite(spu)) remove(spu)
    else add(product)
  }

  const list = computed(() => Object.values(items.value))

  return { items, list, load, isFavorite, add, remove, toggle, getProductSpu }
})
