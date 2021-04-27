import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
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
        hid: 'description',
        name: 'description',
        content:
          'VRChatで行われるイベント検索サイトです．イベントをジャンルやキーワードで検索できます．',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'VRChat Event Calendar Viewer',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://vrchat-eventcalendar-viewer.server-on.net/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'VRChat Event Calendar Viewer',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'VRChatで行われるイベント検索サイトです．イベントをジャンルやキーワードで検索できます．',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://vrchat-eventcalendar-viewer.server-on.net/ogp/default.png',
      },
      { name: 'twitter:card', content: 'summary' }, //twitterの画像サイズ，画像と説明が横並びのタイプに設定
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/html_sanitize.ts',
    '~/plugins/auto_link.ts',
    '~/plugins/parse_genre.ts',
    '~/plugins/parse_platform.ts',
    '~/plugins/is_string.ts',
    '~/plugins/vuetify.ts',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // google analytics
    '@nuxtjs/google-analytics',
    // nuxt-compress
    'nuxt-compress',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    defaultAssets: {
      icons: false,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config: any, { isClient, _isServer }: any) {
      if (isClient) {
        config.node = {
          fs: 'empty',
        }
      }
    },
  },

  // typescript configuration
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },

  publicRuntimeConfig: {
    apiBaseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/index.php'
        : 'https://api.vrcec-viewer.rioil.dev/index.php',
    apiSearchCall: '/search',
    apiNowCall: '/now',
    apiEventCall: '/event',
  },

  // google analytics
  googleAnalytics: {
    id: 'UA-155323326-3',
  },
}
