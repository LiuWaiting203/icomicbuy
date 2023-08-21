<template lang="pug">
VContainer
  VRow.pa-10
    VCol.pa-0.pe-10(cols="12" md="6")
      .d-flex.flex-column.justify-center
        VImg.mb-5.align-self-center(:src="product.image" width="400" @click="toggleZoom")
        VDialog(v-model="showZoom" max-width="80%")
          .d-flex.justify-center.align-center
            VImg.elevation-24(:src="product.image" cover max-width="650")
        VDivider.mb-5
        span.mb-5.bg-cyan-lighten-1.text-white.text-h4.font-weight-bold.text-center(style="width: 160px;")  商品詳情
        pre.text-subtitle-2.text-desc {{ product.description }}
    VCol.ps-10(cols="12" md="6")
      p.text-caption.text-indigo.mb-5 類別：{{ product.category }}
      .d-flex.justify-start.align-center.mb-2
        VAvatar.me-2(size="32")
          VImg(:src="product.user.avatar" cover min-width="60")
        h3.text-subtitle-1 {{ product.user.name }}
      h1.text-h4.font-weight-black.mb-5.text-grey-darken-3 {{ product.name }}
      .d-flex.align-center
        VBtn.me-auto(
          prepend-icon="mdi-heart"
          variant="outlined"
          @click="incrementCounter"
          :color="isLiked ? 'pink' : 'grey'"
          ) {{ buttonText }}
        VBtn(icon="mdi-clipboard-text" variant="text" :ripple="false" @click="copyURL")
      VDivider.my-4
      .d-flex
        VIcon.me-auto(icon="mdi-cash" size="40" color="grey")
        p.mb-5.text-right.text-h6 {{ product.price }} NTD
      VForm(:disabled="isSubmitting" @submit.prevent="submit")
        .d-flex(style="height: 50px;")
          VBtn.me-auto.text-h6.font-weight-bold(type="submit" color="blue-lighten-1" prepend-icon="mdi-cart" :height="60" :width="300") 加入購物車
          VTextField.ps-15(
            v-model.number="quantity.value.value"
            type="number"
            min="1"
            :error-messages="quantity.errorMessage.value"
            style="width: 50px;"
            variant="outlined"
            )
      VExpansionPanels.my-15(multiple variant="accordion")
        VExpansionPanel
          VExpansionPanelTitle(color="grey-lighten-5") 購買商品時須知
          VExpansionPanelText - 請在下單前確認商品的規格、數量和價格。 <br/>
            | - 請在收到商品後檢查商品的品質和完整性。<br/>
            | - 如有任何問題或不滿，請在七天內聯繫客服，我們將盡快為您處理。<br/>
        VExpansionPanel
          VExpansionPanelTitle(color="grey-lighten-5") 送貨方式
          VExpansionPanelText 透過宅配送達。除網頁另有特別標示外，均為常溫配送。 <br>
    VDivider.my-5
  VRow
    VCol(cols="12")
      h2.text-center.text-h6.font-weight-bold.mb-5.bg-blue.text-white.rounded-xl 你可能還喜歡以下這些商品...
    VCol(
      cols="4" md="3"
      v-for="randomProduct in randomProducts" :key="randomProduct._id"
    )
      .d-flex.align-center.ms-10
        RouterLink.text-decoration-none.text-grey-darken-3(:to="'/products/' + randomProduct._id")
          .d-flex.justify-center.align-center.flex-column
            VImg.border-random-products(:src="randomProduct.image" :min-width="190" cover aspect-ratio="1")
            .d-flex.flex-column
              span.text-left.text-caption.text-blue-lighten-2 類別：{{ randomProduct.category }}
              span(style="width: 185px;").text-wrap.text-body-1.font-weight-bold {{ randomProduct.name }}
              .d-flex.align-center
                VAvatar(size="14")
                  VImg(:src="randomProduct.user.avatar")
                span.ms-2.text-subtitle-2 {{ randomProduct.user.name }}
          .d-flex.justify-start.align-center
            p.text-caption.text-pink ${{ randomProduct.price }} NTD
VOverlay.d-flex.justify-center.align-center(:model-value="!product.sell" persistent)
  VContainer
    VRow
      VCard.mx-auto(color="white" :width="300" :height="120")
        VCol(cols="12")
          VCardTitle.text-h4.font-weight-black.text-red.text-center 已下架
          VDivider.ma-1
          VCardActions.d-flex.justify-center.align-center
            VBtn(
              variant="elevated"
              color="blue-lighten-1"
              to="/"
              ) 回上頁
FooterSection(style="height: 150px;")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'
// Foooter
import FooterSection from '@/components/FooterSection.vue'

const route = useRoute()
const userCart = useUserStore()
const createSnackbar = useSnackbar()
const counter = ref(0)
const showZoom = ref(false)
const isLiked = ref(false)

const toggleZoom = () => {
  showZoom.value = !showZoom.value
}

const incrementCounter = async () => {
  try {
    const { data } = await apiAuth.patch('/users/likes/' + product.value._id, { likes: !isLiked.value })
    if (data.result !== null || data.result !== undefined) {
      counter.value = data.result ? counter.value + 1 : counter.value - 1
      isLiked.value = data.result
    }
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

const buttonText = computed(() => counter.value)

const copyURL = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    createSnackbar({
      text: '複製成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })
  } catch (error) {
    createSnackbar({
      text: error,
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'error',
        location: 'bottom'
      }
    })
  }
}

const schema = yup.object({
  quantity: yup.number().required('請輸入數量').min(1, '最少為 1').typeError('請輸入正確的數量')
})

const { isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    quantity: 1
  }
})
const quantity = useField('quantity')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product: product.value._id,
      quantity: values.quantity
    })
    userCart.cart = data.result
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
})

const product = ref({
  _id: '',
  name: '',
  price: 0,
  description: '',
  user: {
    _id: '',
    name: '',
    avatar: ''
  },
  image: '',
  sell: true,
  category: ''
})

const randomProducts = ref([]);

(async () => {
  try {
    const results = await Promise.all([
      apiAuth.get('/products/' + route.params.id),
      apiAuth.get('/products/random')
    ])
    product.value._id = results[0].data.result._id
    product.value.name = results[0].data.result.name
    product.value.price = results[0].data.result.price
    product.value.description = results[0].data.result.description
    product.value.image = results[0].data.result.image
    product.value.sell = results[0].data.result.sell
    product.value.category = results[0].data.result.category

    product.value.user._id = results[0].data.result.user._id
    product.value.user.name = results[0].data.result.user.name
    product.value.user.avatar = results[0].data.result.user.avatar

    randomProducts.value.push(...results[1].data.result)

    document.title = '愛買漫 | ' + product.value.name

    counter.value = results[0].data.result.likes || 0
    isLiked.value = results[0].data.result.liked
  } catch (error) {
    console.log(error)
    createSnackbar({
      text: error.response.data.message,
      showCloseButton: false,
      snackbarProps:
      {
        timeout: 3000,
        color: 'error',
        location: 'bottom'
      }
    })
  }
})()
</script>
