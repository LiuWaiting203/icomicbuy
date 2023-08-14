<template lang="pug">
div.bg-grey-lighten-3
  VContainer
    VRow
      VCol(cols="12")
        h1.text-center.mb-5 商品結帳
        VStepper(:items="['詳細資料', '輸入地址', '送出訂單']" v-model="step" hide-actions)
          template(v-slot:item.1)
            VCard
              VCardTitle.text-center.text-h5.font-weight-bold 購物清單
                VTable.text-wrap
                  thead
                    tr
                      th.text-center.text-subtitle-1 圖片
                      th.text-center.text-subtitle-1 名稱
                      th.text-center.text-subtitle-1 單價
                      th.text-center.text-subtitle-1 數量
                      th.text-center.text-subtitle-1 小記
                      th.text-center.text-subtitle-1 操作
                  tbody
                    tr(v-for="item in cart" :key="item._id")
                      td
                        VImg.mx-auto(:src="item.product.image" cover width="200" :aspectRatio="4/3")
                      td.font-weight-regular.text-body-1 {{ item.product.name }}
                      td.font-weight-regular.text-body-1 {{ item.product.price }}
                      td.font-weight-regular.text-body-1
                        VBtn(variant="text" icon="mdi-minus" size="42")
                        | {{ item.quantity }}
                        VBtn(variant="text" icon="mdi-plus" size="42")
                      td.font-weight-regular.text-body-1 {{ item.quantity * item.product.price }}
                      td
                        VBtn(color="red" variant="text" icon="mdi-delete")
          template(v-slot:item.2)
            VCard(title="Step Two", flat) ...
          template(v-slot:item.3)
            VCard(title="Step Three", flat) ...
          VStepperActions.d-flex(style="padding: 0px 24px 16px;")
            VBtn.me-auto(v-if="step === 2" color="blue" @click="prev" variant="tonal") 上一步
            VBtn.ms-auto(v-if="step === 1" color="blue" @click="next") 下一步
            VBtn.ms-auto(v-else-if="step !== 3" color="blue" @click="submit") 送出訂單
</template>

<script setup>
import { ref } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const createSnackbar = useSnackbar()

const cart = ref([])

const step = ref(1)

const next = () => {
  step.value += 1
}

const prev = () => {
  step.value -= 1
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/cart')
    cart.value.push(...data.result)
  } catch (error) {
    createSnackbar({
      text: error.response.data.message,
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'error',
        location: 'bottom'
      }
    })
  }
})()
</script>
