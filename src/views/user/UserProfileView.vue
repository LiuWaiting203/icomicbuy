<template lang="pug">
VContainer
  VRow.justify-center
    VCol(cols="12" md="8")
      VCard
        VCardTitle.bg-blue.text-h5.font-weight-bold.text-center 個人資料修改及管理
        VRow(no-gutters)
          VCol(cols="12" md="4")
            .d-flex.justify-center.align-center.flex-column(style="position: relative;")
              VImg.mt-15.rounded-circle(:src="user.avatar" width="120" :aspect-ratio="1" cover)
              VBtn.elevation-1.text-grey-lighten-1(
                icon="mdi-pencil"
                size="30"
                @click="editAvatar = !editAvatar"
                style="position: absolute; top: calc(50% + 40px); right: calc(50% - 50px);"
                )
                VIcon(icon="mdi-pencil")
              text.text-h5.mt-5.font-weight-bold {{ user.name }}
          VDivider(vertical)
          VCol(cols="12" md="8")
            VForm(:disabled="isSubmitting" @submit.prevent="submit")
              VCardText.mt-5.text-h6.text-blue 帳號：
                span.text-grey-darken-2 {{ user.account }}
              VDivider.text-black
              VCardText.text-h6.text-blue  暱稱：
                span.text-grey-darken-2 {{ user.name }}
                VBtn.ms-3.elevation-0.text-grey-lighten-3(
                  size="30"
                :ripple="false"
                @click="editingName = !editingName"
                )
                  VIcon(icon="mdi-pencil" size="20")
                VTextField.text-grey-darken-2.mt-4.w-50(
                  type="text"
                  v-model="name.value.value"
                  :error-messages="name.errorMessage.value"
                  variant="outlined"
                  density="compact"
                  label="修改暱稱"
                  placeholder="請輸入暱稱"
                  prepend-inner-icon="mdi-account-circle"
                  counter
                  maxlength="10"
                  v-if="editingName"
                )
              VDivider.text-black
              VCardText.text-h6.text-blue 信箱：
                span.text-grey-darken-2 {{ user.email }}
                VBtn.ms-3.elevation-0.text-grey-lighten-3(
                  size="30"
                  :ripple="false"
                  @click="editEmail = !editEmail"
                  )
                  VIcon(icon="mdi-pencil" size="20")
                VTextField.text-grey-darken-2.mt-4.w-50(
                  type="email"
                  v-model="email.value.value"
                  :error-messages="email.errorMessage.value"
                  variant="outlined"
                  density="compact"
                  label="修改信箱地址"
                  placeholder="請輸入信箱"
                  prepend-inner-icon="mdi-mailbox"
                  v-if="editEmail"
                  )
              VDivider.text-black
              VCardText.text-h6.text-blue 喜歡的商品數量：
                span.text-grey-darken-2 {{ user.likes }}
              VDivider.text-black
              VCardText.d-flex
                VBtn.ms-auto(color="primary" @click="submit") 確認修改
VDialog(v-model="editAvatar" width="500")
  VCard
    VCardTitle.bg-cyan-darken-1.text-h5.font-weight-bold.text-center 修改大頭貼
    VCardText.text-subtitle-2 請上傳大頭貼
      VueFileAgent.vueUploadBox(
        v-model="files"
        v-model:raw-model-value="rawFiles"
        ref="fileAgent"
        :compact="true"
        :thumbnail-size="300"
        :max-files="1"
        max-size="1MB"
        :multiple="false"
        deletable
        accept="image/jpg, image/jpeg, image/png"
        help-text="請選擇檔案或拖放到這裡"
        :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }"
        )
      VBtn.mt-5(color="cyan-darken-3" @click="uploadAvatar()") 上傳
</template>

<script setup>
import { ref } from 'vue'
import { useSnackbar } from 'vuetify-use-dialog'
import { apiAuth } from '@/plugins/axios'
import { useUserStore } from '@/store/user'
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const user = useUserStore()
const editingName = ref(false)
const editEmail = ref(false)
const editAvatar = ref(false)
const createSnackbar = useSnackbar()

const files = ref([])
const rawFiles = ref([])
const fileAgent = ref(null)

const schema = yup.object({
  name: yup
    .string()
    .required('暱稱必填')
    .max(10, '暱稱最多 10 個字'),
  email: yup
    .string()
    .required('信箱必填')
    .test(
      'isEmail', '信箱格式錯誤',
      (value) => validator.isEmail(value)
    ),
  avatar: yup
    .string()
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const name = useField('name')
const email = useField('email')

const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()
    console.log(values)
    fd.append('name', values.name)
    fd.append('email', values.email)

    await apiAuth.patch('/users/edit', fd)

    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })

    user.name = values.name
    user.email = values.email
  } catch (error) {
    console.log(error)
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

const uploadAvatar = async (values) => {
  if (files.value.length === 0) return
  try {
    const fd = new FormData()
    if (files.value.length > 0) fd.append('image', files.value[0].file)

    await apiAuth.patch('/users/edit', fd)

    createSnackbar({
      text: '修改成功',
      color: 'success',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'success',
        position: 'top'
      }
    })
    editAvatar.value = false
  } catch (error) {
    createSnackbar({
      text: error.response.data.message,
      color: 'error',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'error',
        position: 'top'
      }
    })
  }
}
</script>
