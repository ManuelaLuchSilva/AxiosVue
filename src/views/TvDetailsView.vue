<script setup>
import { onMounted, ref } from 'vue'
import { useTvStore } from '@/stores/tv'

const tvStore = useTvStore()
const chaveTrailer = ref('')

const props = defineProps({
  tvId: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await tvStore.getTvShowDetail(props.tvId)
  await getTvTrailer()
})

const getTvTrailer = async () => {
  const response = await tvStore.getTvShowVideos(props.tvId)
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
    <iframe
      v-if="chaveTrailer"
      class="background-video trailer-background"
      :src="`https://www.youtube.com/embed/${chaveTrailer}?autoplay=1&mute=1&start=5&loop=1&playlist=${chaveTrailer}&controls=0`"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
    ></iframe>

    <div class="container">
      <div class="poster">
        <img
          :src="`https://image.tmdb.org/t/p/w500${tvStore.currentTvShow.poster_path}`"
          :alt="tvStore.currentTvShow.name"
        />
      </div>
      <div class="content">
        <div class="infos">
          <div class="details">
            <h1 class="title">{{ tvStore.currentTvShow.name }}</h1>
            <p class="EffectFrase">{{ tvStore.currentTvShow.tagline }}</p>
            <p class="resumo">{{ tvStore.currentTvShow.overview }}</p>
            <p class="orcamento">Orçamento: ${{ tvStore.currentTvShow.budget }}</p>
            <p class="avaliação">Avaliação: {{ tvStore.currentTvShow.vote_average }}</p>
            <p>Duração: {{ formatoTempo(tvStore.currentTvShow.runtime) }}</p>
          </div>
        </div>

        <div class="companies">
          <p>Produtoras</p>

          <template v-for="company in tvStore.currentTvShow.production_companies" :key="company.id">
            <img :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: white;
}
.trailer-background {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 50vw;
  transform: translate(-50%, -50%);
  z-index: -1;
  pointer-events: none;
}

.container {
  position: absolute;
}

.container > div {
  margin: 10px 2rem 0 5rem;
}

.content {
  position: relative;
  bottom: 0.5rem;
}

.infos {
  margin-bottom: 5rem;
}

.poster {
  width: 300px;
  bottom: 2.3rem;
}

.poster img {
  width: 100%;
  height: 100%;
}

.details {
  margin-left: 2rem;
}

.companies {
  column-gap: 3rem;
  margin-top: 5rem;
  background-color: blue;
}

.companies template {
  display: flex;
}

.companies img {
  max-height: 50px;
}
</style>
