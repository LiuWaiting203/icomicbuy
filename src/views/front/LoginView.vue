<template lang="pug">
div.bg-login
  VContainer.h-100.d-flex.justify-center.align-center
    VForm(:disabled="isSubmitting" @submit.prevent="submit")
      div
        VRow.login-panel.elevation-12
          VCol(cols="12")
            VBtn.v-btn--active-no-bg(to="/" :ripple="false" height="120" variant="text")
              VImg(src="@/assets/comic.svg" :width="420" :height="120")
          VCol.px-5(cols="12")
            span.d-block.mb-3 帳號
            VTextField(
            v-model="account.value.value"
            :error-messages="account.errorMessage.value"
            clearable
            label="帳號"
            variant="outlined"
            counter
            maxlength="20"
            )
          VCol.px-5(cols="12")
            span.d-block.mb-3 密碼
            VTextField(
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              type="password"
              label="密碼"
              variant="outlined"
              counter
              maxlength="20"
              )
          VCol.d-flex.justify-center(cols="6")
            VBtn.bg-light-blue-lighten-3.text-white(size="large" to="/register") 註冊
          VCol.d-flex.justify-center(cols="6")
            VBtn.bg-light-blue-lighten-3.text-white(type="submit" size="large") 登入
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const createSnackbar = useSnackbar()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    .string()
    .required('帳號必填')
    .min(4, '帳號最少 4 個字')
    .max(20, '帳號最多 20 個字'),
  password: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少 4 個字')
    .max(20, '密碼最多 20 個字')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/users/login', {
      account: values.account,
      password: values.password
    })
    user.login({
      token: data.result.token,
      account: data.result.account,
      email: data.result.email,
      cart: data.result.cart,
      role: data.result.role,
      name: data.result.name,
      avatar: data.result.avatar
    })
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })
    router.push('/')
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
})
</script>
