<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import api from './plugins/axios';

const moviesGenres = ref([]);
const TVGenres = ref([]);

onMounted(async () => {
  let response = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTE4OC4xNzYsInN1YiI6IjY3M2I3Mjg0NDQzNTQzMTkxY2NjMzExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYX2Cey5pPSMJP0PPqocYyvHkN6H39ip9B7Hd5ELskk`,
      },
    },
  );
  moviesGenres.value = response.data.genres;
  response = await axios.get(
    'https://api.themoviedb.org/3/genre/tv/list?language=pt-BR',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTE4OC4xNzYsInN1YiI6IjY3M2I3Mjg0NDQzNTQzMTkxY2NjMzExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYX2Cey5pPSMJP0PPqocYyvHkN6H39ip9B7Hd5ELskk`,
      },
    },
  );
  TVGenres.value = response.data.genres;
});


onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR');
  moviesGenres.value = response.data.genres;
  response = await api.get('genre/tv/list?language=pt-BR');
  TVGenres.value = response.data.genres;
});
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  height: 3rem;
  display: flex;
  background-color: black;
  color: #fff;
  font-size: 1.2rem;
  padding-left: 2rem;
}

nav {
  column-gap: 2rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

nav a {
  text-decoration: none;
  color: #fff;
}
</style>