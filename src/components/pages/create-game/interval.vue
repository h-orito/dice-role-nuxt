<template>
  <div class="field mb-4">
    <div>
      <label for="interval-hours">更新間隔</label>
    </div>
    <FormSelect
      id="interval-hours"
      v-model="hour"
      :options="hourCandidates"
      option-label="name"
      option-value="value"
      :has-error="hasError"
    />
    <label class="mx-2" for="interval-hours">時間</label>
    <FormSelect
      id="interval-minutes"
      v-model="minute"
      :options="minuteCandidates"
      :has-error="hasError"
    />
    <label class="mx-2" for="interval-hours">分</label>
    <div v-if="hasError" class="p-error text-xs">
      更新間隔は5分～72時間で選択してください。
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hour: number
  minute: number
  hasError: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:hour', value: number): number
  (e: 'update:minute', value: number): number
}>()

const hour = computed({
  get: () => props.hour,
  set: (value: string) => emit('update:hour', value)
})
const minute = computed({
  get: () => props.minute,
  set: (value: string) => emit('update:minute', value)
})

const hourCandidates: Option[] = [...Array(24)]
  .map((_, it) => it)
  .concat([24, 48, 72])
  .map((it) => ({
    name: `${it}`,
    value: it
  }))

const minuteCandidates: Option[] = [...Array(60)].map((_, it) => ({
  name: `${it}`,
  value: it
}))
</script>
