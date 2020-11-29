require('dotenv').config();
const { API_KEY } = process.env
module.exports = {
  plugins: [
    '~plugins/ui',
    { src: '~plugins/localStorage', ssr: false },
    { src: "~plugins/lazyload.js" ,  loading:'~/asset/image/noimage.png'}
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'insta',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'insta' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    // '@nuxtjs/proxy',
    '@nuxtjs/pwa'
  ],
  manifest: {
    name: 'junyagram',
    lang: 'ja',
    short_name: 'junya',
    title: 'junyagram'
  },
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
    // proxy: true,
  },
  css: [
    '@/assets/css/main.css',
  ],
  env: {
    API_KEY,
  },
  // proxy: {
  //   '/api/': 'http://server:8080',
  // }
}
