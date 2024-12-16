<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGenreStore } from '@/stores/genre'
import api from '@/plugins/axios'
import carouselCard from './carouselCard.vue'

const router = useRouter()
const genres = ref([])
const genreStore = useGenreStore()

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  sortBy: {
    type: String,
    default: 'popularity.desc',
  },
  genreId: {
    type: Number,
    default: null,
  },
  ageRating: {
    type: String,
    default: '',
  },
})

const items = ref([])
const itemAtual = ref(0)

const buscarItens = async () => {
  const params = {
    language: 'pt-BR',
    sort_by: props.sortBy,
    with_genres: props.genreId,
  }

  if (props.ageRating) {
    params.certification_country = 'BR'
    params.certification = props.ageRating
  }

  if (props.type === 'movie') {
    const response = await api.get('/discover/movie', { params })
    items.value = response.data.results
  } else if (props.type === 'tv') {
    const response = await api.get('/discover/tv', { params })
    items.value = response.data.results
  } else if (props.type === '') {
    const [moviesResponse, tvResponse] = await Promise.all([
      api.get('/discover/movie', { params }),
      api.get('/discover/tv', { params }),
    ])
    items.value = [...moviesResponse.data.results, ...tvResponse.data.results]
  } else {
    const response = await api.get(props.type, {
      params: {
        language: 'pt-BR',
        sort_by: props.sortBy,
        with_genres: props.genreId,
      },
    })
    items.value = response.data.results
  }
}

const proxSlide = () => {
  if (itemAtual.value < items.value.length - 4) {
    itemAtual.value += 1
  } else {
    itemAtual.value = 0
  }
}

const anterSlide = () => {
  if (itemAtual.value > 0) {
    itemAtual.value -= 1
  } else {
    itemAtual.value = items.value.length - 4
  }
}

onMounted(async () => {
  genres.value = genreStore.genres
  if (genres.value.length === 0) {
    genres.value = genreStore.genres
  }
  await buscarItens()
})

const goToDetails = (item) => {
  if (props.type === 'movie') {
    router.push({ name: 'MovieDetails', params: { movieId: item.id } })
  } else if (props.type === 'tv') {
    router.push({ name: 'TvDetails', params: { tvId: item.id } })
  } else {
    if (item.title) {
      router.push({ name: 'MovieDetails', params: { movieId: item.id } })
    } else if (item.name) {
      router.push({ name: 'TvDetails', params: { tvId: item.id } })
    }
  }
}

function getGenreName(genreId) {
  const genre = genres.value.find((g) => g.id === genreId)
  return genre ? genre.name : 'Desconhecido'
}
</script>

<template>
  <div class="containerCarousel">
    <div class="button">
      <button class="navBtn prev" @click="anterSlide" v-if="itemAtual !== 0">&lt;</button>
    </div>
    <div class="carousel">
      <div class="contentCarousel">
        <div class="cardCarousel" :style="{ transform: `translateX(-${itemAtual * 25}%)` }">
          <carouselCard v-for="item in items" :key="item.id" :item="item" @goToDetails="goToDetails"
            :getGenreName="getGenreName" />
        </div>
      </div>
    </div>
    <div class="button">
      <button class="navBtn next" @click="proxSlide">&gt;</button>
    </div>
  </div>
</template>


<style scoped>
.containerCarousel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  overflow: hidden;
  background-color: #000000d5;
  border-radius: 1rem;
}

.contentCarousel {
  flex: 1;
  overflow: hidden;
}

.cardCarousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.button {
  min-width: 5vw;
  height: 100px;
}

.button .prev {
  margin-left: calc(5vw - 39px);
  width: calc(5vw - 39px);
}

.navBtn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 3rem;
  height: 39px;
  width: 40px;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
