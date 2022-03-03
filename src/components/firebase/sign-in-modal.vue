<template>
  <div v-if="isShow">
    <button @click="$signInGoogle">Googleログイン</button>
    <button @click="$signInTwitter">Twitterログイン</button>
  </div>
</template>

<script setup lang="ts">
import {} from 'firebase/auth'

interface Props {
  isShow: boolean
}

withDefaults(defineProps<Props>(), {
  isShow: false
})

const { $signInGoogle, $signInTwitter } = useNuxtApp()
</script>
