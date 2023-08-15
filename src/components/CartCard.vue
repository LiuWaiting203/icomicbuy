<template lang="pug">
VCard.rounded-0.mb-2.elevation-0.d-flex
  VRow.w-100
    VCol(cols="2")
      VImg(:src="image" cover min-width="120" width="150" aspect-ratio="1")
    VCol(cols="10")
      .d-flex.align-center
        RouterLink.text-decoration-none(:to="'/products/' + _id")
          p.text-black.text-h5 {{ name }}
        VHover
          template(v-slot:default="{ isHovering, props }")
            VBtn.ms-auto(
              v-bind="props"
              :color="isHovering ? 'red' : 'grey-lighten-2'"
              variant="text"
              icon="mdi-close-thick"
              @click="updateCart(_id, quantity * -1)"
              size="32"
              )
      .my-2.d-flex.align-center
        VIcon.me-2(icon="mdi-tag" color="pink" size="14")
        span.text-subtitle-1.text-pink {{ price }} NTD
      .my-5.pa-5.bg-grey-lighten-4.w-100
        pre.w-50.text-desc.text-caption {{ description }}
      VDivider.my-5
      .d-flex.align-center.justify-end
        VBtn(color="primary" variant="text" icon="mdi-minus" @click="updateCart(_id, -1)")
        span.text-subtitle-2 {{ quantity }}
        VBtn(color="primary" variant="text" icon="mdi-plus" @click="updateCart(_id, 1)")
VDivider.ma-5
</template>

<script setup>
import { ref } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'
import { useSnackbar } from 'vuetify-use-dialog'

const cart = ref([])

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
  quantity: {
    type: Number,
    default: 0
  }
})

const updateCart = async (product, quantity) => {
  try {
    const { data } = await apiAuth.post('/users/cart', {
      product,
      quantity
    })
    const idx = cart.value.findIndex(item => item._id === product)
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
