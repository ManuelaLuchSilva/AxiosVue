<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  getGenreName: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits()

const goToDetails = () => {
  emit('goToDetails', props.item)
}
</script>

<template>
  <div class="container">
    <div class="itemCarousel" @click="goToDetails">
      <img
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        :alt="item.title || item.name"
      />
      <p>{{ item.title || item.name }}</p>
    </div>
    <p class="genres">
      <span v-for="genreId in item.genre_ids" :key="genreId">
        <a :href="'#' + getGenreName(genreId)" @click.stop.prevent="mudarAction">
          {{ getGenreName(genreId) }}
        </a>
      </span>
    </p>
  </div>
</template>

<style scoped>
.container {
  flex: 0 0 25%;
  text-align: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
.itemCarousel {
  text-align: center;
  background-color: #d9d9d9;
  height: 500px;
  width: 80%;
}

.itemCarousel img {
  width: 100%;
  height: 80%;
  cursor: pointer;
}
.itemCarousel p {
  font-family: 'Inder', sans-serif;
}
</style>
