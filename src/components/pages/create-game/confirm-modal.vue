<template>
  <Modal
    v-model:show="isShow"
    header="ゲーム作成確認"
    class="text-sm"
    submit-button-name="作成する"
    close-button-name="キャンセル"
    @submit="save"
    @close="closeModal"
  >
    <div>
      <DataTable
        :value="gameItems"
        striped-rows
        responsive-layout="scroll"
        class="text-sm"
      >
        <Column field="name" header="項目"></Column>
        <Column field="value" header="入力内容">
          <template #body="slotProps">
            <div v-if="!slotProps.data.type">
              <p
                style="white-space: pre-wrap"
                v-text="slotProps.data.value"
              ></p>
            </div>
            <div
              v-if="slotProps.data.type === 'file' && !!slotProps.data.value"
            >
              <img
                :src="slotProps.data.value.objectURL"
                alt="theme image"
                style="max-width: 100px"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

// props
interface Props {
  show: boolean
  game: {
    gameName: string
    description: string
    gameType: string
    intervalHours: number
    intervalMinutes: number
    startDatetime: Date
    themeImage: File | null
  }
}
const props = defineProps<Props>()

// emits
const emit = defineEmits<{
  (e: 'update:show', value: boolean): boolean
}>()

const isShow = computed({
  get: () => props.show,
  set: (value: boolean | undefined) => emit('update:show', value ?? false)
})

const { $dayjs } = useNuxtApp()
const gameItems = computed(() => {
  return [
    {
      name: 'ゲーム名',
      value: props.game.gameName
    },
    {
      name: 'ゲームの説明',
      value: props.game.description
    },
    {
      name: '更新種別',
      value: props.game.gameType === 'ap' ? 'AP制' : '定期更新'
    },
    {
      name: '更新間隔',
      value: `${props.game.intervalHours}時間${props.game.intervalMinutes}分`
    },
    {
      name: '開始日時',
      value: $dayjs(props.game.startDatetime).format('YYYY/MM/DD HH:mm')
    },
    {
      name: 'テーマ画像',
      type: 'file',
      value: props.game.themeImage
    }
  ]
})

const config = useRuntimeConfig()
const closeModal = () => (isShow.value = false)
const save = async () => {
  const {
    gameName,
    description,
    gameType,
    intervalHours,
    intervalMinutes,
    startDatetime,
    themeImage
  } = props.game

  let imageUrl = null
  if (themeImage) {
    imageUrl = await upload(themeImage)
  }

  const config = useRuntimeConfig()
  const { data: game } = (await useFetch(`${config.apiRoot}api/create-game`, {
    headers: useRequestHeaders(['cookie']),
    method: 'POST',
    body: {
      game: {
        name: gameName,
        description,
        type: gameType,
        intervalSeconds: intervalHours * 3600 + intervalMinutes * 60,
        startDatetime: startDatetime,
        themeImageUrl: imageUrl,
        created: $dayjs().unix()
      } as Game
    }
  })) as { data: Ref<Game> }

  useRouter().push({
    path: '/game',
    query: {
      key: game.value.key
    }
  })
}

const upload = async (themeImage: File) => {
  const formData = new FormData()
  formData.append('file', themeImage)
  const res = await useFetch(`${config.imageUploaderDomain}/upload`, {
    method: 'POST',
    body: formData
  })

  const path = (res.data as Ref<ThumbnailPath>).value.path
  return `${config.thumanailHost}${path}`
}

type ThumbnailPath = {
  path: string
}
</script>
