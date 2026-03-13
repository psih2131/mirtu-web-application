// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,
  css: ['~/assets/scss/main.scss'],

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
    public: {
      apiUrl: '', // overridden by NUXT_PUBLIC_API_URL from .env
    },
  },

  modules: [// другие модули
  '@pinia/nuxt', 'nuxt-swiper'],
})