import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import UserRole from '@/enums/UserRole'
import { apiAuth } from '@/plugins/axios'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const account = ref('')
  const email = ref('')
  const name = ref('')
  const avatar = ref('')
  const cart = ref(0)
  const role = ref(UserRole.USER)

  const login = (data) => {
    token.value = data.token
    account.value = data.account
    email.value = data.email
    avatar.value = data.avatar
    cart.value = data.cart
    role.value = data.role
    name.value = data.name
  }

  const isLogin = computed(() => {
    return token.value.length > 0
  })

  const isAdmin = computed(() => {
    return role.value === UserRole.ADMIN
  })

  const getProfile = async () => {
    if (token.value.length === 0) return
    try {
      const { data } = await apiAuth.get('/users/me')
      account.value = data.result.account
      email.value = data.result.email
      cart.value = data.result.cart
      role.value = data.result.role
      avatar.value = data.result.avatar
    } catch (error) {
      token.value = ''
    }
  }

  const logout = () => {
    token.value = ''
    account.value = ''
    email.value = ''
    cart.value = 0
    role.value = UserRole.USER
    name.value = ''
  }

  return {
    token,
    account,
    email,
    avatar,
    cart,
    role,
    name,
    login,
    isLogin,
    isAdmin,
    getProfile,
    logout
  }
}, {
  persist: {
    key: '20230724',
    paths: ['token', 'name']
  }
})
