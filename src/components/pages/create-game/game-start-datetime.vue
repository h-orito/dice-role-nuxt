<template>
  <div class="field mb-4">
    <div>
      <label for="game-start-datetime">開始日時</label>
    </div>
    <Calendar
      id="game-start-datetime"
      v-model="value"
      :show-time="true"
      :min-date="minDate"
      :max-date="maxDate"
      :has-error="hasError"
      :show-icon="true"
      date-format="yy/mm/dd"
    />
    <div v-if="hasError" class="p-error text-xs">
      開始日時は今日から1ヶ月以内にしてください。
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  value: string
  hasError: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: string): string
}>()

const value = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value)
})

const now = dayjs()
const minDate = now.toDate()
const maxDate = now.add(1, 'M').toDate()
</script>
