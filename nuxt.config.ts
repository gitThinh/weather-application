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
  ],
  icon: {
    componentName: "NuxtIcon",
    collections: ["typcn", "radix-icons"],
  },
  colorMode: {
    classSuffix: "",
  },
  eslint: {
    config: {
      typescript: true,
    },
  },
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
  runtimeConfig: {
    public: {
      api_key_weather: process.env.API_KEY_WEATHER,
    },
  },
})
