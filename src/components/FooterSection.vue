<template lang="pug">
VFooter.bg-grey-lighten-3.border-top
  VRow(justify="center" no-gutters)
    VCol.mb-3(cols="12")
      text.text-h6.font-weight-bold 關於 iComic
    VDivider
    VCol.d-flex.justify-between.mt-2(cols="12")
      RouterLink.text-decoration-none(to="/login")
        a 登入 / 註冊
      VSpacer
      RouterLink.text-decoration-none(to="/aboutus")
        a 關於我們
      VSpacer
      a.text-decoration-none(href="#") 回首頁
</template>

<script setup>

</script>
