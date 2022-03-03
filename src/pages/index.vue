<template>
  <div>
    <p>{{ games }}</p>
    <client-only>
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

const { data: games } = await useFetch('/api/games')
const authState: Ref<AuthState> = await useAuth()
const signOut = async () => {
  const { $signOut } = useNuxtApp()
  await $signOut()
}
</script>
