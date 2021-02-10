import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let state ={
	pre: '',
	next: '',
	categoryList: [],
	footprint: [],  //足迹
	bookType: '',
	readBookUrl: '',
	bookContent: {},
	bookInfo: {},
	currentUrl: ''
}
let mutations ={
		setNext(state, next) {
			state.next = next
		},
		setPre(state, pre) {
			state.pre = pre
		},
		setCategoryList(state, categoryList) {
			state.categoryList = categoryList
		},
		setBookType(state, bookType) {
			state.bookType = bookType
		},
		setReadBookUrl(state, readBookUrl) {
			state.readBookUrl = readBookUrl
		},
		setBookContent(state, bookContent) {
			state.bookContent = bookContent
		},
		setFootprint(state, footprint) {
			state.footprint.push(footprint)
		},
		setBookInfo(state, bookInfo) {
			state.bookInfo = bookInfo
		},
		setCurrentUrl(state, currentUrl) {
			state.currentUrl = currentUrl
		}
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
