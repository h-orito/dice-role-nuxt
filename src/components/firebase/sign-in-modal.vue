<template>
  <Modal v-model:show="isShow" header="ログイン" class="text-sm">
    <p className="my-2">
      いずれかのSNSアカウントと連携してサインインしてください。
      <br />
      サインインのためだけに使用するため、画面上にSNS情報が表示されることはありません。
    </p>
    <div class="my-3">
      <ButtonPrimary
        icon="google"
        label="Googleログイン"
        @click="$signInGoogle"
      />
    </div>
    <div class="my-3">
      <ButtonPrimary
        icon="twitter"
        label="Twitterログイン"
        @click="$signInTwitter"
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): boolean
}>()

const isShow = computed({
  get: () => props.show,
  set: (value: boolean | undefined) => emit('update:show', value ?? false)
})

const { $signInGoogle, $signInTwitter } = useNuxtApp()
</script>
