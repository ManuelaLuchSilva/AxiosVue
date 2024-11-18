<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const moviesGenres = ref([]);
const TVGenres = ref([]);

onMounted(async () => {
  let response = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTg2My4xMzQ4NDU3LCJzdWIiOiI2NzNiNzI4NDQ0MzU0MzE5MWNjYzMxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Qq_7Hjfrz1ljKAvP4PzUAFZOehldSXi6HSUOxetTelo`,
      },
    },
  );
  moviesGenres.value = response.data.genres;
  response = await axios.get(
    'https://api.themoviedb.org/3/genre/tv/list?language=pt-BR',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTg2My4xMzQ4NDU3LCJzdWIiOiI2NzNiNzI4NDQ0MzU0MzE5MWNjYzMxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Qq_7Hjfrz1ljKAvP4PzUAFZOehldSXi6HSUOxetTelo`,
      },
    },
  );
  TVGenres.value = response.data.genres;
});
</script>

<template>
  <div>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/filmes">Filmes</router-link>
        <router-link to="/tv">Programas de TV</router-link>
      </nav>
    </header>
    <router-view />
  </div>
  <h1>Gêneros de filmes</h1>
  <ul>
    <li v-for="genre in moviesGenres" :key="genre.id">
      {{ genre.name }}
    </li>
  </ul>
  <hr />
  <h1>Gêneros de programas de TV</h1>
  <ul>
    <li v-for="genre in TVGenres" :key="genre.id">
      {{ genre.name }}
    </li>
  </ul>
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
}

nav a {
  text-decoration: none;
  color: #fff;
}
</style>