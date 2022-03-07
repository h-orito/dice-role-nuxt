<template>
  <div class="field mb-4">
    <div>
      <label for="description">ゲームの説明</label>
    </div>
    <FormTextarea
      id="description"
      v-model="value"
      class="w-20rem h-15rem"
      :has-error="hasError"
    />
    <div v-if="hasError" class="p-error text-xs">
      ゲーム説明は1~4000字以内で入力してください。
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
</script>
