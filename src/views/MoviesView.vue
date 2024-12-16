<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGenreStore } from '@/stores/genre'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import sideBar from '@/components/sidebarSite.vue'
import CarouselGeral from '@/components/carouselGeral.vue'
import cardGeral from '@/components/cardGeral.vue'

const genreStore = useGenreStore()
const isLoading = ref(false)
const genres = ref([])
const movies = ref([])
const router = useRouter()
const action = ref(false)

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  genres.value = genreStore.genres
  isLoading.value = false
})

function getGenreName(genreId) {
  const genre = genres.value.find((g) => g.id === genreId)
  genre = genre.name
}

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } })
}

const melhoresAvaliados = async () => {
  isLoading.value = true
  const response = await api.get('movie/top_rated', {
    params: {
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results
  action.value = true
  isLoading.value = false
}
const ultimosLancamentos = async () => {
  isLoading.value = true
  const response = await api.get('movie/now_playing', {
    params: {
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results
  action.value = true
  isLoading.value = false
}
const padrao = async () => {
  isLoading.value = true
  action.value = false
  isLoading.value = false
}
function mudarAction() {
  action.value = false
}
</script>

<template>
  <sideBar :pageType="'movie'" @melhoresAvaliados="melhoresAvaliados" @ultimosLancamentos="ultimosLancamentos" @padrao="padrao" />

  <loading v-model:active="isLoading" is-full-page />

  <div v-if="!action">
    <CarouselGeral
      :type="'movie'"
      sortBy="popularity.desc"
      @goToDetails="openMovie"
      id="todos"
      class="carouselGeral"
    />

    <div v-for="genre in genres" :key="genre.id">
      <h2 class="title">{{ genre.name }}</h2>
      <CarouselGeral
        :id="genre.name"
        :type="'movie'"
        :genreId="genre.id"
        sortBy="popularity.desc"
        @goToDetails="openMovie"
        class="carouselGeral"
      />
    </div>
  </div>

  <div v-else>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id">
        <cardGeral
          class="cardGeral"
          :item="movie"
          :getGenreName="getGenreName"
          @goToDetails="openMovie"
          @mudarAction="mudarAction"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-list {
  margin: 0 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.movie-list > div {
  flex: 0 0 25%;
}
.title {
  margin-left: 5rem;
  margin: 0 5rem 10px 5rem;
  display: flex;
  align-items: end;
  font-family: 'Inknut Antiqua', serif;
  color: #fff;
  font-weight: 400;
}
.carouselGeral {
  margin-bottom: 70px;
  height: 500px;
}
.cardGeral {
  margin-bottom: 70px;
}
</style>
