<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits()

const goToDetails = () => {
  emit('goToDetails', props.item)
}
</script>

<template>
  <div class="itemCarousel" @click="goToDetails">
    <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" :alt="item.title || item.name" />
    <p>{{ item.title || item.name }}</p>
  </div>
</template>

<style scoped>
.itemCarousel {
  flex: 0 0 25%;
  text-align: center;
  padding: 10px;
}

.itemCarousel img {
  width: 100%;
  border-radius: 8px;
}
</style>
