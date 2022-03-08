<template>
  <div>
    <client-only>
      <GameName v-model:value="gameName" :has-error="v$.gameName.$error" />
      <Description
        v-model:value="description"
        :has-error="v$.description.$error"
      />
      <GameType v-model:value="gameType" :has-error="v$.gameType.$error" />
      <Interval
        v-model:hour="intervalHours"
        v-model:minute="intervalMinutes"
        :has-error="v$.intervalHours.$error || v$.intervalMinutes.$error"
      />
      <GameStartDatetime
        v-model:value="startDatetime"
        :has-error="v$.startDatetime.$error"
      />
      <ThemeImage
        v-model:value="themeImage"
        :has-error="v$.themeImage.$error"
      />
      <ButtonPrimary class="mt-5" label="確認画面へ" @click="confirm" />
      <ConfirmModal v-model:show="isConfirmModalShow" :game="inputGame" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import GameName from '~/components/pages/create-game/game-name.vue'
import Description from '~/components/pages/create-game/description.vue'
import GameType from '~/components/pages/create-game/game-type.vue'
import Interval from '~/components/pages/create-game/interval.vue'
import GameStartDatetime from '~/components/pages/create-game/game-start-datetime.vue'
import ThemeImage from '~/components/pages/create-game/theme-image.vue'
import ConfirmModal from '~/components/pages/create-game/confirm-modal.vue'

const { $dayjs } = useNuxtApp()
const gameName = ref('')
const description = ref('')
const gameType = ref('ap')
const intervalHours = ref(24)
const intervalMinutes = ref(0)
const startDatetime = ref($dayjs().add(7, 'd').startOf('day').toDate())
const themeImage: Ref<File | null> = ref(null)

const rules = {
  gameName: {
    required,
    minLength: minLength(1),
    maxLength: maxLength(40)
  },
  description: {
    required,
    minLength: minLength(1),
    maxLength: maxLength(4000)
  },
  gameType: { required },
  intervalHours: {
    required,
    maxHours: () => {
      const minutes = intervalHours.value * 60 + intervalMinutes.value
      return 5 <= minutes && minutes <= 72 * 60
    }
  },
  intervalMinutes: { required },
  startDatetime: {
    required,
    recency: () => {
      const date = $dayjs(startDatetime.value)
      const now = $dayjs()
      const maxDate = now.add(1, 'M')
      return date.isBetween(now, maxDate)
    }
  },
  themeImage: {
    imageSize: () => {
      const image = themeImage.value
      if (!image) return true
      return image.size <= 500000
    }
  }
}

const v$ = useVuelidate(rules, {
  gameName,
  description,
  gameType,
  intervalHours,
  intervalMinutes,
  startDatetime,
  themeImage
})

const confirm = async () => {
  const isValid = await v$.value.$validate()
  if (!isValid) return
  openConfirmModal()
}

const isConfirmModalShow = ref(false)
const openConfirmModal = () => (isConfirmModalShow.value = true)

const inputGame = computed(() => ({
  gameName: gameName.value,
  description: description.value,
  gameType: gameType.value,
  intervalHours: intervalHours.value,
  intervalMinutes: intervalMinutes.value,
  startDatetime: startDatetime.value,
  themeImage: themeImage.value
}))
</script>
