<template>
  <div v-if="contactItems.length" class="contact-widget" :class="{ 'contact-widget--open': isOpen }">
    <div class="contact-widget__inner">
      <div class="contact-widget__menu" :aria-hidden="!isOpen">
        <a
          v-for="(item, index) in contactItems"
          :key="item.id"
          :href="item.href"
          class="contact-widget__link"
          :class="{ 'contact-widget__link--visible': isOpen }"
          :style="{ '--i': index }"
          :aria-label="item.label"
          :tabindex="isOpen ? 0 : -1"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          @click="isOpen = false"
        >
          <span class="contact-widget__icon" v-html="item.icon" />
        </a>
      </div>

      <button
        type="button"
        class="contact-widget__toggle"
        :aria-label="isOpen ? 'Закрыть контакты' : 'Открыть контакты'"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="contact-widget__toggle-pulse" aria-hidden="true" />
        <span class="contact-widget__toggle-pulse contact-widget__toggle-pulse--delay" aria-hidden="true" />
        <span class="contact-widget__toggle-icon" aria-hidden="true">
          <svg v-if="!isOpen" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 3C8.03 3 4 6.58 4 11.2C4 13.45 5.03 15.45 6.7 16.85L5.5 22.5L10.9 20.95C11.85 21.28 12.9 21.45 14 21.45C18.97 21.45 23 17.87 23 13.25C23 8.63 18.97 3 13 3Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
            />
            <circle cx="9.5" cy="12.5" r="1.1" fill="currentColor" />
            <circle cx="13" cy="12.5" r="1.1" fill="currentColor" />
            <circle cx="16.5" cy="12.5" r="1.1" fill="currentColor" />
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInfoStore } from '@/stores/info'

const props = defineProps({
  dataContacts: {
    type: Object,
    default: () => ({}),
  },
})

const infoStore = useInfoStore()
const isOpen = ref(false)

const ICONS = {
  phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 4.5H9.1C9.6 4.5 10.03 4.83 10.14 5.27L10.86 8.23C10.96 8.63 10.79 9.05 10.45 9.27L8.9 10.2C10.07 12.39 11.61 13.93 13.8 15.1L14.73 13.55C14.95 13.21 15.37 13.04 15.77 13.14L18.73 13.86C19.17 13.97 19.5 14.4 19.5 14.9V17.5C19.5 18.05 19.05 18.5 18.5 18.5C10.94 18.5 4.5 12.06 4.5 4.5C4.5 3.95 4.95 3.5 5.5 3.5H6.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  email: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H5.5C4.67 18 4 17.33 4 16.5V7.5Z" stroke="currentColor" stroke-width="1.6"/><path d="M5 8L12 13L19 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  whatsapp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="currentColor"/></svg>`,
  telegram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.7 4.3L3.8 11.1C2.7 11.6 2.75 12.4 3.6 12.7L8.1 14.1L17.5 7.5C17.9 7.2 18.3 7.35 18 7.7L10.4 14.8V14.8L10.4 19.1C10.4 19.7 10.8 19.9 11.3 19.6L14.1 17.5L18.6 20.5C19.5 21 20.2 20.6 20.5 19.6L22.9 5.9C23.3 4.7 22.5 4 20.7 4.3Z" fill="currentColor"/></svg>`,
  instagram: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>`,
}

const contactItems = computed(() => {
  const items = []
  const phone = props.dataContacts?.phone_contact?.replace(/\s/g, '')
  const email = props.dataContacts?.email_contact?.replace(/\s/g, '') || infoStore.supportEmail

  if (phone) {
    items.push({ id: 'phone', href: `tel:${phone}`, label: 'Телефон', icon: ICONS.phone, external: false })
  }
  if (email) {
    items.push({ id: 'email', href: `mailto:${email}`, label: 'Почта', icon: ICONS.email, external: false })
  }
  if (infoStore.whatsappLinkFooter) {
    items.push({ id: 'whatsapp', href: infoStore.whatsappLinkFooter, label: 'WhatsApp', icon: ICONS.whatsapp, external: true })
  }
  if (infoStore.telegramLinkFooter) {
    items.push({ id: 'telegram', href: infoStore.telegramLinkFooter, label: 'Telegram', icon: ICONS.telegram, external: true })
  }
  if (infoStore.instagramLinkFooter) {
    items.push({ id: 'instagram', href: infoStore.instagramLinkFooter, label: 'Instagram', icon: ICONS.instagram, external: true })
  }

  return items
})
</script>
