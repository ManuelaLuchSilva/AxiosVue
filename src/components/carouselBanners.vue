<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';

const items = ref([]);
const currentIndex = ref(0);
const intervalId = ref(null);
const router = useRouter();

const fetchRelevants = async () => {
  const [moviesResponse, tvResponse] = await Promise.all([
    api.get('/movie/top_rated', { params: { language: 'pt-BR' } }),
    api.get('/tv/top_rated', { params: { language: 'pt-BR' } }),
  ]);

  const movies = moviesResponse.data.results.map((item) => ({
    ...item,
    type: 'movie',
  }));
  const tv = tvResponse.data.results.map((item) => ({
    ...item,
    type: 'tv',
  }));

  items.value = [...movies, ...tv].sort(() => Math.random());
};

const nextSlide = () => {
  if (items.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % items.value.length;
  }
};

const autoSlide = () => {
  intervalId.value = setInterval(nextSlide, 5000);
};

const stopAutoSlide = () => {
  clearInterval(intervalId.value);
};

const goDetails = (item) => {
  if (item.type === 'movie') {
    router.push({ name: 'MovieDetails', params: { movieId: item.id } });
  } else {
    router.push({ name: 'TvDetails', params: { tvId: item.id } });
  }
};

onMounted(() => {
  fetchRelevants();
  autoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<template>
  <div class="carousel" @mouseenter="stopAutoSlide" @mouseleave="autoSlide">
    <div class="carousel-content">
      <div v-for="(item, index) in items" :key="item.id" class="carousel-item"
        :class="{ active: index === currentIndex }" @click="goDetails(item)">
        <img :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`" :alt="item.title || item.name" />
        <div class="info">
          <h2>{{ item.title || item.name }}</h2>
          <p>{{ item.overview }}</p>
          <p v-if="item.type === 'movie'">Filme</p>
          <p v-else>Série</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 54vw;
  margin: 0;
}

.carousel-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(calc(-100% * var(--current-index, 0)));
}

.carousel-item img {
  margin-top: 2.5rem;
  width: 100vw;
  height: 47vw;
}

.carousel-item .info {
  position: absolute;
  bottom: 100px;
  left: 2vw;
  color: white;
  text-shadow: 1px 1px rgb(0, 0, 0);
  width: 60vw;
  background-color: rgba(0, 0, 0, 0.315);
  border-radius: 10px;
}

.info h2 {
  font-weight: 900;
  font-size: 1.2rem;
  margin-left: 10px;
}

.info p {
  font-weight: 400;
  font-size: 0.8rem;
  margin-left: 10px;
}

.carousel-item.active {
  display: block;
}

.carousel-item:not(.active) {
  display: none;
}
</style>
