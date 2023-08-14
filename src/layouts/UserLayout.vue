<template lang="pug">
VAppBar(color="light-blue-lighten-3").d-flex.align-center
  VAppBarTitle.font-weight-black.text-h4.text-white(v-if="!isMobile") 會員後台系統
  VSpacer
  VAppBarNavIcon.text-white(v-if="isMobile" @click="drawer = true")
  VBtn.v-btn--active-no-bg(to="/" :active="false" :ripple="false" height="56" variant="text")
    VImg(src="@/assets/comic.svg" :width="118" alt="動漫交易平台")
VNavigationDrawer(v-if="isMobile" v-model="drawer" location="right" temporary)
  VList
    VListItem(:prepend-avatar="user.avatar" :title="user.account" color="white")
  VDivider
  VList
    VListItem(v-for="navItem in navItems" :key="navItem.to" :to="navItem.to" :prepend-icon="navItem.icon")
      VListItemTitle {{ navItem.text }}
VNavigationDrawer.bg-blue-lighten-1.text-white(expand-on-hover rail)
  VList.bg-blue-darken-1
    VListItem(:prepend-avatar="user.avatar" :title="user.account" color="white")
  VDivider
  VList
    VListItem(v-for="navItem in navItems" :key="navItem.to" :to="navItem.to" :prepend-icon="navItem.icon")
      VListItemTitle {{ navItem.text }}
VMain
  RouterView
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'

const drawer = ref(false)

const user = useUserStore()

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const navItems = [
  { to: '/user/profile', text: '個人資料', icon: 'mdi-book-account' },
  { to: '/user/products', text: '我的商品', icon: 'mdi-store' },
  { to: '/user/orders', text: '我的訂單', icon: 'mdi-list-box' },
  { to: '/', text: '回首頁', icon: 'mdi-home' }
]

</script>
