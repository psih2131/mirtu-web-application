// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorMaxWorkers: true, // number of CPUs minus 1
    },
  },

  modules: [
    '@pinia/nuxt',
    // другие модули
  ],
})
