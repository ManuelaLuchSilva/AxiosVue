<script setup>
const ultimosLancamentos = async () => {
  const response = await api.get('movie/now_playing', {
    params: {
      language: 'pt-BR',
    },
  })
  movies.value = response.data.results
  selectedGenreId.value = null
}
const melhoresAvaliados = async () => {
  isLoading.value = true

  const response = await api.get('movie/top_rated', {
    params: {
      language: 'pt-BR',
    },
  })

  movies.value = response.data.results
}
const inicial = async () => {
  selectedGenreId.value = null;
  isLoading.value = true;
  const response = await api.get('discover/movie', {
      params: {
        sort_by: 'vote_average.desc',
        'vote_count.gte': 300,
        language: 'pt-BR',
      },
    });
    movies.value = response.data.results;
    isLoading.value = false
}
</script>
<template>
  <div class="nav">
    <div class="selecionar">
      <p @click="listMovies(null)" :class="{ active: selectedGenreId === null }" class="genre-item">
        Mostrar tudo
      </p>
      <p @click="ultimosLancamentos">Ultimos lançamentos</p>
      <p @click="melhoresAvaliados">Melhores avaliados</p>
    </div>
  </div>
</template>
<style scoped>
.nav {
  background-color: #2c2826;
  padding: 10px 0;
}
.nav div {
  margin: 0 5vw;
}
.selecionar {
  border-top: 1px white dashed;
  border-bottom: 1px white dashed;
  color: #fff;
  display: flex;
  flex-direction: row;
}
.selecionar p {
  margin: 5px 20px 5px 0;
  cursor: pointer;
}
</style>
