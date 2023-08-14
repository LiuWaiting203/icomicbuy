<template lang="pug">
VContainer.h-100
  VRow.align-center
    VCol(cols="12")
      h1.text-center 請選擇管理需要的項目
  VRow
    VCol.d-flex.justify-center.align-items-center(cols="6")
      VCard(max-width="300" variant="outlined")
        VCardItem
          h4 商品管理
          p.text-caption 點此導向至商品管理頁面
        VCardActions
          VBtn(to="/admin/products" variant="outlined") 導向
    VCol.d-flex.justify-center.align-items-center(cols="6")
      VCard(max-width="300" variant="outlined")
        VCardItem
          h4 訂購紀錄
          p.text-caption 點此導向至訂購紀錄
        VCardActions
          VBtn(to="/admin/orders" variant="outlined") 導向
</template>
