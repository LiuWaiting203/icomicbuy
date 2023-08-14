<template lang="pug">
div.h-100.bg-grey-lighten-2
  VContainer
    VRow.justify-center.align-center.mb-15
      VCol(cols="12")
        h1.text-center 出售商品
        VDivider
      VCol.h-100.bg-white(cols="6")
        VForm(:disabled="isSubmitting" @submit.prevent="submit")
          VCol(cols="12")
            h3 販售方法
            p.text-caption 由商家自行決定
          VDivider
          VCol(cols="12")
            h3.mb-3 商品名稱
            VTextField(
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              variant="outlined"
              density="compact"
              clearable
              placeholder="請輸入商品名稱"
              )
          VCol(cols="12")
            h3.mb-3 商品縮圖
            VueFileAgent(
              v-model="files"
              v-model:raw-model-value="rawFiles"
              ref="fileAgent"
              :compact="true"
              :thumbnail-size="1200"
              :max-files="1"
              max-size="1MB"
              :multiple="false"
              deletable
              accept="image/jpg, image/jpeg, image/png"
              help-text="請選擇檔案或拖放到這裡"
              :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }"
              )
          VCol(cols="12")
            h3.mb-3 商品說明
            VTextarea(
              v-model="description.value.value"
              :error-messages="description.errorMessage.value"
              variant="outlined"
              density="compact"
              placeholder="請輸入商品說明"
              )
          VCol(cols="3")
            h3.mb-3 商品分類
            VSelect(
              :items="categories"
              v-model="category.value.value"
              :error-messages="category.errorMessage.value"
              variant="outlined"
              density="compact"
              clearable
              hint="請選擇商品分類"
              )
          VCol(cols="6")
            h3.mb-3 商品價格
            VTextField(
              v-model.number="price.value.value"
              :error-messages="price.errorMessage.value"
              variant="outlined"
              density="compact"
              type="number"
              placeholder="請輸入商品價格"
              append-inner-icon="mdi-cash"
              )
          VCol(cols="12")
            VBtn.font-weight-black(
              color="light-blue"
              variant="tonal"
              type="submit"
              :loading="isSubmitting"
              ) 出售
  FooterSection(style="height: 150px;")
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useSnackbar } from 'vuetify-use-dialog'
import { apiAuth } from '@/plugins/axios'
// Foooter
import FooterSection from '@/components/FooterSection.vue'

const createSnackbar = useSnackbar()

const categories = ['漫畫', '插畫', '素材', '音樂', '3D模型', '遊戲', '公仔']
const schema = yup.object({
  name: yup
    .string()
    .required('缺少商品名稱'),
  price: yup
    .number()
    .typeError('價格錯誤')
    .required('缺少價格')
    .min(0, '價格錯誤'),
  description: yup
    .string()
    .required('缺少商品說明'),
  category: yup
    .string()
    .required('缺少商品分類')
    .test('isCategory', (value) => ['漫畫', '插畫', '素材', '音樂', '3D模型', '遊戲', '公仔'].includes(value))
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')

const files = ref([])
const rawFiles = ref([])
const fileAgent = ref(null)

const submit = handleSubmit(async (values) => {
  if (files.value.length === 0) return
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('image', files.value[0].file)

    resetForm()
    fileAgent.value.deleteFileRecord()

    await apiAuth.post('/products', fd)
    createSnackbar({
      text: '新增成功',
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
})
</script>
