<template>
  <div class="field mb-4">
    <div>
      <label for="theme-image">テーマ画像(640x480px推奨)</label>
    </div>
    <FileUpload
      id="theme-image"
      v-model="value"
      name="themeImage[]"
      accept="image/*"
      :file-limit="1"
      :show-upload-button="false"
      :has-error="hasError"
      @select="select"
      @remove="remove"
    />
    <div v-if="hasError" class="p-error text-xs">
      ゲーム画像は500kByte以下で選択してください。
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: File | null
  hasError: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:value', value: File | null): File | null
}>()

const value = computed({
  get: () => props.value,
  set: (value: File | null) => emit('update:value', value)
})

const select = (event) => (value.value = event.files[0])
const remove = () => (value.value = null)
</script>
