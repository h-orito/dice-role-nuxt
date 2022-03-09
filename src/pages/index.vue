<template>
  <div>
    <client-only>
      <h2>ようこそ</h2>
      <div v-if="authState.isSignedIn">
        <div>
          <ButtonPrimary
            label="ユーザー情報を編集する"
            @click="openModifyUserModal"
          />
          <ModifyUserinfoModal v-model:show="isShowModifyUserModal" />
        </div>
        <div class="mt-2">
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
      <h2 class="mt-5">ゲーム一覧</h2>
      <div class="grid">
        <GameCard
          v-for="game in games"
          :key="game.key!"
          :game="game"
          class="col-12 sm:col-6 lg:col-4"
        />
      </div>
      <div v-if="authState.isSignedIn" class="mt-5">
        <NuxtLink to="/create-game">
          <ButtonPrimary label="新しいゲームを作成する" />
        </NuxtLink>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import SignInModal from '~/components/firebase/sign-in-modal.vue'
import { useAuth } from '~/composables/useAuth'
import GameCard from '~/components/pages/index/game-card.vue'
import ModifyUserinfoModal from '../components/firebase/modify-userinfo-modal.vue'

const { data: games } = (await useFetch(`api/games`, {
  headers: useRequestHeaders(['cookie'])
})) as { data: Ref<Game[]> }

const authState = await useAuth()

const signOut = async () => {
  const { $signOut } = useNuxtApp()
  await $signOut()
}

const isShowSignInModal = ref(false)
const openSignInModal = () => (isShowSignInModal.value = true)

const isShowModifyUserModal = ref(false)
const openModifyUserModal = () => (isShowModifyUserModal.value = true)
</script>
