/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/styles/settings.scss'

// Composables
import { createVuetify } from 'vuetify'

// import custom locale
import zhTw from '@/locales/zhTw'

// import swiper components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

// Components
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { VStepper, VStepperActions } from 'vuetify/labs/VStepper'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTableServer,
    VStepper,
    VStepperActions,
    Swiper,
    SwiperSlide
  },
  locale: {
    locale: 'zhTw',
    messages: { zhTw }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6'
        }
      }
    }
  }
})
