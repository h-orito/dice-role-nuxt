<template>
  <div>
    <client-only>
      {{ game }}
    </client-only>
  </div>
</template>

<script setup lang="ts">
const { data: game } = await useFetch(`${useRoot()}api/game`, {
  headers: useRequestHeaders(['cookie']),
  params: {
    key: useRoute().query.key
  }
})
</script>
