<template lang="pug">
VContainer.overflow-y-auto.pa-10
  VRow.elevation-3.rounded-lg
    VCol.bg-indigo(cols="12")
      h1.text-center 商品管理
    VCol.bg-light-blue-lighten-5(cols="12")
      VDataTableServer.tableDescFix(
        v-model:items-per-page="tableItemPerPage"
        v-model:sort-by="tableSortBy"
        v-model:page="tablePage"
        :items="tableProducts"
        :headers="tableHeaders"
        :loading="tableLoading"
        :items-length="tableItemsLength"
        hover
        :search="tableSearch"
        @update:items-per-page="tableLoadItems"
        @update:sort-by="tableLoadItems"
        @update:page="tableLoadItems"
        class="data-table"
      )
        template(#top)
          VTextField.w-50.ml-5(
            variant="underlined"
            placeholder="請輸入詳細資料"
            prepend-inner-icon="mdi-magnify"
            @click:prepend-inner="tableApplySearch"
            v-model="tableSearch"
            @keydown.enter="tableApplySearch"
            clearable
            )
        template(#[`item.image`]="{ item }")
          VImg.rounded.mx-auto(:src="item.raw.image" width="150" :aspect-ratio="1" cover)
        template(#[`item.sell`]="{ item }")
          VSwitch(
            color="success"
            density="compact"
            v-model="item.raw.sell"
            @click="editSwitch(item.raw)"
            )
        template(#[`item.edit`]="{ item }")
          VBtn(
            variant="text"
            icon="mdi-square-edit-outline"
            @click="tableEditItem(item.raw)"
          )
VDialog(persistent scrollable width="500" v-model="dialog")
  VForm(:disabled="isSubmitting" @submit.prevent="submit")
    VCard
      VCardTitle.mb-5.bg-blue-lighten-2.text-white.font-weight-bold 管理商品
      VCardText(style="height: 400px")
        VTextField(
        label="名稱"
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        variant="solo-filled"
        )
        VTextField(
        label="價格"
        v-model.number="price.value.value"
        :error-messages="price.errorMessage.value"
        type="number"
        variant="solo-filled"
        )
        VTextarea(label="說明"
        v-model="description.value.value"
        :error-messages="description.errorMessage.value"
        variant="solo-filled"
        )
        VSelect(
          chips
          label="類別"
          v-model="category.value.value"
          :error-messages="category.errorMessage.value"
          :items="categories"
          variant="solo-filled"
          hint="請選擇分類"
          )
        VCheckbox(
          label="上架"
          v-model="sell.value.value"
          :error-messages="sell.errorMessage.value"
          color="blue"
          )
        VueFileAgent(
          v-model="files"
          v-model:raw-model-value="rawFiles"
          :max-files="1"
          max-size="1MB"
          accept="image/jpg, image/jpeg, image/png"
          :multiple="false"
          :error-text="{ type: '檔案格式錯誤', size: '檔案太大' }"
          help-text="選擇檔案或拖放到這裡"
          :thumbnail-size="1200"
          deletable
          ref="fileAgent"
        )
      VCardActions
        VSpacer
        VBtn(type="submit" color="success" variant="tonal" :loading="isSubmitting") 確認
        VBtn(color="error" variant="tonal" @click="closeDialog" :loading="isSubmitting") 取消
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useSnackbar } from 'vuetify-use-dialog'
import { apiAuth } from '@/plugins/axios'

const createSnackbar = useSnackbar()

const tableItemPerPage = ref(5)
const tableSortBy = ref([
  {
    key: 'name',
    order: 'asc'
  }
])

const tablePage = ref(1)

const tableProducts = ref([])

const tableHeaders = [
  { title: '圖片', align: 'center', sortable: false, key: 'image' },
  { title: '名稱', align: 'center', sortable: true, key: 'name' },
  { title: '價格', align: 'center', sortable: true, key: 'price' },
  { title: '說明', align: 'center', sortable: false, key: 'description' },
  { title: '分類', align: 'center', sortable: true, key: 'category' },
  { title: '上架', align: 'center', sortable: true, key: 'sell' },
  { title: '編輯', align: 'center', sortable: false, key: 'edit' }
]

const tableLoading = ref(false)

const tableItemsLength = ref(0)

const tableSearch = ref('')
const tableApplySearch = () => {
  tablePage.value = 1
  tableLoadItems()
}

const tableLoadItems = async () => {
  tableLoading.value = true
  try {
    const { data } = await apiAuth.get('/products/user', {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemPerPage.value,
        sortBy: tableSortBy.value[0].key,
        sortOrder: tableSortBy.value[0].order,
        search: tableSearch.value
      }
    })
    tableProducts.value.splice(0, tableProducts.value.length, ...data.result.data)
    tableItemsLength.value = data.result.count
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
  tableLoading.value = false
}
tableLoadItems()

const tableEditItem = (item) => {
  dialogId.value = item._id

  name.value.value = item.name
  price.value.value = item.price
  description.value.value = item.description
  category.value.value = item.category
  sell.value.value = item.sell

  dialog.value = true
}

const dialog = ref(false)
const dialogId = ref('')

const editSwitch = async (item) => {
  dialogId.value = item._id

  const fd = new FormData()
  fd.append('sell', !item.sell)

  await apiAuth.patch('/products/' + dialogId.value, fd)
}

// const openDialog = () => {
//   dialog.value = true
// }

const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

const categories = ['漫畫', '插畫', '素材', '音樂', '3D模型', '遊戲', '公仔']
const schema = yup.object({
  name: yup
    .string()
    .required('缺少名稱'),
  price: yup
    .number()
    .typeError('價格錯誤')
    .required('缺少價格')
    .min(0, '價格錯誤'),
  description: yup
    .string()
    .required('缺少說明'),
  category: yup
    .string()
    .required('缺少分類')
    .test('isCategory', (value) => ['漫畫', '插畫', '素材', '音樂', '3D模型', '遊戲', '公仔'].includes(value)),
  sell: yup
    .boolean()
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    price: 0,
    description: '',
    category: '',
    sell: false
  }
})

const name = useField('name')
const price = useField('price')
const description = useField('description')
const category = useField('category')
const sell = useField('sell')

const files = ref([])
const rawFiles = ref([])
const fileAgent = ref(null)

const submit = handleSubmit(async (values) => {
  if (dialogId.value.length === 0 && files.value.length === 0) return
  try {
    const fd = new FormData()
    fd.append('name', values.name)
    fd.append('price', values.price)
    fd.append('description', values.description)
    fd.append('category', values.category)
    fd.append('sell', values.sell)
    if (files.value.length > 0) fd.append('image', files.value[0].file)

    if (dialogId.value.length > 0) {
      await apiAuth.patch('/products/' + dialogId.value, fd)
    }

    // await apiAuth.patch('/products', fd)
    createSnackbar({
      text: '修改成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 3000,
        color: 'success',
        location: 'bottom'
      }
    })
    closeDialog()
    tableLoadItems()
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
