<template lang="pug">
VContainer.pa-0(fluid)
  VRow(no-gutters)
    VCol.h-100(cols="12")
      .banner-image.pa-15
        h1.text-font-size.text-shadow.text-scrollbar 給予創作者一個自由販售商品的平台
        h1.text-font-size.text-shadow.text-scrollbar 能讓消費者更容易找到喜愛的作品及作者
        h1.text-font-size.text-shadow.text-scrollbar 所有人都能輕鬆簡單上手
    VCol(cols="12")
      .product-intro
        VContainer
          VRow
            VCol(cols="12")
              h1.text-center 有各種類型的商品
            VCol.product-image(cols="6" md="6" lg="3" v-for="randomProduct in randomProducts" :key="randomProduct._id")
              ProductCard(v-bind="randomProduct" hidedetail)
    VCol.py-15.mb-15(cols="12" style="position: relative;")
      VImg.hide-img.fade-img(src="@/assets/cdbox.png" width="150" style="position: absolute;")
      p.text-center.text-h3.font-weight-bold.text-blue-grey-darken-3 自由創作的天堂 <br> 讓你的創作力飛揚
      p.text-center.text-body-1.text-blue-grey-darken-3.mt-15 你是否曾經夢想過，能夠在一個自由、充滿愛和遊戲精神的市場，展 <br> 現你的創意和才華？一個不只是買賣商品，而是分享熱情、發想及靈感的平台？
      p.text-center.text-body-1.text-blue-grey-darken-3.mt-15 在這裡，你可以做任何你喜歡的事情，無論是繪畫、寫作、攝影、手工藝，還是音樂、舞蹈、戲劇，都可以找 <br> 到你的舞台。你可以創造出屬於你自己的世界，並與其他有相同興趣的人交流和互動。
      p.text-center.text-body-1.text-blue-grey-darken-3.mt-15 這就是自由創作的天堂，一個讓你的想像力飛揚的地方。快來加入我們吧，讓我們一起享受創作的樂趣！
      VImg.hide-img.fade-img2(src="@/assets/tablet.png" width="150" style="position: absolute; left: calc(100% - 140px);")
    VCol.mt-10(cols="12")
      VParallax(src="@/assets/parllex.jpg" height="500")
        .d-flex.flex-column.fill-height.justify-center.align-center.text-white
          p.text-center.text-h3.font-weight-bold.text-start-fade 開始販售你的商品吧！ <br> 或是瀏覽你所喜愛的作品。
          VBtn.text-h5.mt-15(to="/" color="blue-darken-2" width="250" height="50") 啟動
    VCol(cols="12")
      FooterSection(style="height: 150px;")
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '@/components/ProductCard.vue'
import FooterSection from '@/components/FooterSection.vue'

const createSnackbar = useSnackbar()
const randomProducts = ref([])
gsap.registerPlugin(ScrollTrigger)

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

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.text-scrollbar .fade-img .fade-img2 .product-image .text-start-fade',
    start: 'top top',
    end: 'bottom bottom',
    toggleActions: 'play none none reverse',
    scrub: 1
  }
})

onMounted(() => {
  tl.to('.text-scrollbar', {
    y: -100,
    opacity: 0,
    duration: 1
  })
  tl.from('.fade-img', {
    x: 100,
    opacity: 0,
    duration: 1
  })
  tl.from('.fade-img2', {
    x: -100,
    opacity: 0,
    duration: 2
  })
  tl.to('.product-image', {
    x: -100,
    opacity: 0,
    duration: 1
  })
  tl.from('.text-start-fade', {
    x: -100,
    opacity: 0,
    duration: 1
  })
})
</script>
