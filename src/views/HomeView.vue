<script setup>
import caroulselBanners from '@/components/carouselBanners.vue'
import carouselGeral from '@/components/carouselGeral.vue'
</script>

<template>
  <caroulselBanners />
  <div class="carouselContainer">
    <div class="tema">
      <h2>Filmes</h2>
      <p><router-link to="/filmes">Ver mais</router-link></p>
    </div>
    <carouselGeral type="movie" sortBy="popularidade.desc" />
  </div>
  <div class="carouselContainer">
    <div class="tema">
      <h2>Séries</h2>
      <p><router-link to="/tv">Ver mais</router-link></p>
    </div>
    <carouselGeral type="tv" sortBy="popularidade.desc" />
  </div>
  <div class="carouselContainer">
    <div class="tema">
      <h2>Melhores avaliados</h2>
    </div>
    <carouselGeral type="movie/top_rated" sortBy="popularidade.desc" />
  </div>
  <div class="carouselContainer">
    <div class="tema">
      <h2>Kids</h2>
    </div>
    <carouselGeral ageRating="L" sortBy="popularidade.desc" />
  </div>
</template>

<style scoped>
.carouselContainer {
  margin-top: 50px;
}
.tema {
  margin: 0 5rem 10px 5rem;
  display: flex;
  align-items: end;
}
.tema h2 {
  font-family: 'Inknut Antiqua', serif;
  color: #fff;
  font-weight: 400;
}
.tema p {
  color: #137701;
  margin-left: 20px;
}
a {
  text-decoration: none;
  color: #137701;
}
</style>
