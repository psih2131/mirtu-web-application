<template>
  <div class="order-page">
    <div class="container">
      <!-- title -->
      <h1 v-if="!createdOrder" class="order-page__title">Оформление заказа</h1>

      <!-- alert for auth --> 
      <OrderAlertAuth v-if="error === 'auth'" @auth-click="onAuthClick" />

      <!-- alert for error -->  
      <OrderAlertError v-else-if="error === 'other'" />

      <!-- alert for empty cart -->
      <OrderAlertEmpty v-else-if="!cartData?.items?.length && cartData !== null" />

      <!-- layout for success -->
      <OrderSuccess v-else-if="createdOrder" :key="createdOrder?.id" :order="createdOrder" :payMethod="paymentMethod" />

      <!-- layout for order -->
      <div v-else class="order-page__layout">
        <main class="order-page__main">
          <section class="order-page__section" v-if="cartData?.items?.length">
            <h2 class="order-page__section-title">Ваш заказ</h2>
            <div class="order-page__products">
              <OrderProcuctCard v-for="value in cartData.items" :key="value.id" :item="value" />
            </div>
          </section>

          <section class="order-page__section order-page__section--shipping">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">1</span>
              <h2 class="order-page__section-title">Выбрать способ получения</h2>
            </div>
            <div class="order-page__options">
              <button type="button" class="order-page__option" :class="{ 'order-page__option--active': form.shippingMethod === 'CDEK' }" @click="form.shippingMethod = 'CDEK'">
                <span class="order-page__option-title">CDEK</span>
                <span class="order-page__option-desc">Доставка по Казахстану</span>
              </button>
              <button type="button" class="order-page__option" :class="{ 'order-page__option--active': form.shippingMethod === 'SELF_PICKUP' }" @click="form.shippingMethod = 'SELF_PICKUP'">
                <span class="order-page__option-title">Самовывоз</span>
                <span class="order-page__option-desc">Забрать в пункте выдачи</span>
              </button>
            </div>

            <div v-if="form.shippingMethod === 'CDEK'" class="order-page__form">
              <div class="order-page__form-row">
                <label class="order-page__label">Способ доставки CDEK</label>
                <div class="order-page__options order-page__options--delivery">
                  <button
                    type="button"
                    class="order-page__option"
                    :class="{ 'order-page__option--active': form.cdekDeliveryType === 'COURIER' }"
                    @click="form.cdekDeliveryType = 'COURIER'"
                  >
                    <span class="order-page__option-title">Курьер</span>
                    <span class="order-page__option-desc">Доставка по адресу</span>
                  </button>
                  <button
                    type="button"
                    class="order-page__option"
                    :class="{ 'order-page__option--active': form.cdekDeliveryType === 'PICKUP_POINT' }"
                    @click="form.cdekDeliveryType = 'PICKUP_POINT'"
                  >
                    <span class="order-page__option-title">Пункт выдачи</span>
                    <span class="order-page__option-desc">Забрать в ПВЗ CDEK</span>
                  </button>
                </div>
              </div>
              <div class="order-page__form-row">
                <label class="order-page__label">Город (CDEK) <span class="order-page__required">*</span></label>
                <OrderCdekCityWidget v-model="form.cdekCity" />
              </div>
              <div v-if="form.cdekDeliveryType === 'COURIER'" class="order-page__form-row">
                <label class="order-page__label">Адрес <span class="order-page__required">*</span></label>
                <input v-model="form.address" type="text" class="order-page__input order-page__input--wide" placeholder="Улица, дом, квартира" />
              </div>
              <div v-if="form.cdekDeliveryType === 'PICKUP_POINT'" class="order-page__form-row">
                <label class="order-page__label">Адрес пункта выдачи <span class="order-page__required">*</span></label>
                <input v-model="form.cdekPickupPointAddress" type="text" class="order-page__input order-page__input--wide" placeholder="Адрес ПВЗ CDEK" />
              </div>
            </div>

            <div v-if="form.shippingMethod === 'SELF_PICKUP'" class="order-page__form">
              <div class="order-page__form-row">
                <label class="order-page__label">Адрес самовывоза <span class="order-page__required">*</span></label>
                <select v-model="form.pickupAddressId" class="order-page__input order-page__input--wide">
                  <option :value="null">Выберите адрес</option>
                  <option v-for="addr in pickupAddresses" :key="addr.id" :value="addr.id">
                    {{ addr.city }}, {{ addr.street }} {{ addr.building }}
                  </option>
                </select>
              </div>
            </div>

            <div class="order-page__form">
              <div class="order-page__form-row order-page__form-row--delivery-options">
                <label class="order-page__label">Опция доставки</label>
                <div class="order-page__options order-page__options--delivery">
                  <button
                    v-for="opt in (deliveryMethods?.delivery_options || [])"
                    :key="opt.method"
                    type="button"
                    class="order-page__option"
                    :class="{ 'order-page__option--active': form.deliveryOption === opt.method }"
                    @click="form.deliveryOption = opt.method"
                  >
                    <span class="order-page__option-title">{{ { FAST: 'Быстрая', STANDARD: 'Стандартная' }[opt.method] || opt.method }}</span>
                    <span class="order-page__option-desc">{{ opt.day_min }}–{{ opt.day_max }} дн.</span>
                    <span
                      class="order-page__option-price"
                      :class="{ 'order-page__option-price--free': Number(opt.price) === 0 }"
                    >
                      {{ Number(opt.price) > 0 ? `${formatPrice(opt.price)} ${opt.currency_symbol || opt.currency || '₸'}` : 'Бесплатно' }}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section class="order-page__section">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">2</span>
              <h2 class="order-page__section-title">Контактные данные</h2>
            </div>
            <div class="order-page__form">
              <div class="order-page__form-row">
                <label class="order-page__label">Фамилия <span class="order-page__required">*</span></label>
                <input v-model="form.lastName" type="text" class="order-page__input order-page__input--wide" placeholder="Иванов" />
              </div>
              <div class="order-page__form-row">
                <label class="order-page__label">Имя <span class="order-page__required">*</span></label>
                <input v-model="form.firstName" type="text" class="order-page__input order-page__input--wide" placeholder="Иван" />
              </div>
              <div class="order-page__form-row">
                <label class="order-page__label">Отчество</label>
                <input v-model="form.middleName" type="text" class="order-page__input order-page__input--wide" placeholder="Иванович" />
              </div>
              <div class="order-page__form-row">
                <label class="order-page__label">Телефон для связи <span class="order-page__required">*</span></label>
                <input v-model="form.contactPhone" type="tel" inputmode="numeric" class="order-page__input order-page__input--wide" placeholder="77001234567" @input="form.contactPhone = String(form.contactPhone || '').replace(/\D/g, '')" />
              </div>
            </div>
          </section>

          <section class="order-page__section">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">3</span>
              <h2 class="order-page__section-title">Промокод</h2>
            </div>
            <div class="order-page__form">
              <input v-model="form.promoCode" type="text" maxlength="20" class="order-page__input order-page__input--wide" placeholder="Введите промокод (опционально)" />
            </div>
          </section>

          <section class="order-page__section">
            <div class="order-page__step-head">
              <span class="order-page__step-badge">4</span>
              <h2 class="order-page__section-title">Способ оплаты</h2>
            </div>
            <!-- payment methods -->
            <OrderPaymentMethods v-model:payment-method="paymentMethod" />
            <!-- {{ 'paymentMethod: ' + paymentMethod }} -->
          </section>
        </main>

        <aside class="order-page__summary">
          <div class="order-page__summary-inner">
            <div class="order-page__summary-row">
              <span class="order-page__summary-label">Товаров, {{ cartItemsCount }} шт.:</span>
              <span class="order-page__summary-value">{{ formatPrice(cartSubtotal) }} {{ summarySymbol }}</span>
            </div>
            <div v-if="discountApplied > 0" class="order-page__summary-row order-page__summary-row--benefit">
              <span class="order-page__summary-label">Выгода:</span>
              <span class="order-page__summary-value">−{{ formatPrice(discountApplied) }} {{ summarySymbol }}</span>
            </div>
            <div class="order-page__summary-row order-page__summary-row--total">
              <span class="order-page__summary-label">Итого:</span>
              <span class="order-page__summary-value">{{ formatPrice(totalToPay) }} {{ summarySymbol }}</span>
            </div>
            <p v-if="submitError" class="order-page__submit-error">{{ submitError }}</p>
            <button type="button" class="order-page__submit" :disabled="isSubmitting" @click="submitOrder">
              {{ isSubmitting ? 'Отправка...' : 'Оформить заказ' }}
            </button>
          </div>
        </aside>
      </div>

      
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' })

//imports
import { useModalStore } from '@/stores/modal'

import { useUiStore } from '@/stores/ui'


import OrderProcuctCard from '@/components/cards/OrderProcuctCard.vue'

import OrderPaymentMethods from '@/components/order/OrderPaymentMethods.vue'



//data
const uiStore = useUiStore()

const cartData = ref(null)

const modalStore = useModalStore()

const error = ref(null)

const pickupAddresses = ref([])

const deliveryMethods = ref([])

const form = reactive({
  shippingMethod: 'CDEK',
  cdekDeliveryType: 'COURIER',
  address: '',
  cdekPickupPointAddress: '',
  cdekCity: null,
  deliveryOption: 'STANDARD',
  pickupAddressId: null,
  firstName: '',
  lastName: '',
  middleName: '',
  contactPhone: '',
  promoCode: '',
})

const paymentMethod = ref('KASPI')

const isSubmitting = ref(false)
const submitError = ref(null)
const createdOrder = ref(null)

const apiBase = useRuntimeConfig().public?.apiUrl?.endsWith('/api')
  ? useRuntimeConfig().public.apiUrl
  : (useRuntimeConfig().public?.apiUrl?.replace(/\/?$/, '') || '') + '/api'

const cartItemsCount = computed(() =>
  cartData.value?.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0
)
const cartSubtotal = computed(() =>
  cartData.value?.items?.reduce((s, i) => s + (Number(i.price_amount) || 0) * (i.quantity || 0), 0) || 0
)
const summarySymbol = computed(() => cartData.value?.items?.[0]?.currency_symbol || '₸')
const discountApplied = ref(0) // при применении промокода
const totalToPay = computed(() => cartSubtotal.value - discountApplied.value)

function formatPrice(v) {
  return Number(v || 0).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}



// получение корзины
async function fetchCart() {
  try {
    uiStore.showPreloader()
    const res = await fetch(`${apiBase}/cart`, { method: 'GET', credentials: 'include' })
    if (!res.ok) {
      error.value = res.status === 401 ? 'auth' : 'other'
      return
    }
    const data = await res.json()
    cartData.value = data
    await fetchPickupAddresses()
  } catch {
    error.value = 'other'
  }
}

// получение адресов самовывоза
async function fetchPickupAddresses() {
  try {
    const res = await fetch(`${apiBase}/order/pick-up-addresses`)
    if (!res.ok) {
      return
    }
    const data = await res.json()
    console.log('pick up:', res)
    console.log('delivery addresses pick up:', data)

    pickupAddresses.value = data

    fetchDeliveryMethods()

  } catch {
    console.error('pick up addresses error:', error)
  }
}


// получение методов доставки
async function fetchDeliveryMethods() {
  try {
    const res = await fetch(`${apiBase}/order/delivery-options`)
    console.log('delivery methods:', res)
    const data = await res.json()
    console.log('delivery methods:', data)
    deliveryMethods.value = data
  }
  catch(error) {
    console.error('delivery methods error:', error)
  }
  finally {
    uiStore.hidePreloader()
  }
}


// открываем модалку авторизации
function onAuthClick() {
  modalStore.openModal('auth')
}

// отправляем заказ
async function submitOrder() {
  submitError.value = null

  if (!form.contactPhone?.trim()) {
    submitError.value = 'Укажите телефон для связи'
    return
  }
  if (form.shippingMethod === 'CDEK') {
    if (!form.address?.trim()) {
      submitError.value = 'Укажите адрес доставки'
      return
    }
    if (!form.cdekCity?.code) {
      submitError.value = 'Выберите город CDEK'
      return
    }
  }
  if (form.shippingMethod === 'SELF_PICKUP' && !form.pickupAddressId) {
    submitError.value = 'Выберите адрес самовывоза'
    return
  }

  isSubmitting.value = true

  const apiOrderSelfFickup = '/order/self-pickup'
  const apiOrderCdekCourier = '/order/cdek/courier'
  const apiOrderCdekPickupPoint = '/order/cdek/pickup-point'

  const phone = form.contactPhone.replace(/\D/g, '').replace(/^8|^7/, '').slice(-10)
  const contactPhone = phone ? `+7${phone}` : form.contactPhone

  try {
    // самовывоз
    if (form.shippingMethod === 'SELF_PICKUP') {
      const res = await fetch(`${apiBase}${apiOrderSelfFickup}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          contact_phone: contactPhone,
          first_name: form.firstName,
          last_name: form.lastName,
          middle_name: form.middleName,
          pickup_address_id: form.pickupAddressId,
          currency: 'KZT',
          delivery_option_method: form.deliveryOption,
          promo_code: form.promoCode?.trim() || undefined,
          clear_cart: true,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        submitError.value = data.message || data.error || `Ошибка ${res.status}`
        return
      }

      const raw = await res.json()
      createdOrder.value = raw?.data ?? raw
    }

    // CDEK
    if (form.shippingMethod === 'CDEK') {
      // курьер
      if (form.cdekDeliveryType === 'COURIER') {
        const res = await fetch(`${apiBase}${apiOrderCdekCourier}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            contact_phone: contactPhone,
            first_name: form.firstName,
            last_name: form.lastName,
            middle_name: form.middleName,
            address: form.address,
            cdek_city_code: form.cdekCity.code,
            currency: 'KZT',
            delivery_option_method: form.deliveryOption,
            promo_code: form.promoCode?.trim() || undefined,
            clear_cart: true,
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          submitError.value = data.message || data.error || `Ошибка ${res.status}`
          return
        }

        const raw = await res.json()
        createdOrder.value = raw?.data ?? raw
        console.log('created order:', createdOrder.value)
      }

      // пункт выдачи
      if (form.cdekDeliveryType === 'PICKUP_POINT') {
        const res = await fetch(`${apiBase}${apiOrderCdekPickupPoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            contact_phone: contactPhone,
            first_name: form.firstName,
            last_name: form.lastName,
            middle_name: form.middleName,
            cdek_pickup_point_address: form.cdekPickupPointAddress,
            cdek_city_code: form.cdekCity.code,
            currency: 'KZT',
            delivery_option_method: form.deliveryOption,
            promo_code: form.promoCode?.trim() || undefined,
            clear_cart: true,
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          submitError.value = data.message || data.error || `Ошибка ${res.status}`
          return
        }

        const raw = await res.json()
        createdOrder.value = raw?.data ?? raw
        console.log('created order:', createdOrder.value)
      }
    }
  } catch (e) {
    console.error('submit order error:', e)
    submitError.value = 'Ошибка сети. Попробуйте позже.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchCart()
})
</script>
