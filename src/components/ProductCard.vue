<template lang="pug">
VCard.rounded-0(ripple variant="text")
  RouterLink.text-decoration-none(:to="'/products/' + _id")
    VImg.product-img-border(:src="image" cover :aspectRatio="1")
    VCardTitle.pa-0.text-h6.text-primary.font-weight-black {{ name }}
  VCardSubtitle.px-0.text-subtitle-1 {{ category }}
  VCardSubtitle.px-0.text-subtitle-2.text-pink ${{ price }}
  VCardActions.px-0
    VBtn(
      color="primary"
    prepend-icon="mdi-cart"
    variant="tonal"
    block
    @click="addCart"
    ) 加入購物車
</template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'

const user = useUserStore()

const createSnackbar = useSnackbar()

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  category: {
    type: String,
    default: () => ''
  },
  image: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  price: {
    type: Number,
    default: () => 0
  },
  sell: {
    type: Boolean,
    default: () => true
  }
})

const addCart = async () => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product: props._id,
      quantity: 1
    })
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
</script>
