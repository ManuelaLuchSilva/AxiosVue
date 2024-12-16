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

const emit = defineEmits(['goToDetails', 'toggleAction'])

const goToDetails = () => {
  emit('goToDetails', props.item.id)
}
const mudarAction = () => {
  emit('mudarAction')
}
</script>

<template>
  <div class="container">
    <div class="card">
      <img @click="goToDetails" :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        :alt="item.title || item.name" />
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
  padding: 10px;
}

.card {
  text-align: center;
  background-color: #d9d9d9;
  height: 30rem;
  width: 100%;
  border-radius: 1rem;
}

.card img {
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  width: 100%;
  height: 80%;
  cursor: pointer;
}

.card p {
  font-family: "Inder", sans-serif;
}

.genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0.5rem;
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
