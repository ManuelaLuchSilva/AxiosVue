<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGenreStore } from '@/stores/genre'
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const genreStore = useGenreStore()
const genres = ref([]);
const selectedGenreId = ref(null);
const tv = ref([]);
const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const router = useRouter();

onMounted(async () => {
  isLoading.value = true;  
  await genreStore.getAllGenres('tv')
  genres.value = genreStore.genres
  await listTv();
  isLoading.value = false;
});

const listTv = async (genreId = null) => {
    
  selectedGenreId.value = genreId;
  isLoading.value = true;

  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });

  tv.value = response.data.results;
  isLoading.value = false;
  

};

const getGenreName = (id) => {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre.name;
};

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}
</script>

<template>
    <h1>Programas de TV</h1>
  
    <ul class="genre-list">
      <li @click="listTv(null)" :class="{ active: selectedGenreId === null }" class="genre-item">
      Todos
    </li>
      <li
        v-for="genre in genres"
        :key="genre.id"
        @click="listTv(genre.id)"
        :class="{ active: selectedGenreId === genre.id }"
        class="genre-item"
      >
        {{ genre.name }}
      </li>
    </ul>
  
    <loading v-model:active="isLoading" is-full-page />
  
    <div class="tv-list">
      <div v-for="show in tv" :key="show.id" class="tv-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${show.poster_path}`"
          :alt="show.name"
          @click="openTv(show.id)"
        />
        <div class="tv-details">
          <p class="tv-title">{{ show.name }}</p>
          <p class="tv-release-date">{{ formatDate(show.first_air_date) }}</p>
          <p class="tv-genres">
            <span v-for="genreId in show.genre_ids" :key="genreId">
              {{ getGenreName(genreId) }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
