<template lang="pug">
div.bg-grey-lighten-3.h-100
  VContainer
    VRow
      VCol(cols="12")
        h1.text-center.text-blue-grey-darken-2.mb-5 商品結帳
        VStepper(:items="['清單資料', '輸入地址', '送出訂單']" :model-value="step" hide-actions)
          template(v-slot:item.1 v-if="cart.length === 0")
            | 沒有商品
          template(v-slot:item.1 v-else)
            template(v-for="(item, i) in cart" :key="item._id")
              //- CartCard(v-bind="item.product" :quantity="item.quantity" :_id="item.product._id")
              VCard.rounded-0.mb-2.elevation-0.d-flex
                VRow.w-100
                  VCol(cols="2")
                    VImg(:src="item.product.image" cover min-width="120" width="150" aspect-ratio="1")
                  VCol(cols="12" md="10")
                    .d-flex.align-center
                      RouterLink.text-decoration-none(:to="'/products/' + item.product._id")
                        p.text-grey-darken-3.text-h5.font-weight-bold {{ item.product.name }}
                      VHover
                        template(v-slot:default="{ isHovering, props }")
                          VBtn.ms-auto(
                            v-bind="props"
                            :color="isHovering ? 'red' : 'grey-lighten-2'"
                            variant="text"
                            icon="mdi-close-thick"
                            @click="updateCart(item.product._id, item.quantity * -1)"
                            size="32"
                            )
                    .my-2.d-flex.align-center
                      VIcon.me-2(icon="mdi-tag" color="pink" size="14")
                      span.text-subtitle-1.text-pink {{ item.product.price }} NTD
                    .my-5.pa-5.bg-grey-lighten-4.w-100
                      pre.w-50.text-desc.text-caption {{ item.product.description }}
                    VDivider.my-5
                    .d-flex.align-center.justify-end
                      VBtn(color="primary" variant="text" icon="mdi-minus" @click="updateCart(item.product._id, -1)")
                      span.text-subtitle-2 {{ item.quantity }}
                      VBtn(color="primary" variant="text" icon="mdi-plus" @click="updateCart(item.product._id, 1)")
              VDivider.ma-5
              .d-flex.justify-end.align-center
                //- p(v-if="i === cart.length - 1") {{ item.quantity * item.product.price }}
                span(v-if="i === cart.length - 1") 總金額：
                p.text-pink.text-h4.font-weight-bold(v-if="i === cart.length - 1") ${{ totalAmount }}
          template(v-slot:item.2)
            VCard
              VCardTitle.text-center.text-h4.font-weight-bold 填寫地址資訊
              VRow.pa-15(no-gutters)
                VCol(cols="12")
                  .bg-grey-lighten-3.mb-5
                    VRadioGroup.d-flex.justify-center.align-center.radio-label(inline label="送貨方式")
                      VRadio(label="自宅配送" value="1")
                      VRadio(label="超商自取" value="2")
                VCol(cols="12")
                  p.mb-3.text-h6.text-center 請輸入地址
                  VTextField.ms-auto.me-auto(
                    v-model="address"
                    type="text"
                    placeholder="請輸入地址"
                    prepend-inner-icon="mdi-map-marker"
                    variant="outlined"
                    clearable
                    density="compact"
                    style="width: 50%;"
                  )
          template(v-slot:item.3)
            VCard(title="Step Three", flat) ...
        VCard.my-1
          VCardText
            .d-flex.w-100.justify-space-between
              VBtn.mx-2(v-if="step === 2" color="blue" @click="prev" variant="tonal") 上一步
              VBtn.mx-2(v-if="step === 1" color="blue" @click="next") 下一步
              VBtn.mx-2(v-else-if="step !== 3" color="blue" @click="submit" :disabled="!canCheckOut") 送出訂單
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'

// import CartCard from '@/components/CartCard.vue'

const createSnackbar = useSnackbar()
const router = useRouter()
const cart = ref([])
const user = useUserStore()
const step = ref(1)
const address = ref('')

const updateCart = async (product, quantity) => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product,
      quantity
    })
    const idx = cart.value.findIndex(item => item.product._id === product)
    cart.value[idx].quantity += quantity
    if (cart.value[idx].quantity <= 0) {
      cart.value.splice(idx, 1)
    }
    user.cart = data.result
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
}

const totalAmount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity * item.product.price, 0)
})

const canCheckOut = computed(() => {
  return cart.value.length > 0 && !cart.value.some(item => !item.product.sell)
})

const submit = async () => {
  try {
    const reqData = {
      address: address.value
    }
    await apiAuth.post('/orders', reqData)
    user.cart = 0
    router.push('/')
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
}

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
