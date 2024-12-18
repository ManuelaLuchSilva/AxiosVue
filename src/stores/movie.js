import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    currentMovie: {},
  }),
  actions: {
    async getMovieDetail(movieId) {
      const response = await api.get(`/movie/${movieId}`, {
        params: { language: 'pt-BR' },
      })
      this.currentMovie = response.data
    },

    async getMovieVideos(movieId) {
      const response = await api.get(`/movie/${movieId}/videos`, {
        params: { language: 'pt-BR' },
      })
      return response.data
    },
  },
})
