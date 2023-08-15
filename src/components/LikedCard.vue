<template lang="pug">
VCard.d-flex.rounded-0
  VRow.w-100(no-gutters)
    VCol.pa-0(cols="12" md="2")
      VImg(:src="image" min-width="120" cover aspect-ratio="1")
    VCol(cols="12" md="10")
      .d-flex.flex-column.ms-5.my-2
        RouterLink.text-decoration-none(:to="'/products/' + _id")
          span.text-blue-darken-3.text-body-1 {{ name }}
        span.text-grey-darken-2.text-subtitle-2 分類：{{ category }}
        span.text-pink.text-caption $ {{ price }} NTD
        .d-flex.justify-space-between
          .bg-grey-lighten-4.mt-2.overflow-y-auto.pa-2(style="height: 100px; width: 50%;")
            pre.text-caption.text-desc {{ description }}
          VBtn.me-5.align-self-end(
            prepend-icon="mdi-heart"
            variant="outlined"
            @click="$emit('LikesBtn')"
            :color="liked ? 'pink' : 'grey'"
            width="50"
          )
    VDivider
</template>

<script setup>

const props = defineProps({
  _id: {
    type: String,
    default: () => ''
  },
  category: {
    type: String,
    default: () => ''
  },
  image: {
    type: String,
    default: () => ''
  },
  description: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  price: {
    type: Number,
    default: () => 0
  },
  sell: {
    type: Boolean,
    default: () => true
  },
  likes: {
    type: Number,
    default: () => 0
  },
  liked: {
    type: Boolean,
    default: () => false
  }
})

</script>
