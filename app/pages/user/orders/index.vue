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
        <section class="user-cabinet-orders">
          <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <NuxtLink to="/user" class="category-page__breadcrumb-link">Личный кабинет</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <span class="category-page__breadcrumb-current">Заказы</span>
          </nav>
          <h1 class="category-page__title">Мои заказы</h1>

          <div class="user-cabinet-orders__content">
            <p v-if="!orders?.length" class="user-cabinet-orders__empty">Список заказов пуст</p>
            <div v-else class="user-cabinet-orders__table-wrap">
              <table class="user-cabinet-orders__table">
                <thead>
                  <tr>
                    <th>№ заказа</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Сумма</th>
                    <th>Доставка</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="o in orders"
                    :key="o.id"
                    class="user-cabinet-orders__row"
                    @click="navigateTo(`/user/orders/${o.id}`)"
                  >
                    <td><span class="user-cabinet-orders__order-num">#{{ o.id }}</span></td>
                    <td><span class="user-cabinet-orders__date">{{ formatDate(o.created_at) }}</span></td>
                    <td>
                      <span class="user-cabinet-orders__badge" :class="`user-cabinet-orders__badge--${getStatusVariant(o.status)}`">
                        {{ o.status }}
                      </span>
                    </td>
                    <td><span class="user-cabinet-orders__sum">{{ formatPrice(o.payment_amount_kzt || o.amount) }} {{ o.currency_symbol || '₸' }}</span></td>
                    <td><span class="user-cabinet-orders__delivery">{{ o.shipping_method === 'CDEK' ? 'CDEK' : o.shipping_method === 'SELF_PICKUP' ? 'Самовывоз' : o.shipping_method }}</span></td>
                    <td class="user-cabinet-orders__arrow">→</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const uiStore = useUiStore()
const apiBase = useRuntimeConfig().public?.apiUrl?.endsWith('/api')
  ? useRuntimeConfig().public.apiUrl
  : (useRuntimeConfig().public?.apiUrl?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string } | null>(null)
const orders = ref<any[]>([])
const isLoaded = ref(false)

function formatPrice(v: string | number) {
  return Number(v || 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function formatDate(iso: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
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
    const data = await $fetch(`${apiBase}/order`, { method: 'GET', credentials: 'include' }).catch(() => ({ orders: [] }))
    orders.value = (data as any)?.orders ?? []
  } catch {
    orders.value = []
  } finally {
    isLoaded.value = true
    uiStore.hidePreloader()
  }
})
</script>

<style scoped lang="scss">
.user-cabinet-orders__content {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 2px 12px rgba(30, 58, 95, 0.06);
  border: 1px solid rgba(30, 58, 95, 0.06);
}

.user-cabinet-orders__empty {
  margin: 0;
  padding: 3rem 2rem;
  color: #6b7280;
  font-size: 1.0625rem;
  text-align: center;
  background: linear-gradient(135deg, #fafbfc 0%, #f3f4f6 100%);
  border-radius: 12px;
}

.user-cabinet-orders__table-wrap {
  overflow-x: auto;
  border-radius: 12px;
}

.user-cabinet-orders__table {
  width: 100%;
  border-collapse: collapse;
}

.user-cabinet-orders__table th,
.user-cabinet-orders__table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid #eef1f5;
}

.user-cabinet-orders__table th {
  font-weight: 600;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #6b7280;
  background: #f8fafc;
}

.user-cabinet-orders__table td:first-child {
  padding-left: 20px;
}

.user-cabinet-orders__row {
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &:last-child td {
    border-bottom: none;
  }
}

.user-cabinet-orders__order-num {
  color: #1e3a5f;
  font-weight: 600;
  font-size: 0.9375rem;
}

.user-cabinet-orders__date {
  color: #4b5563;
  font-size: 0.9375rem;
}

.user-cabinet-orders__sum {
  font-weight: 600;
  color: #1e3a5f;
  font-size: 0.9375rem;
}

.user-cabinet-orders__delivery {
  color: #4b5563;
  font-size: 0.9375rem;
}

.user-cabinet-orders__arrow {
  color: #9ca3af;
  font-size: 1.125rem;
  width: 40px;
  text-align: right;
  padding-right: 20px;
}

.user-cabinet-orders__badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8125rem;
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
</style>
