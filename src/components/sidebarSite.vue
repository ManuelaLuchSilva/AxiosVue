<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useGenreStore } from '@/stores/genre'

const props = defineProps({
  pageType: {
    type: String,
    default: 'movie',
  },
})

const isVisible = ref(false)
const genres = ref([])
const genreStore = useGenreStore()

onMounted(async () => {
  const genreType = props.pageType === 'movie' ? 'movie' : 'tv'
  await genreStore.getAllGenres(genreType)
  genres.value = genreStore.genres
})

const mudar = ref(false)

const mudarMenu = () => {
  mudar.value = !mudar.value
  mudarSidebar()
}

const mudarSidebar = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="overflow">
    <div class="menu" :class="{ change: mudar }" @click="mudarMenu">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
    </div>

    <div v-if="isVisible" class="sidebar">
      <ul>
        <li><a href="#todos" @click="$emit('padrao')">Todos</a></li>
        <li @click="$emit('melhoresAvaliados')" class="event">Melhores avaliados</li>
        <li @click="$emit('ultimosLancamentos')" class="event">Últimos lançamentos</li>
        <li v-for="genre in genres" :key="genre.id">
          <a :href="'#' + genre.name" @click="$emit('padrao')"> {{ genre.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #d9d9d9;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
  z-index: 10;
  overflow-y: scroll;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 70px;
}
.sidebar li {
  padding: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.event {
  margin: 10px 0;
}
.sidebar li a,
.sidebar li.event {
  width: 100%;
  text-align: center;
  background-color: #296120;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  text-decoration: none;
}
.sidebar li a:hover,
.sidebar li.event:hover {
  cursor: pointer;
  background-color: #296120;
  box-shadow: 0 0 0.5rem #296120;
}
.menu {
  display: inline-block;
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px;
  border: none;
  z-index: 11;
  background-color: #d1d1d1;
}
.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #000000;
  margin: 6px 0;
  transition: 0.4s;
}
.change.menu {
  right: calc(175px - 70px) !important;
  background-color: inherit;
}
.change .bar1 {
  transform: translate(0, 11px) rotate(-45deg);
}
.change .bar2 {
  opacity: 0;
}
.change .bar3 {
  transform: translate(0, -11px) rotate(45deg);
}
</style>
