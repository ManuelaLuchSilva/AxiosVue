<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from './plugins/axios'

const moviesGenres = ref([])
const TVGenres = ref([])

onMounted(async () => {
  let response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=pt-BR', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTE4OC4xNzYsInN1YiI6IjY3M2I3Mjg0NDQzNTQzMTkxY2NjMzExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYX2Cey5pPSMJP0PPqocYyvHkN6H39ip9B7Hd5ELskk`,
    },
  })
  moviesGenres.value = response.data.genres
  response = await axios.get('https://api.themoviedb.org/3/genre/tv/list?language=pt-BR', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmJkODIyMDczNGUxZjUwZWJkYjRkOWE2NjM5MWQyMSIsIm5iZiI6MTczMTk0OTE4OC4xNzYsInN1YiI6IjY3M2I3Mjg0NDQzNTQzMTkxY2NjMzExMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYX2Cey5pPSMJP0PPqocYyvHkN6H39ip9B7Hd5ELskk`,
    },
  })
  TVGenres.value = response.data.genres
})

onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR')
  moviesGenres.value = response.data.genres
  response = await api.get('genre/tv/list?language=pt-BR')
  TVGenres.value = response.data.genres
})
</script>

<template>
  <header :class="{ transparence: $route.path === '/' }">
    <nav :class="{ transparence: $route.path === '/' }">
      <div class="logo">
        <h1>MovieStan</h1>
      </div>
      <div class="options">
        <router-link to="/" :class="{ active: $route.path === '/' }">
          <h2>Home</h2>
        </router-link>
        <router-link to="/filmes" :class="{ active: $route.path === '/filmes' }">
          <h2>Filmes</h2>
        </router-link>
        <router-link to="/tv" :class="{ active: $route.path === '/tv' }">
          <h2>Séries</h2>
        </router-link>
      </div>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  display: flex;
  font-size: 0.8rem;
}

nav {
  background: linear-gradient(to bottom, rgb(0, 0, 0) 70%, rgba(76, 175, 80, 0) 100%);
  margin-bottom: 0;
  width: 100vw;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  z-index: 2;
}

.logo {
  font-size: 1.3rem;
  margin-left: 2vw;
  color: #ffffff;
}

.options {
  display: flex;
  flex-direction: row;
  margin-right: 5rem;
}

.options a {
  margin: 1rem;
  color: #ffffff;
  text-decoration: none;
}

.active {
  color: #3565A0 !important;
}

.transparence {
  position: absolute !important;
  margin: 0 !important;
}
</style>
