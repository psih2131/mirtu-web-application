// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,
  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },

      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon_current.ico' },
      ],

    }
  },
  

  
  vite: {
    server: {
      allowedHosts: ['unsolacing-sharee-appointable.ngrok-free.dev'],
      hmr: {
        port: 0, // случайный свободный порт при каждом запуске
      },
    },
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/vars" as *;
          `
        }
      }
    },
  },

  runtimeConfig: {
    cdecAccountId: process.env.NUXT_CDEC_ACCOUNT_ID || '',
    cdecApiKey: process.env.NUXT_SECRET_CDEK_API_KEY || '',
    cdecApiUrl: process.env.NUXT_PUBLIC_CDEK_API_URL || '',

    berekePaymentUrl: process.env.NUXT_BEREKE_PAYMENT_URL || '',
    berekePaymentLogin: process.env.NUXT_BEREKE_PAYMENT_LOGIN || '',
    berekePaymentPassword: process.env.NUXT_BEREKE_PAYMENT_PASSWORD || '',

    public: {
      apiUrl: '', // overridden by NUXT_PUBLIC_API_URL from .env
    },

    
  },

  modules: [// другие модули
  '@pinia/nuxt', 'nuxt-swiper'],
})