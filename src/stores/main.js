import { defineStore } from 'pinia'
import router from '@/router'

export const useMainStore = defineStore('main', {
  state: () => ({}),
  getters: {},
  actions: {
    initialize() {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token')
        this.getProfile()
      }
    },
    async getProfile() {},
  },
})
