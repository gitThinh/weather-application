// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    'nuxt-lodash',
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],

  // nuxt icon config
  icon: {
    componentName: "NuxtIcon",
    collections: ["typcn", "radix-icons"],
  },

  // dark and light UI config
  colorMode: {
    classSuffix: "",
  },

  // eslint config
  eslint: {
    config: {
      typescript: true,
    },
  },

  // lodash config
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"], // => stringToCamelCase
      ["kebabCase", "stringToKebab"], // => stringToKebab
      ["isDate", "isLodashDate"], // => _isLodashDate
    ],
  },

  // i18n config
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.json'
      },
      {
        code: 'vi',
        name: 'Tiếng Việt',
        iso: 'vi-VN',
        file: 'vi.json'
      },
    ],
    defaultLocale: 'vi', // default lang
    lazy: true, // only load file when request
    langDir: 'locales', // dir folder key trans
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // env variable
  runtimeConfig: {
    public: {
      api_key_weather: process.env.API_KEY_WEATHER,
    },
  },
})
