<template>
  <NuxtLink
    :to="{
      path: '/game',
      query: {
        key: game.key
      }
    }"
  >
    <Card>
      <template #header>
        <img
          v-if="game.themeImageUrl"
          :alt="game.name"
          :src="game.themeImageUrl"
        />
        <img v-else alt="no image" :src="`${root}image/dice.jpg`" />
      </template>
      <template #title>
        <h2 class="my-0" v-text="game.name"></h2>
      </template>
      <template #content>
        <Tag :value="gameTypeName" />
        <p class="text-xs" v-text="game.description"></p>
        <p v-if="game.creator">GM: {{ game.creator.userName }}</p>
      </template>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  game: Game
}

const props = defineProps<Props>()

const gameTypeName = computed(() => {
  return props.game.type === 'ap' ? 'AP制' : '定期更新'
})

const root = computed(() => useRoot())
</script>
