// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // Nuxt 3 uses app.head instead of head
  app: {
    head: {
      titleTemplate: '%s - VRChat Event Calendar Viewer',
      title: 'VRChat Event Calendar Viewer',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'VRChatで行われるイベント検索サイトです．イベントをジャンルやキーワードで検索できます．',
        },
        {
          property: 'og:site_name',
          content: 'VRChat Event Calendar Viewer',
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: 'https://vrchat-eventcalendar-viewer.server-on.net/',
        },
        {
          property: 'og:title',
          content: 'VRChat Event Calendar Viewer',
        },
        {
          property: 'og:description',
          content:
            'VRChatで行われるイベント検索サイトです．イベントをジャンルやキーワードで検索できます．',
        },
        {
          property: 'og:image',
          content:
            'https://vrchat-eventcalendar-viewer.server-on.net/ogp/default.png',
        },
        { name: 'twitter:card', content: 'summary' }, // twitterの画像サイズ，画像と説明が横並びのタイプに設定
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Global CSS
  css: ['@mdi/font/css/materialdesignicons.css'],

  // Nuxt 3 modules (buildModules are now part of modules)
  modules: ['nuxt-gtag'],

  // Build modules
  build: {
    transpile: ['vuetify'],
  },

  // Google gtag (GA4)
  gtag: {
    id: 'G-XXXXXXXXXX', // Replace with your GA4 measurement ID
    config: {
      anonymize_ip: true,
      send_page_view: false,
    },
  },

  // Runtime config (replaces publicRuntimeConfig)
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:8000/index.php'
          : 'https://api.vrchat-eventcalendar-viewer.server-on.net/index.php',
      apiSearchCall: '/search',
      apiNowCall: '/now',
      apiEventCall: '/event',
    },
  },

  // TypeScript configuration
  typescript: {
    typeCheck: true,
    strict: true,
  },

  // Nitro configuration (server)
  nitro: {
    preset: 'node-server',
  },

  // Vite configuration
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  // Auto import components
  components: true,

  devtools: { enabled: true },
})
