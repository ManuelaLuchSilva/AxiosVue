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
const series = ref([])
const router = useRouter()
const action = ref(false)

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  genres.value = genreStore.genres
  isLoading.value = false
})

const getGenreName = (id) => {
  const genre = genres.value.find((genre) => genre.id === id);
  return genre.name;
};

function openTv(tvId) {
  router.push({ name: 'tvDetails', params: { tvId } })
}

const melhoresAvaliados = async () => {
  isLoading.value = true
  const response = await api.get('tv/top_rated', {
    params: {
      language: 'pt-BR',
    },
  })
  series.value = response.data.results
  action.value = true
  isLoading.value = false
}
const ultimosLancamentos = async () => {
  isLoading.value = true
  const response = await api.get('tv/now_playing', {
    params: {
      language: 'pt-BR',
    },
  })
  series.value = response.data.results
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
  <sideBar :pageType="'tv'" @melhoresAvaliados="melhoresAvaliados" @ultimosLancamentos="ultimosLancamentos"
    @padrao="padrao" />

  <loading v-model:active="isLoading" is-full-page />

  <div v-if="!action">
    <CarouselGeral :type="'tv'" sortBy="popularity.desc" @goToDetails="openTv" id="todos" class="carouselGeral" />

    <div v-for="genre in genres" :key="genre.id">
      <h2 class="title">{{ genre.name }}</h2>
      <CarouselGeral :id="genre.name" :type="'tv'" :genreId="genre.id" sortBy="popularity.desc"
        @goToDetails="openTv" class="carouselGeral" />
    </div>
  </div>

  <div v-else>
    <div class="tv-list">
      <div v-for="tv in series" :key="tv.id">
        <cardGeral class="cardGeral" :item="tv" :getGenreName="getGenreName" @goToDetails="openTv"
          @mudarAction="mudarAction" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tv-list {
  margin: 0 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tv-list>div {
  flex: 0 0 20%;
}

.title {
  margin-left: 6rem;
  margin-bottom: 20px;
  display: flex;
  align-items: end;
  font-family: 'Times New Roman', Times, serif;
  color: #62a9ff;
  font-weight: 600;
}

.carouselGeral {
  margin-bottom: 70px;
  height: 500px;
}

.cardGeral {
  margin-bottom: 70px;
}
</style>
