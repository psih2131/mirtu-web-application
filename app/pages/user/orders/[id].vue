<template>
  <div v-if="!isLoaded" class="user-cabinet user-cabinet--loading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="user-cabinet">
    <div class="container">
      <aside class="user-cabinet__nav">
        <UserCabinetNav :user="user" active-item="orders" />
      </aside>

      <main class="user-cabinet__content">
        <section class="user-cabinet-order">
          <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <NuxtLink to="/user" class="category-page__breadcrumb-link">Личный кабинет</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <NuxtLink to="/user/orders" class="category-page__breadcrumb-link">Заказы</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <span class="category-page__breadcrumb-current">Заказ #{{ order?.id }}</span>
          </nav>

          <div v-if="!order" class="user-cabinet-order__error">
            Заказ не найден
          </div>

          <template v-else>
            <div class="user-cabinet-order__header">
              <h1 class="user-cabinet-order__title">Заказ #{{ order.id }}</h1>
              <span class="user-cabinet-order__badge" :class="`user-cabinet-order__badge--${getStatusVariant(order.status)}`">{{ order.status }}</span>
            </div>

            <div class="user-cabinet-order__card">
              <h3 class="user-cabinet-order__card-title">Детали заказа</h3>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Номер заказа</span>
                <span class="user-cabinet-order__value">#{{ order.id }}</span>
              </div>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Дата оформления</span>
                <span class="user-cabinet-order__value">{{ formatDate(order.created_at) }}</span>
              </div>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Адрес доставки:</span>
                <span class="user-cabinet-order__value">{{ order.address || '—' }}</span>
              </div>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Способ доставки:</span>
                <span class="user-cabinet-order__value">{{ order.shipping_method === 'CDEK' ? 'CDEK' : order.shipping_method === 'SELF_PICKUP' ? 'Самовывоз' : order.shipping_method || '—' }}</span>
              </div>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Опция доставки:</span>
                <span class="user-cabinet-order__value">{{ order.delivery_option_method === 'FAST' ? 'Быстрая' : order.delivery_option_method === 'STANDARD' ? 'Стандартная' : order.delivery_option_method || '—' }}</span>
              </div>
              <div v-if="order.promo_code_used" class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Промокод:</span>
                <span class="user-cabinet-order__value">{{ order.promo_code_used }}</span>
              </div>
              <div class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Валюта:</span>
                <span class="user-cabinet-order__value">{{ order.currency || 'KZT' }}</span>
              </div>
              <div v-if="hasDiscount" class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Сумма до скидки:</span>
                <span class="user-cabinet-order__value">
                  <s>{{ formatPrice(oldSum) }} {{ order.currency_symbol || '₸' }}</s>
                </span>
              </div>
              <div v-if="hasDiscount" class="user-cabinet-order__row">
                <span class="user-cabinet-order__label">Размер скидки:</span>
                <span class="user-cabinet-order__value user-cabinet-order__value--discount">−{{ formatPrice(order.discount_applied) }} {{ order.currency_symbol || '₸' }}</span>
              </div>
              <div class="user-cabinet-order__row user-cabinet-order__row--total">
                <span class="user-cabinet-order__label">Итого к оплате:</span>
                <span class="user-cabinet-order__value">{{ formatPrice(order.payment_amount_kzt || order.amount) }} {{ order.currency_symbol || '₸' }}</span>
              </div>
            </div>

            <div class="user-cabinet-order__products">
              <h3 class="user-cabinet-order__products-title">Товары в заказе ({{ (order.items || []).length }})</h3>
              <div v-if="order.items?.length" class="user-cabinet-order__items-wrap">
                <div class="user-cabinet-order__items-header">
                  <div class="user-cabinet-order__col user-cabinet-order__col--product">Товар</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--article">Артикул</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--qty">Кол-во</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--price">Цена</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--total">Сумма</div>
                </div>
                <div
                  v-for="(item, idx) in (order.items || [])"
                  :key="item.id ?? item.sku_id_poizon ?? idx"
                  class="user-cabinet-order__items-row"
                >
                  <div class="user-cabinet-order__col user-cabinet-order__col--product">
                    <NuxtLink :to="`/products/${item.sku_id_poizon}`" class="user-cabinet-order__item-link">
                      <img v-if="item.image_url" :src="item.image_url" :alt="item.title" class="user-cabinet-order__item-img">
                      <span class="user-cabinet-order__item-title">{{ item.title }}</span>
                    </NuxtLink>
                  </div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--article">{{ item.article || '—' }}</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--qty">{{ item.quantity || 1 }}</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--price">{{ formatPrice(item.price_amount) }} {{ item.currency_symbol || '₸' }}</div>
                  <div class="user-cabinet-order__col user-cabinet-order__col--total">{{ formatPrice(itemTotal(item)) }} {{ item.currency_symbol || '₸' }}</div>
                </div>
              </div>
              <p v-else class="user-cabinet-order__empty">В заказе нет товаров</p>
            </div>

            <NuxtLink to="/user/orders" class="user-cabinet-order__back">← К списку заказов</NuxtLink>
          </template>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const route = useRoute()
const uiStore = useUiStore()
const apiBase = useRuntimeConfig().public?.apiUrl?.endsWith('/api')
  ? useRuntimeConfig().public.apiUrl
  : (useRuntimeConfig().public?.apiUrl?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string } | null>(null)
const order = ref<any>(null)
const isLoaded = ref(false)

const hasDiscount = computed(() => {
  const d = Number(order.value?.discount_applied) || 0
  return d > 0
})

const oldSum = computed(() => {
  const current = Number(order.value?.payment_amount_kzt || order.value?.amount) || 0
  const discount = Number(order.value?.discount_applied) || 0
  return current + discount
})

function formatPrice(v: string | number) {
  return Number(v || 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function itemTotal(item: { price_amount?: string | number; quantity?: number }) {
  const price = Number(item?.price_amount) || 0
  const qty = item?.quantity || 1
  return price * qty
}

function getStatusVariant(status: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (!status) return 'neutral'
  const s = String(status).toLowerCase()
  // Red: cancelled, not paid in time, expired
  if (/отменен|отмена|cancel|просрочен|истёк|не оплачен в срок|expired|overdue/i.test(s)) return 'danger'
  // Green: confirmed, paid, delivered
  if (/подтверждён|оплачен|доставлен|выполнен|завершён/i.test(s)) return 'success'
  // Yellow: in progress, awaiting
  if (/процесс|ожидан|ожидает|оплат|в пути|сборка/i.test(s)) return 'warning'
  return 'neutral'
}

onMounted(async () => {
  uiStore.showPreloader()
  try {
    const meRes = await $fetch(`${apiBase}/auth/me`, { method: 'GET', credentials: 'include' }).catch(() => null)
    user.value = meRes as typeof user.value
    if (!user.value) {
      await navigateTo('/', { replace: true })
      return
    }
    const id = route.params.id
    if (!id) {
      order.value = null
      return
    }
    const data = await $fetch(`${apiBase}/order/${id}`, { method: 'GET', credentials: 'include' }).catch(() => null)
    order.value = data
  } catch {
    order.value = null
  } finally {
    isLoaded.value = true
    uiStore.hidePreloader()
  }
})
</script>
