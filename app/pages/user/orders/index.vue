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
              <div class="user-cabinet-orders__header">
                <div class="user-cabinet-orders__col user-cabinet-orders__col--id">№ заказа</div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--date">Дата</div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--status">Статус</div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--sum">Сумма</div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--delivery">Доставка</div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--arrow"></div>
              </div>
              <div
                v-for="o in orders"
                :key="o.id"
                class="user-cabinet-orders__row"
                @click="navigateTo(`/user/orders/${o.id}`)"
              >
                <div class="user-cabinet-orders__col user-cabinet-orders__col--id">
                  <span class="user-cabinet-orders__order-num">#{{ o.id }}</span>
                </div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--date">
                  <span class="user-cabinet-orders__date">{{ formatDate(o.created_at) }}</span>
                </div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--status">
                  <span class="user-cabinet-orders__badge" :class="`user-cabinet-orders__badge--${getStatusVariant(o.status)}`">
                    {{ o.status }}
                  </span>
                </div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--sum">
                  <span class="user-cabinet-orders__sum">{{ formatPrice(o.payment_amount_kzt || o.amount) }} {{ o.currency_symbol || '₸' }}</span>
                </div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--delivery">
                  <span class="user-cabinet-orders__delivery">{{ o.shipping_method === 'CDEK' ? 'CDEK' : o.shipping_method === 'SELF_PICKUP' ? 'Самовывоз' : o.shipping_method }}</span>
                </div>
                <div class="user-cabinet-orders__col user-cabinet-orders__col--arrow">→</div>
              </div>
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

