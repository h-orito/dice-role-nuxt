<template>
  <div>
    <client-only>
      <p>{{ games }}</p>
      {{ authState }}
      <div v-if="authState.isSignedIn">
        <button @click="signOut">ログアウト</button>
      </div>
      <div v-else>
        <SignInModal :is-show="true" />
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import SignInModal from '~/components/firebase/sign-in-modal.vue'
import { useAuth } from '~/composables/useAuth'

const { data: games } = await useFetch('/api/games', {
  headers: useRequestHeaders(['cookie'])
})

const authState = await useAuth()

const signOut = async () => {
  const { $signOut } = useNuxtApp()
  await $signOut()
}
</script>
