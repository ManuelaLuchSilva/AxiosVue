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
      <img :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`" :alt="item.title || item.name" />
      <p>{{ item.title || item.name }}</p>
      <p class="genres">
        <span v-for="genreId in item.genre_ids" :key="genreId">
          <a :href="'#' + getGenreName(genreId)" @click.stop.prevent="mudarAction">
            {{ getGenreName(genreId) }}
          </a>
        </span>
      </p>
    </div>

  </div>
</template>

<style scoped>
.container {
  flex: 0 0 20%;
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
  height: 30rem;
  width: 100%;
  border-radius: 1rem;
}

.itemCarousel img {
  width: 100%;
  height: 80%;
  cursor: pointer;
  border-radius: 0.8rem 0.8rem 0rem 0rem;
}

.itemCarousel p {
  font-family: 'Inder', sans-serif;
}

.genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0.4rem;
  gap: 0.1rem;
}

.genres span a {
  text-decoration: none;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
}

.genres span {
  background-color: #3565A0;
  border-radius: 0.4rem;
  padding: 0.1rem 0.4rem;
}

.genres span:hover {
  cursor: pointer;
  background-color: #4D94EB;
}
</style>