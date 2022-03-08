<template>
  <div>
    <client-only>
      {{ game }}
    </client-only>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const { data: game } = await useFetch(`${config.apiRoot}api/game`, {
  headers: useRequestHeaders(['cookie']),
  params: {
    key: useRoute().query.key
  }
})
</script>
