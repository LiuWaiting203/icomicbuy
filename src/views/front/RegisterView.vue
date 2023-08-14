<template lang="pug">
div.bg-register
  VContainer.h-100.d-flex.justify-center.align-center
    VForm(:disabled="isSubmitting" @submit.prevent="submit")
      div
        VRow.register-panel.elevation-12
          VCol.mb-10.d-flex.justify-center.align-center(cols="12")
            VBtn.v-btn--active-no-bg.text-center(to="/" :ripple="false" height="140" variant="text")
              VImg(src="@/assets/comic.svg" :width="420" :height="140")
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 帳號
            VTextField(
              clearable
              label="帳號"
              variant="outlined"
              density="compact"
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              counter maxlength="20"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 信箱
            VTextField(
              type="email"
              clearable
              label="信箱"
              variant="outlined"
              density="compact"
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 密碼
            VTextField(
              type="password"
              label="密碼"
              variant="outlined"
              density="compact"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              counter maxlength="20"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 確認密碼
            VTextField(
              type="password"
              label="確認密碼"
              variant="outlined"
              density="compact"
              v-model="confirmPassword.value.value"
              :error-messages="confirmPassword.errorMessage.value"
              counter maxlength="20"
              )
          VCol.d-flex.justify-center(cols="12")
            VBtn.bg-light-blue-lighten-3.text-white(type="submit") 註冊
</template>

<script setup>
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const createSnackbar = useSnackbar()
const router = useRouter()

const schema = yup.object({
  account: yup
    .string()
    .required('帳號必填')
    .min(4, '帳號最少 4 個字')
    .max(20, '帳號最多 20 個字'),
  email: yup
    .string()
    .required('信箱必填')
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => validator.isEmail(value)
    ),
  password: yup
    .string()
    .required('密碼必填')
    .min(4, '密碼最少 4 個字')
    .max(20, '密碼最多 20 個字'),
  confirmPassword: yup
    .string()
    .required('確認密碼必填')
    .min(4, '確認密碼最少 4 個字')
    .max(20, '確認密碼最多 20 個字')
    .oneOf([yup.ref('password')], '密碼不一致')
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const email = useField('email')
const password = useField('password')
const confirmPassword = useField('confirmPassword')

const submit = handleSubmit(async (values) => {
  console.log('submit')
  try {
    await api.post('/users', {
      account: values.account,
      email: values.email,
      password: values.password,
      name: values.account
    })
    createSnackbar({
      text: '註冊成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })
    router.push('/login')
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
