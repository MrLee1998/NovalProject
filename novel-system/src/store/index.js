import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let state ={
	pre: '',
	next: ''
}
let mutations ={
		setNext(state, next) {
			state.next = next
		},
		setPre(state, pre) {
			state.pre = pre
		},
	}

export default new Vuex.Store({
  state,
	mutations
  // state: {
    
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
})
