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
                <table class="user-cabinet-order__items-table">
                  <thead>
                    <tr>
                      <th>Товар</th>
                      <th>Артикул</th>
                      <th>Кол-во</th>
                      <th>Цена</th>
                      <th>Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in (order.items || [])" :key="item.id ?? item.sku_id_poizon ?? idx">
                      <td>
                        <NuxtLink :to="`/products/${item.sku_id_poizon}`" class="user-cabinet-order__item-link">
                          <img v-if="item.image_url" :src="item.image_url" :alt="item.title" class="user-cabinet-order__item-img">
                          <span class="user-cabinet-order__item-title">{{ item.title }}</span>
                        </NuxtLink>
                      </td>
                      <td>{{ item.article || '—' }}</td>
                      <td>{{ item.quantity || 1 }}</td>
                      <td>{{ formatPrice(item.price_amount) }} {{ item.currency_symbol || '₸' }}</td>
                      <td>{{ formatPrice(itemTotal(item)) }} {{ item.currency_symbol || '₸' }}</td>
                    </tr>
                  </tbody>
                </table>
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

<style scoped lang="scss">
.user-cabinet-order__error {
  padding: 2rem;
  background: rgba(239, 68, 68, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #dc2626;
  font-size: 1rem;
  font-weight: 500;
}

.user-cabinet-order__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.user-cabinet-order__title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e3a5f;
}

.user-cabinet-order__badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;

  &--success {
    background: rgba(34, 197, 94, 0.12);
    color: #16a34a;
  }

  &--warning {
    background: rgba(234, 179, 8, 0.14);
    color: #ca8a04;
  }

  &--danger {
    background: rgba(239, 68, 68, 0.1);
    color: #b91c1c;
  }

  &--neutral {
    background: rgba(107, 114, 128, 0.12);
    color: #4b5563;
  }
}

.user-cabinet-order__card {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 2px 12px rgba(30, 58, 95, 0.06);
  border: 1px solid rgba(30, 58, 95, 0.06);
  margin-bottom: 1.5rem;
}

.user-cabinet-order__card-title {
  margin: 0 0 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
}

.user-cabinet-order__row {
  display: flex;
  gap: 1rem;
  padding: 12px 0;
  border-bottom: 1px solid #eef1f5;

  &:last-child {
    border-bottom: none;
  }

  &--total {
    border-top: 2px solid #e5e7eb;
    margin-top: 12px;
    padding-top: 18px;
    font-weight: 600;
    font-size: 1.0625rem;

    .user-cabinet-order__value {
      color: #1e3a5f;
      font-size: 1.125rem;
    }
  }
}

.user-cabinet-order__label {
  min-width: 160px;
  color: #6b7280;
  font-size: 0.9375rem;
}

.user-cabinet-order__value {
  flex: 1;
  color: #1e3a5f;
  font-weight: 500;

  &--discount {
    color: #059669;
  }
}

.user-cabinet-order__value--discount {
  color: #059669;
  font-weight: 600;
}

.user-cabinet-order__products {
  margin-bottom: 1.5rem;
}

.user-cabinet-order__products-title {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
}

.user-cabinet-order__items-wrap {
  overflow-x: auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(30, 58, 95, 0.06);
  border: 1px solid rgba(30, 58, 95, 0.06);
}

.user-cabinet-order__items-table {
  width: 100%;
  border-collapse: collapse;
}

.user-cabinet-order__items-table th,
.user-cabinet-order__items-table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid #eef1f5;
}

.user-cabinet-order__items-table th {
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
  background: #f8fafc;
}

.user-cabinet-order__items-table tr:last-child td {
  border-bottom: none;
}

.user-cabinet-order__items-table tbody tr:hover {
  background: #fafbfc;
}

.user-cabinet-order__item-link {
  display: flex;
  align-items: center;
  gap: 14px;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;

  &:hover .user-cabinet-order__item-title {
    color: #1e3a5f;
    text-decoration: underline;
  }
}

.user-cabinet-order__item-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  background: #f3f4f6;
}

.user-cabinet-order__item-title {
  font-size: 0.9375rem;
  color: #374151;
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.2s;
}

.user-cabinet-order__empty {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: #6b7280;
  background: linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%);
  border-radius: 12px;
}

.user-cabinet-order__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 20px;
  color: #1e3a5f;
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  background: #fff;
  border: 1px solid rgba(30, 58, 95, 0.15);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: rgba(30, 58, 95, 0.25);
    box-shadow: 0 2px 8px rgba(30, 58, 95, 0.1);
  }
}
</style>
