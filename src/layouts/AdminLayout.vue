<template lang="pug">
VAppBar(color="light-blue-lighten-3")
  VAppBarTitle.font-weight-black.text-h4 管理員後台系統
  VSpacer
  VBtn.v-btn--active-no-bg(to="/" :active="false" :ripple="false" height="56" variant="text")
    VImg(src="@/assets/comic.svg" :width="118")
VNavigationDrawer.elevation-4(permanent)
  VList
    VListItem(:prepend-avatar="user.avatar" :title="user.account")
  VDivider
  VList
    VListItem(v-for="navItem in navItems" :key="navItem.to" :to="navItem.to" :prepend-icon="navItem.icon")
      VListItemTitle {{ navItem.title }}
VMain
  RouterView
</template>
<script setup>
import { useUserStore } from '@/store/user'

const user = useUserStore()

const navItems = [
  { to: '/admin/products', title: '商品管理', icon: 'mdi-store-cog' },
  { to: '/admin/orders', title: '訂單紀錄', icon: 'mdi-book' },
  { to: '/', title: '回首頁', icon: 'mdi-home' }
]

</script>
