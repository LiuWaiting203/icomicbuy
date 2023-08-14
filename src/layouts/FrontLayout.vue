<template lang="pug">
VAppBar.elevation-1(v-if="$route.path !== '/login' && $route.path !== '/register'" color="light-blue-lighten-3")
  VContainer.d-flex.align-center(:fluid="true")
    VAppBarTitle
      VBtn.v-btn--active-no-bg(to="/" :active="false" :ripple="false" height="46" variant="text")
        VImg(src="@/assets/comic.svg" :width="118" :height="46")
    VSpacer
    VAppBarNavIcon.text-white(v-if="isMobile" @click="drawer = true")
    template(v-if="!isMobile")
      template(v-for="navItem in navItems" :key="navItem.to")
        VBtn.v-btn--active-no-bg(
          variant="text"
          :prepend-icon="navItem.icon"
          :to="navItem.to"
          v-if="navItem.show"
          ) {{ navItem.text }}
          VBadge(
            color="indigo"
            location="end"
            :max="9"
            :content="cart.toString()"
            v-if="navItem.to === '/cart'"
            )
    VBtn(v-if="!isMobile && user.isLogin" prepend-icon="mdi-logout" @click="logout") 登出
VNavigationDrawer(v-if="isMobile" v-model="drawer" location="right" temporary)
  VList(nav)
    template(v-for="navItem in navItems" :key="navItem.to")
      VListItem(v-if="navItem.show" :to="navItem.to")
        template(#prepend)
          VBadge(color="indigo" location="end" :max="9" :content="cart.toString()" v-if="navItem.to === '/cart'")
            VIcon(:icon="navItem.icon")
          VIcon(:icon="navItem.icon" v-else)
        VListItemTitle {{ navItem.text }}
    VListItem(v-if="user.isLogin" @click="logout")
      template(#prepend)
        VIcon(icon="mdi-logout")
      VListItemTitle 登出
VMain
  RouterView(:key="$route.path")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const user = useUserStore()
const { isLogin, isAdmin, cart } = storeToRefs(user)
const createSnackbar = useSnackbar()

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const drawer = ref(false)

const navItems = computed(() => {
  return [
    { to: '/', text: '商品目錄', icon: 'mdi-star-box-outline', show: isLogin.value || !isLogin.value },
    { to: '/seller', text: '出售商品', icon: 'mdi-store', show: isLogin.value && !isAdmin.value },
    { to: '/aboutus', text: '關於我們', icon: '', show: !isLogin.value },
    { to: '/cart', text: '', icon: 'mdi-cart', show: isLogin.value },
    { to: '/login', text: '登入', icon: 'mdi-account', show: !isLogin.value },
    { to: '/user/profile', text: user.name, icon: 'mdi-account-box', show: isLogin.value && !isAdmin.value },
    { to: '/admin', text: '管理', icon: 'mdi-cog', show: isAdmin.value && isLogin.value }
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })
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
