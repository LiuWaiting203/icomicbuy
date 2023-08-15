<template lang="pug">
VContainer
  VRow
    VCol(cols="12")
      VCard
        VCardTitle.bg-blue.text-h5.font-weight-bold.text-center 收藏商品
        VRow(no-gutters)
          VCol(cols="12")
            template(v-for="(like, i) in likes" :key="like._id")
              LikedCard(v-bind="like" @LikesBtn="incrementCounter(i)")
</template>

<script setup>
import { ref } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import LikedCard from '@/components/LikedCard.vue'

const likes = ref([])

const createSnackbar = useSnackbar()

const incrementCounter = async (i) => {
  try {
    const { data } = await apiAuth.patch('/users/likes/' + likes.value[i]._id, { likes: !likes.value[i].liked })
    if (data.result !== null || data.result !== undefined) {
      data.result ? likes.value[i].likes++ : likes.value[i].likes--
      likes.value[i].liked = data.result
    }
    createSnackbar({
      text: '修改成功',
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
}

(async () => {
  try {
    const { data } = await apiAuth.get('/users/likes')
    console.log(data)
    likes.value.push(...data.result.map(like => {
      like.liked = true
      return like
    }))
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
})()

</script>
