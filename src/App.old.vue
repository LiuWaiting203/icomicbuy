<template lang="pug">
VApp
  VAppBar(v-if="$route.path !== '/login' && $route.path !== '/register'" color="light-blue-lighten-3")
    VContainer.d-flex.align-center
      VAppBarTitle
        VBtn.v-btn--active-no-bg(to="/" :active="false" :ripple="false" height="56" variant="text")
          VImg(src="@/assets/comic.svg" :width="118")
      VSpacer
      VAppBarNavIcon.d-md-none(variant="text" @click="drawer = true")
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" to="/" :active="false") 首頁
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" to="/seller") 出售商品
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" to="/products") 商品目錄
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" to="/aboutus") 關於我們
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" prepend-icon="mdi-cart" to="/cart") 購物車
        VBadge(color="indigo" content="10" floating)
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" prepend-icon="mdi-account" to="/login") 登入
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" prepend-icon="mdi-account-box" to="/userprofile") 會員資料
      VBtn.d-none.d-lg-flex.d-xl-none(variant="text" prepend-icon="mdi-logout") 登出
  VNavigationDrawer(v-model="drawer" location="right" temporary)
    VList(nav)
      VListItem(v-for="navItem in navItems" :key="navItem.to" :to="navItem.to")
        template(#prepend)
          VIcon(:icon="navItem.icon")
        VListItemTitle {{ navItem.text }}
      VListItem(to="/userprofile")
        template(#prepend)
          VIcon(icon="mdi-account-box")
        VListItemTitle 會員資料
      VListItem()
        template(#prepend)
          VIcon(icon="mdi-logout")
        VListItemTitle 登出
  VMain
    RouterView
</template>

<!-- <template lang="pug">
RouterLink(to="/") Home
RouterLink(to="/seller") Sell
RouterLink(to="/products") Products
RouterLink(to="/aboutus") About us
RouterLink(to="/cart") Cart
RouterLink(to="/login") Login
RouterLink(to="/register") Register
RouterLink(to="/userprofile") User Profile
RouterLink(to="/userproducts") User Products
RouterLink(to="/userorders") User Orders
RouterLink(to="/admin") Admin
RouterLink(to="/admin/products") Admin Products
RouterLink(to="/admin/orders") Admin Orders
RouterView
</template> -->

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const navItems = [
  { to: '/', text: '首頁', icon: 'mdi-home' },
  { to: '/seller', text: '出售商品', icon: 'mdi-store' },
  { to: '/products', text: '商品目錄', icon: 'mdi-view-list' },
  { to: '/aboutus', text: '關於我們', icon: 'mdi-chat-question' },
  { to: '/cart', text: '購物車', icon: 'mdi-cart' },
  { to: '/login', text: '登入', icon: 'mdi-account' }
]
</script>
