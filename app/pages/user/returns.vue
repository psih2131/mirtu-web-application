<template>
  <div v-if="!isLoaded" class="user-cabinet user-cabinet--loading">
    <p>Загрузка...</p>
  </div>
  <div v-else class="user-cabinet">
    <div class="container">
      <aside class="user-cabinet__nav">
        <UserCabinetNav :user="user" active-item="returns" />
      </aside>

      <main class="user-cabinet__content">
        <section class="user-cabinet-returns">
          <nav class="category-page__breadcrumbs" aria-label="Хлебные крошки">
            <NuxtLink to="/" class="category-page__breadcrumb-link">Главная</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <NuxtLink to="/products" class="category-page__breadcrumb-link">Каталог</NuxtLink>
            <span class="category-page__breadcrumb-sep">›</span>
            <span class="category-page__breadcrumb-current">Возвраты</span>
          </nav>
          <h1 class="category-page__title">Возвраты</h1>

          <div class="user-cabinet-returns__content">
            <p class="user-cabinet-returns__text">
              Если вам нужно оформить возврат товара или у вас возникли вопросы по заказу, наши специалисты готовы помочь.
            </p>
            <p class="user-cabinet-returns__text">
              Возврат возможен в течение 14 дней с момента получения заказа при сохранении товарного вида и оригинальной упаковки.
            </p>
            <p class="user-cabinet-returns__tip">
              При оформлении заявки на возврат укажите, пожалуйста, ваш email или ID пользователя — это ускорит обслуживание.<br>
              Подробнее про возврат товара можно узнать <NuxtLink to="/supports/return-order" class="user-cabinet-returns__text-link">здесь</NuxtLink>.
            </p>

            <div class="user-cabinet-returns__buttons">
              <a v-if="infoStore?.supportEmail"
                :href="`mailto:${infoStore.supportEmail}?subject=Вопрос по возврату`"
                class="user-cabinet-returns__btn user-cabinet-returns__btn--support"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Связаться с техподдержкой</span>
              </a>
              <a
                v-if="infoStore?.supportTelegramLink"
                :href="infoStore.supportTelegramLink"
                target="_blank"
                rel="noopener noreferrer"
                class="user-cabinet-returns__btn user-cabinet-returns__btn--telegram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Написать в Telegram</span>
              </a>

              <a
                v-if="infoStore?.supportWhatsappLink"
                :href="infoStore.supportWhatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="user-cabinet-returns__btn user-cabinet-returns__btn--whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span>Написать в Whatsapp</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'
import { useInfoStore } from '@/stores/info'

const userStore = useUserStore()
const uiStore = useUiStore()
const infoStore = useInfoStore()

const apiUrlDomain = useRuntimeConfig().public.apiUrl
const apiBase = apiUrlDomain?.endsWith('/api') ? apiUrlDomain : (apiUrlDomain?.replace(/\/?$/, '') || '') + '/api'

const user = ref<{ id: string; email: string; name: string; phone?: string | null } | null>(null)
const isLoaded = ref(false)
const aboutData = ref<{ email_contact?: string; telegram_contact?: string } | null>(null)

const supportMailHref = computed(() => {
  const email = aboutData.value?.email_contact || aboutData.value?.email || 'support@mirtu.kz'
  return `mailto:${email}?subject=Вопрос по возврату`
})

const telegramLink = computed(() => {
  const tg = aboutData.value?.telegram_contact || ''
  if (!tg) return ''
  const cleaned = tg.replace(/^@/, '').trim()
  return cleaned ? `https://t.me/${cleaned}` : ''
})

onMounted(async () => {
  uiStore.showPreloader()
  try {
    const [meRes, aboutRes] = await Promise.all([
      $fetch(`${apiBase}/auth/me`, { method: 'GET', credentials: 'include' }).catch(() => null),
      $fetch(`${apiBase}/about`, { method: 'GET' }).catch(() => null),
    ])
    user.value = meRes as typeof user.value
    aboutData.value = aboutRes as typeof aboutData.value
    if (user.value) {
      userStore.changeUserName(user.value?.name || '')
      userStore.changeLocalstorageAuthStatus(true)
    } else {
      userStore.changeUserName(null)
      userStore.changeLocalstorageAuthStatus(false)
      user.value = null
      await navigateTo('/', { replace: true })
    }
  } catch {
    userStore.changeUserName(null)
    userStore.changeLocalstorageAuthStatus(false)
    user.value = null
    await navigateTo('/', { replace: true })
  } finally {
    isLoaded.value = true
    uiStore.hidePreloader()
  }
})
</script>


