<script setup>
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()
const chaveTrailer = ref('')

const props = defineProps({
  movieId: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId)
  await getMovieTrailer()
})

const getMovieTrailer = async () => {
  const response = await movieStore.getMovieVideos(props.movieId)
  const trailer = response.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  )
  if (trailer) {
    chaveTrailer.value = trailer.key
  }
}

const formatoTempo = (runtime) => {
  const horas = Math.floor(runtime / 60)
  const minutos = runtime % 60
  return `${horas}h ${minutos}min`
}
</script>

<template>
  <div>
    <iframe v-if="chaveTrailer" class="background-video trailer-background"
      :src="`https://www.youtube.com/embed/${chaveTrailer}?autoplay=1&mute=1&start=5&loop=1&playlist=${chaveTrailer}&controls=0`"
      frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      <div class="container">
        <div class="content">
          <div>
            <div class="infos">
              <div class="details">
                <h1 class="title">{{ movieStore.currentMovie.title }}</h1>
                <p class="EffectFrase">{{ movieStore.currentMovie.tagline }}</p>
                <p class="resumo">{{ movieStore.currentMovie.overview }}</p>
                <p class="orcamento">Orçamento: ${{ movieStore.currentMovie.budget }}</p>
                <p class="avaliação">Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
                <p>Duração: {{ formatoTempo(movieStore.currentMovie.runtime) }}</p>
              </div>
            </div>

            <div class="companies">
              <p>Produtoras</p>
              <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
                <img :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" />
              </template>
            </div>
          </div>
        </div>
        <div class="poster">
          <img :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}`"
            :alt="movieStore.currentMovie.title" />
        </div>
      </div>
  </div>
</template>

<style scoped>
.trailer-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
}

.container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: start;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  box-sizing: border-box;
  color: white;
  z-index: 2;
  max-width: 50vw;
  margin-left: 5rem;
  margin-bottom: 2rem;
}

.content {
  flex: 1;
  padding: 2rem;
  color: white;
}

.infos {
  margin-bottom: 2rem;
}

.poster {
  width: 150px;
}

.poster img {
  width: 100%;
  height: auto;
}

.details {
  margin-left: 2rem;
}

.companies {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.companies img {
  max-height: 150px;
}
</style>
