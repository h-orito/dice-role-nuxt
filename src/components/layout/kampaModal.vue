<template>
  <div>
    <client-only>
      <Modal v-model:show="isShow" header="投げ銭について" class="text-sm">
        <p class="mb-2 text-lg">匿名でAmazonギフトカードを送る</p>
        <ul class="text-bluegray-600">
          <li>
            Amazonギフトカードによる投げ銭（15円〜、手数料なし）になります。
          </li>
          <li>
            Kampa!というサービスを利用することで、個人情報をやりとりすることなくAmazonギフトカードで投げ銭することができます。
          </li>
          <li>投げ銭していただける方は下記手順にてお願いします。</li>
          <li class="flex justify-content-center">
            <ol class="mt-2 ml-10 list-decimal text-left">
              <li>「Amazonギフトカードで投げ銭する」よりKampa!サイトへ遷移</li>
              <li>
                表示されたページのメールアドレスをコピーし、Kampa!ボタンをクリック
              </li>
              <li>
                「受取人」にメールアドレスを貼り付け、金額を指定して購入
                <br />
                （応援メッセージをいただけると喜びます）
              </li>
            </ol>
          </li>
        </ul>
        <ButtonPrimary
          class="my-2"
          label="Amazonギフトカードで投げ銭する"
          @click="openWindow('http://kampa.me/t/lxc')"
        />
        <p class="mt-5 mb-2 text-lg">Amazonほしい物リストから送る</p>
        <ul class="text-bluegray-600">
          <li>Amazonほしいものリストから選んで開発者に送ることができます。</li>
        </ul>
        <ButtonPrimary
          class="my-2"
          label="Amazonほしいものリストを開く"
          @click="
            openWindow(
              'https://www.amazon.jp/hz/wishlist/ls/1KZSJAJS1ETW4?ref_=wl_share'
            )
          "
        />
        <p class="mt-5 mb-2 text-lg">Amazonアソシエイト経由で買い物をする</p>
        <ul class="text-bluegray-600">
          <li>
            下記からAmazonに遷移してカートに追加＆購入すると、開発者に若干の紹介料が入ります。
          </li>
        </ul>
        <ButtonPrimary
          class="my-2"
          label="Amazonを開く"
          @click="
            openWindow(
              'https://www.amazon.co.jp/b?_encoding=UTF8&tag=wolfort0d-22&linkCode=ur2&linkId=faf82136a01cf462858661dc52891566&camp=247&creative=1211&node=71314051'
            )
          "
        />
      </Modal>
    </client-only>
  </div>
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

const openWindow = (url: string) => window.open(url)
</script>
