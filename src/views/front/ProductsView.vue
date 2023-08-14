<template lang="pug">
VTabs.elevation-1(
  v-model="tabs" bg-color="light-blue-lighten-3" grow density="compact"
  @update:model-value="getData"
  :fixed-tabs="true"
)
  VTab.rounded-0(
  v-for="tabItem in tabItems"
  :key="tabItem"
  :value="tabItem"
  border
  ) {{ tabItem }}
VContainer(fluid)
  VRow
    VCol.pa-0(cols="12")
      Swiper(
      style="height: 300px; width: 100%;"
      :loop="true"
      :spaceBetween="50"
      :autoplay="{ delay: 2500, disableOnInteraction: false }"
      :modules="modules"
      :effect="'fade'"
      :breakpoints="breakpoints"
      :slidesPerView="slidesPerView"
      class="mySwiper"
      )
        SwiperSlide(v-for="(slideImg, index) in slideImgs" :key="index")
          VImg(:src="slideImg.path" :height="300" cover)
VDivider.ma-5
VContainer
  VRow
    VCol.bg-pink-accent-2.rounded-pill.pa-1.mb-5(cols="12")
      div.d-flex.align-center
        VIcon.ms-2(:start="true" icon="mdi-book-open-blank-variant" size="x-large" color="yellow")
        text.text-h6.font-weight-bold.ms-2 給喜歡動漫的你
    VCol.px-5(
    cols="12" md="6" lg="3"
    v-for="product in products" :key="product._id"
    )
      ProductCard(v-bind="product")
    VCol.bg-light-blue-accent-2.rounded-pill.pa-1.mb-5(cols="12")
      div.d-flex.align-center
        VIcon.ms-2(color="pink" icon="mdi-package" size="x-large")
        p.text-h6.font-weight-bold.ms-2.text-white 更多更棒的商品推薦給你
  VRow
    VCol.px-5(
      cols="12" md="6" lg="3"
      v-for="randomProduct in randomProducts" :key="randomProduct._id"
      )
      ProductCard(v-bind="randomProduct")
FooterSection(style="height: 150px;")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
// Get Data
import { api } from '@/plugins/axios'
// SnackerBar
import { useSnackbar } from 'vuetify-use-dialog'
// Components - ProductCard
import ProductCard from '@/components/ProductCard.vue'
import FooterSection from '@/components/FooterSection.vue'

const createSnackbar = useSnackbar()
const { name, thresholds } = useDisplay()

const tabs = ref(null)
const tabItems = ['漫畫', '插畫', '素材', '音樂', '3D模型', '遊戲', '公仔']
const modules = [Autoplay]

const slideImgs = [
  { path: new URL('@/assets/carousel_01_big.jpg', import.meta.url).href },
  { path: new URL('@/assets/carousel_02_big.jpg', import.meta.url).href },
  { path: new URL('@/assets/carousel_03_big.jpg', import.meta.url).href }
]

const products = ref([])

const breakpoints = {
  [thresholds.value.xs]: {
    slidesPerView: 1
  },
  [thresholds.value.sm]: {
    slidesPerView: 1
  },
  [thresholds.value.md]: {
    slidesPerView: 2
  },
  [thresholds.value.lg]: {
    slidenPerView: 2
  },
  [thresholds.value.xl]: {
    slidenPerView: 3
  },
  [thresholds.value.xxl]: {
    slidenPerView: 3
  }
}

const slidesPerView = computed(() => {
  return name.value === 'lg' ? 2 : 1
})

const getData = async () => {
  try {
    const { data } = await api.get('/products/?category=' + tabs.value)
    products.value = [...data.result]
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
getData()

const randomProducts = ref([])

const getRandomData = async () => {
  try {
    const { data } = await api.get('/products/random')
    randomProducts.value.push(...data.result)
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
getRandomData()
</script>
