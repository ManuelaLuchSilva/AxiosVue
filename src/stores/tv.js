import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useTvStore = defineStore('tv', {
  state: () => ({
    currentTvShow: {},
  }),
  actions: {
    async getTvShowDetail(tvShowId) {
      const response = await api.get(`/tv/${tvShowId}`, {
        params: { language: 'pt-BR' },
      })
      this.currentTvShow = response.data
    },

    async getTvShowVideos(tvShowId) {
      const response = await api.get(`/tv/${tvShowId}/videos`, {
        params: { language: 'pt-BR' },
      })
      return response.data
    },
  },
})
