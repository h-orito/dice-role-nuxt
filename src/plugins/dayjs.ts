import { defineNuxtPlugin } from '#app'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween.js'
import 'dayjs/locale/ja'

declare module '#app' {
  interface NuxtApp {
    $dayjs(
      date?: dayjs.ConfigType,
      option?: dayjs.OptionType,
      locale?: string
    ): dayjs.Dayjs
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(isBetween)
  nuxtApp.provide('dayjs', dayjs)
})
