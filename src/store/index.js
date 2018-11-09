// import Vuex from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'

import review from './modules/review.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    review
  }
})

export default store
