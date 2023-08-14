<template lang="pug">
div.bg-register
  VContainer.h-100.d-flex.justify-center.align-center
    VForm(v-model="valid" @sumbit.prevent="register" ref="formEl")
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
              v-model="form.account"
              counter maxlength="20"
              :rules="[rules.required, rules.min, rules.max]"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 信箱
            VTextField(
              type="email"
              clearable
              label="信箱"
              variant="outlined"
              density="compact"
              v-model="form.email"
              :rules="[rules.required, rules.email]"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 密碼
            VTextField(
              type="password"
              label="密碼"
              variant="outlined"
              density="compact"
              v-model="form.password"
              counter maxlength="20"
              :rules="[rules.required, rules.min, rules.max]"
              ref="elPassword"
              @update:model-value="elConfirmPassword.validate()"
              )
          VCol.px-5.py-0.text-field-shorten(cols="12")
            span.d-block.mb-3 確認密碼
            VTextField(
              type="password"
              label="確認密碼"
              variant="outlined"
              density="compact"
              v-model="form.confirmPassword"
              counter maxlength="20"
              :rules="[rules.required,rules.min,rules.max, rules.confirm]"
              ref="elConfirmPassword"
              @update:model-value="elPassword.validate()"
              )
          VCol.d-flex.justify-center(cols="12")
            VBtn.bg-light-blue-lighten-3.text-white(type="submit" block to="/register") 註冊
</template>

<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'

const valid = ref(false)
const form = reactive({
  account: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const elPassword = ref(null)
const elConfirmPassword = ref(null)

const rules = {
  required: (value) => !!value || '欄位必填',
  email: (value) => validator.isEmail(value) || '請輸入正確的信箱',
  min: (value) => value.length >= 4 || '請輸入至少 4 個字',
  max: (value) => value.length <= 20 || '請輸入不多於 20 個字',
  confirm: () => form.confirmPassword === form.password || '密碼不一致'
}

</script>
