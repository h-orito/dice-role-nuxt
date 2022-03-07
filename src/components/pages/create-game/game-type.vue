<template>
  <div class="field mb-4">
    <div>
      <label for="game-type">更新種別</label>
    </div>
    <SelectButton
      id="game-type"
      v-model="value"
      :options="candidates"
      option-label="name"
      option-value="value"
      :has-error="hasError"
    />
    <div v-if="hasError" class="p-error text-xs">
      更新種別はいずれかを選択してください。
    </div>
  </div>
</template>

<script setup lang="ts">
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

const candidates = ref([
  {
    name: 'AP制',
    value: 'ap'
  },
  {
    name: '定期更新',
    value: 'term'
  }
])
</script>
