import Vue from 'vue'
import Vuex from 'vuex'
import shows from '@/content/shows'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shows: shows.shows,
    isMobile: false
  },
  mutations: {
    setIsMobile (state, bool) {
      state.isMobile = bool
    }
  },
  actions: {
    setIsMobile ({commit}, bool) {
      commit('setIsMobile', bool)
    }
  }
})
