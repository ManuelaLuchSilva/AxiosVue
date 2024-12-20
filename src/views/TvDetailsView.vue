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
</script>

<template>
  <div>
    <iframe v-if="chaveTrailer" class="background-video trailer-background"
      :src="`https://www.youtube.com/embed/${chaveTrailer}?autoplay=1&mute=1&start=5&loop=1&playlist=${chaveTrailer}&controls=0`"
      frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

    <div class="container">
      <div class="poster">
        <img :src="`https://image.tmdb.org/t/p/w500${tvStore.currentTvShow.poster_path}`"
          :alt="tvStore.currentTvShow.name" />
      </div>
      <div class="content">
        <div class="infos">
          <div class="details">
            <h1 class="title">{{ tvStore.currentTvShow.name }}</h1>
            <p class="EffectFrase">{{ tvStore.currentTvShow.tagline }}</p>
            <p class="resumo">{{ tvStore.currentTvShow.overview }}</p>
            <p class="orcamento">Orçamento: ${{ tvStore.currentTvShow.budget }}</p>
            <p class="avaliação">Avaliação: {{ tvStore.currentTvShow.vote_average }}</p>
          </div>
        </div>
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
</style>
