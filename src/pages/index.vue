<template>
  <div>
    <client-only>
      <h2>ゲーム一覧</h2>
      <div class="grid">
        <GameCard
          v-for="game in games"
          :key="game.key"
          :game="game"
          class="col-12 sm:col-6 lg:col-4"
        />
      </div>
      <div v-if="authState.isSignedIn" class="mt-5">
        <NuxtLink to="/create-game">
          <ButtonPrimary label="新しいゲームを作成する" />
        </NuxtLink>
        <div class="mt-4">
          <ButtonDanger label="ログアウト" @click="signOut" />
        </div>
      </div>
      <div v-else>
        <p>
          ログインするとゲームに参加したり新しいゲームを作成することができます。
        </p>
        <ButtonPrimary label="ログインする" @click="openSignInModal" />
        <SignInModal v-model:show="isShowSignInModal" />
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import SignInModal from '~/components/firebase/sign-in-modal.vue'
import { useAuth } from '~/composables/useAuth'
import GameCard from '~/components/pages/index/game-card'

const { data: games } = await useFetch('/api/games', {
  headers: useRequestHeaders(['cookie'])
})

const authState = await useAuth()

const signOut = async () => {
  const { $signOut } = useNuxtApp()
  await $signOut()
}

const isShowSignInModal = ref(false)
const openSignInModal = () => (isShowSignInModal.value = true)
</script>
