export default {
  state: {
    // $store.state.review.text
    text: 'text',
    run: null
  },
  mutations: {
    // $store.commit('fun1')
    fun1 (state, playload) {
      state.text += playload
    },
    updateFun (state, playload) {
      playload += playload
      console.log(11)
    }
  },
  actions: {
    // $store.dispatch('fun2')
    fun2 (context) {
      console.log('run actions -> fun2')
      context.commit('fun1')
    }
  },
  getters: {
    // $store.getters.fun3
    fun3 (state) {
      return state.text
      // 值是不能直接修改的 , 需要对应的 state 发生变化才能修改
    }
  }
}
