import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: '/dice-role/'
    // buildAssetsDir: '/dice-role/'
  },
  srcDir: 'src/',
  typescript: {
    strict: true
  },
  publicRuntimeConfig: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    imageUploaderDomain: 'http://140.83.55.4:30953/image-uploader',
    thumanailHost: 'http://140.83.55.4:30953'
  },
  privateRuntimeConfig: {
    firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseAdminSdkPath: process.env.FIREBASE_ADMINSDK_PATH
  },
  nitro: {
    preset: 'server'
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '@/assets/css/main.css',
    '@/assets/scss/main.scss'
  ]
})
