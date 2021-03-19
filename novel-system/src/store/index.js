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
	currentUrl: '',
	mybooks: [],
	myBookRouter: '',
	pathUrl: '',
	fontStyle: 'kaiti'
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
			if(state.footprint.length > 1) {
				for(let i = 0; i < state.footprint.length; i++) {
					if(state.footprint[i].url == footprint.url) {
						return
					}
				}
				state.footprint.push(footprint)
			} else {
				state.footprint.push(footprint)
			}
		},
		setBookInfo(state, bookInfo) {
			state.bookInfo = bookInfo
		},
		setCurrentUrl(state, currentUrl) {
			state.currentUrl = currentUrl
		},
		setMybooks(state, mybooks) {
			state.mybooks = mybooks
		},
		setMyBookRouter(state, myBookRouter) {
			state.myBookRouter = myBookRouter
		},
		setPathUrl(state, pathUrl) {
			state.pathUrl = pathUrl
		},
		// 设置字体样式
		setFontStyle(state, fontStyle) {
			state.fontStyle = fontStyle
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
