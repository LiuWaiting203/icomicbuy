<template lang="pug">
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
          VImg(:src="slideImg.path" height="100%" cover)
FooterSection(style="height: 150px;")
</template>

<script setup>
// Ref
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
// Foooter
import FooterSection from '@/components/FooterSection.vue'

const modules = [Autoplay]

const { name, thresholds } = useDisplay()

const slideImgs = [
  { path: new URL('@/assets/carousel_01_big.jpg', import.meta.url).href },
  { path: new URL('@/assets/carousel_02_big.jpg', import.meta.url).href },
  { path: new URL('@/assets/carousel_03_big.jpg', import.meta.url).href }
]

const breakpoints = {
  [thresholds.value.xs]: {
    slidesPerView: 1
  },
  [thresholds.value.md]: {
    slidesPerView: 2
  },
  [thresholds.value.lg]: {
    slidenPerView: 3
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

</script>
