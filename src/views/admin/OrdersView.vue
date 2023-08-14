<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VCard
        VCardTitle.bg-blue.text-center.font-weight-bold.text-h5 訂單資料
        VTable
          thead
            tr
              th.text-center 會員
              th.text-center 暱稱
              th.text-center 訂單ID
              th.text-center 日期
              th.text-center 金額
              th.text-center 商品
              th.text-center 地址
          tbody
            tr(v-for="order in orders" :key="order._id")
              td.text-center.border-table-R.text-body-2 {{ order.user.account }}
              td.text-center.border-table-R.text-body-2 {{ order.user.name }}
              td.text-center.text-caption.border-table-R {{ dateString(order.date) + numSplit(order._id) }}
              td.text-center.border-table-R.text-caption {{ new Date(order.date).toLocaleString() }}
              td.text-center.border-table-R.text-subtitle-2.text-pink ${{ order.total }}
              td.text-center.border-table-R.px-0
                VTable
                  tr.text-subtitle-2(v-for="item in order.cart" :key="item._id")
                    td.border-table-B {{ item.product.name }}
                    td.w-25.border-table-B {{ item.quantity }} 個
              td.text-center.border-table-R.text-body-2 {{ order.address }}
  </template>

<script setup>
import { apiAuth } from '@/plugins/axios'
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'

const orders = ref([])
const createSnackbar = useSnackbar()

const numSplit = (value) => {
  return value.split('').splice(11).join('')
}

// 將 orders 裡面的 date 的時間去掉，只剩下年月日
const dateString = (date) => {
  const dateNew = new Date(date)
  const year = dateNew.getFullYear(date)
  const month = String(dateNew.getMonth() + 1).padStart(2, '0')
  const day = String(dateNew.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

(async () => {
  try {
    const { data } = await apiAuth.get('/orders/all')
    orders.value.push(...data.result.map(order => {
      order.total = order.cart.reduce((total, current) =>
        total + (current.product.price * current.quantity), 0
      )
      return order
    }))
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
